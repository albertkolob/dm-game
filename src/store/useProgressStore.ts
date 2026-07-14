import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import { GameMode, DMItem, Work } from '@/data/types';
import { DM_MASTER } from '@/data';
import { localDateString } from '@/lib/utils';
import {
  VerseProgress,
  emptyVerseProgress,
  levelFromXp,
  rankFromPoints,
  rankPoints,
  RankTier,
  BadgeId,
  CROWN_MAX_LEVEL,
  PERFECTS_PER_CROWN,
  DAILY_QUEST_XP,
  SPEED_BONUS_XP_SOLO,
  MASTERY_CORRECT_THRESHOLD,
} from '@/lib/progression';

export const SAVE_ENABLED_KEY = 'dm.save_enabled';
export const PROGRESS_STORAGE_KEY = 'dm.progress';

export function isSaveEnabled(): boolean {
  try {
    return localStorage.getItem(SAVE_ENABLED_KEY) !== 'false';
  } catch {
    return false;
  }
}

// Storage that goes quiet when the student turns "Save progress" off —
// reads still work (to load whatever existed), writes become no-ops.
const gatedStorage: StateStorage = {
  getItem: (name) => {
    try {
      return localStorage.getItem(name);
    } catch {
      return null;
    }
  },
  setItem: (name, value) => {
    if (!isSaveEnabled()) return;
    try {
      localStorage.setItem(name, value);
    } catch {
      /* best effort */
    }
  },
  removeItem: (name) => {
    try {
      localStorage.removeItem(name);
    } catch {
      /* best effort */
    }
  },
};

export interface RoundSummary {
  mode: GameMode;
  score: number;
  bestCombo: number;
  correct: number;
  total: number;
  fastAnswers: number;
  verseResults: { id: string; correct: boolean }[];
  isTeamRound: boolean;
}

export interface RoundReport {
  xpGained: number;
  levelBefore: number;
  levelAfter: number;
  rankBefore: RankTier;
  rankAfter: RankTier;
  newBadges: BadgeId[];
  crownedVerses: { id: string; level: number }[];
  questCompleted: boolean;
  accuracy: number;
  bestCombo: number;
  fastAnswers: number;
  score: number;
}

interface ProgressState {
  saveEnabled: boolean;
  setSaveEnabled: (enabled: boolean) => void;

  name: string;
  setName: (name: string) => void;
  avatarDataUrl: string | null;
  setAvatarDataUrl: (url: string | null) => void;

  xp: number;
  badges: BadgeId[];
  verses: Record<string, VerseProgress>;
  bests: Partial<Record<GameMode, { score: number; combo: number }>>;
  questClaimDate: string | null;

  lastReport: RoundReport | null;

  recordRound: (summary: RoundSummary, dayStreak: number) => RoundReport;
  eraseAll: () => void;
}

const initialProgress = {
  name: '',
  avatarDataUrl: null as string | null,
  xp: 0,
  badges: [] as BadgeId[],
  verses: {} as Record<string, VerseProgress>,
  bests: {} as Partial<Record<GameMode, { score: number; combo: number }>>,
  questClaimDate: null as string | null,
  lastReport: null as RoundReport | null,
};

// Deterministic featured verse for the local date
export function getDailyQuestVerse(date: Date = new Date()): DMItem {
  const key = localDateString(date);
  let hash = 0;
  for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  return DM_MASTER[hash % DM_MASTER.length];
}

export function workMastery(verses: Record<string, VerseProgress>): Record<Work, { mastered: number; total: number }> {
  const result = {} as Record<Work, { mastered: number; total: number }>;
  for (const item of DM_MASTER) {
    if (!result[item.work]) result[item.work] = { mastered: 0, total: 0 };
    result[item.work].total++;
    const v = verses[item.id];
    if (v && (v.timesCorrect >= MASTERY_CORRECT_THRESHOLD || v.crownLevel > 0)) {
      result[item.work].mastered++;
    }
  }
  return result;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      saveEnabled: isSaveEnabled(),
      setSaveEnabled: (enabled) => {
        try {
          localStorage.setItem(SAVE_ENABLED_KEY, String(enabled));
          if (!enabled) {
            // Spec: turning saving off means nothing survives the session
            localStorage.removeItem(PROGRESS_STORAGE_KEY);
          }
        } catch {
          /* best effort */
        }
        set({ saveEnabled: enabled });
        if (enabled) {
          // Write current state now that persistence is allowed again
          useProgressStore.persist.rehydrate();
          set((s) => ({ ...s }));
        }
      },

      ...initialProgress,

      setName: (name) => set({ name: name.slice(0, 24) }),
      setAvatarDataUrl: (avatarDataUrl) => set({ avatarDataUrl }),

      recordRound: (summary, dayStreak) => {
        const state = get();
        const perfect = summary.total > 0 && summary.correct === summary.total;

        // --- Verse progress & crowns ---
        const verses = { ...state.verses };
        const crownedVerses: { id: string; level: number }[] = [];
        for (const vr of summary.verseResults) {
          const prev = verses[vr.id] ?? emptyVerseProgress();
          const next: VerseProgress = {
            ...prev,
            timesCorrect: prev.timesCorrect + (vr.correct ? 1 : 0),
            timesMissed: prev.timesMissed + (vr.correct ? 0 : 1),
          };
          if (perfect && next.crownLevel < CROWN_MAX_LEVEL) {
            next.crownProgress = prev.crownProgress + 1;
            if (next.crownProgress >= PERFECTS_PER_CROWN) {
              next.crownLevel = prev.crownLevel + 1;
              next.crownProgress = 0;
              crownedVerses.push({ id: vr.id, level: next.crownLevel });
            }
          }
          verses[vr.id] = next;
        }

        // --- Daily quest ---
        const today = localDateString();
        const questVerse = getDailyQuestVerse();
        const questVerseCorrect = summary.verseResults.some((v) => v.id === questVerse.id && v.correct);
        const questCompleted = questVerseCorrect && state.questClaimDate !== today;

        // --- XP ---
        const xpGained =
          summary.score +
          (summary.isTeamRound ? 0 : summary.fastAnswers * SPEED_BONUS_XP_SOLO) +
          (questCompleted ? DAILY_QUEST_XP : 0);
        const levelBefore = levelFromXp(state.xp);
        const xp = state.xp + xpGained;
        const levelAfter = levelFromXp(xp);

        // --- Bests & rank ---
        const rankBefore = rankFromPoints(rankPoints(state.bests));
        const bests = { ...state.bests };
        const prevBest = bests[summary.mode] ?? { score: 0, combo: 0 };
        bests[summary.mode] = {
          score: Math.max(prevBest.score, summary.score),
          combo: Math.max(prevBest.combo, summary.bestCombo),
        };
        const rankAfter = rankFromPoints(rankPoints(bests));

        // --- Badges ---
        const badges = [...state.badges];
        const award = (id: BadgeId, earned: boolean) => {
          if (earned && !badges.includes(id)) badges.push(id);
        };
        award('first_round', true);
        award('perfect_round', perfect);
        award('combo10', summary.bestCombo >= 10);
        award('streak7', dayStreak >= 7);
        award('streak30', dayStreak >= 30);
        award('level5', levelAfter >= 5);
        award('level10', levelAfter >= 10);
        const mastery = workMastery(verses);
        award(
          'work90',
          Object.values(mastery).some((m) => m.total > 0 && m.mastered / m.total >= 0.9)
        );
        const newBadges = badges.filter((b) => !state.badges.includes(b));

        const report: RoundReport = {
          xpGained,
          levelBefore,
          levelAfter,
          rankBefore,
          rankAfter,
          newBadges,
          crownedVerses,
          questCompleted,
          accuracy: summary.total > 0 ? Math.round((summary.correct / summary.total) * 100) : 0,
          bestCombo: summary.bestCombo,
          fastAnswers: summary.fastAnswers,
          score: summary.score,
        };

        set({
          verses,
          xp,
          bests,
          badges,
          questClaimDate: questCompleted ? today : state.questClaimDate,
          lastReport: report,
        });

        return report;
      },

      eraseAll: () => {
        set({ ...initialProgress });
        try {
          localStorage.removeItem(PROGRESS_STORAGE_KEY);
        } catch {
          /* best effort */
        }
      },
    }),
    {
      name: PROGRESS_STORAGE_KEY,
      storage: createJSONStorage(() => gatedStorage),
      partialize: (state) => ({
        name: state.name,
        avatarDataUrl: state.avatarDataUrl,
        xp: state.xp,
        badges: state.badges,
        verses: state.verses,
        bests: state.bests,
        questClaimDate: state.questClaimDate,
      }),
    }
  )
);
