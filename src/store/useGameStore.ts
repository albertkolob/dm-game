import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GameMode, GameResult, GameSettings, Language, Team, Question } from '@/data/types';
import { PRESETS, PresetKey } from '@/data';
import { localDateString } from '@/lib/utils';
import {
  COMBO_BASE,
  COMBO_CAP,
  comboMultiplier,
  ACE_PARTIAL_POINTS,
  SPEED_WINDOW_SECONDS,
  SPEED_BONUS_TEAM,
} from '@/lib/progression';
import { useProgressStore } from './useProgressStore';

export interface AnswerOutcome {
  correct: boolean;
  partial?: boolean;
  timeSpent: number;
}

interface GameState {
  // Language
  language: Language;
  setLanguage: (lang: Language) => void;

  // Selected set of verse IDs
  selectedIds: string[];
  setSelectedIds: (ids: string[]) => void;
  loadPreset: (key: PresetKey) => void;

  // Game mode
  currentMode: GameMode | null;
  setCurrentMode: (mode: GameMode | null) => void;

  // Game settings
  settings: GameSettings;
  updateSettings: (settings: Partial<GameSettings>) => void;

  // Current game state
  isPlaying: boolean;
  isPaused: boolean;
  hasAnswered: boolean;
  currentQuestion: Question | null;
  questionIndex: number;
  totalQuestions: number;
  score: number;
  streak: number;
  bestStreak: number;
  fastAnswers: number;
  lastPointsEarned: number;
  timeRemaining: number;
  lives: number;

  // Results
  results: GameResult[];
  addResult: (result: GameResult) => void;
  clearResults: () => void;

  // Team mode
  teams: Team[];
  currentTeamIndex: number;
  isTeamMode: boolean;
  setTeams: (teams: Team[]) => void;
  setCurrentTeamIndex: (index: number) => void;
  setIsTeamMode: (enabled: boolean) => void;
  updateTeamScore: (teamId: string, points: number) => void;

  // Game actions
  startGame: (mode: GameMode, questions: Question[]) => void;
  endGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  setCurrentQuestion: (question: Question | null) => void;
  nextQuestion: () => void;
  answerQuestion: (outcome: AnswerOutcome) => void;
  setTimeRemaining: (time: number) => void;
  decrementTime: () => void;
  loseLife: () => void;
  gainLife: () => void;

  // Persistence
  dayStreak: number;
  lastPlayedDate: string | null;
  totalVersesStudied: number;
  updateDayStreak: () => void;
  resetLocalStats: () => void;

  // Questions pool for current game
  questionsPool: Question[];
  setQuestionsPool: (questions: Question[]) => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      // Language
      // The 'dm-game-language' localStorage key is owned by src/i18n (read at bootstrap)
      language: 'en',
      setLanguage: (lang) => set({ language: lang }),

      // Selected set
      selectedIds: PRESETS.all_dm,
      setSelectedIds: (ids) => set({ selectedIds: ids }),
      loadPreset: (key) => set({ selectedIds: PRESETS[key] }),

      // Game mode
      currentMode: null,
      setCurrentMode: (mode) => set({ currentMode: mode }),

      // Settings
      settings: {
        timePerQuestion: 20,
        questionsPerRound: 10,
        enableSound: true,
        enableHaptics: true,
        showHints: true,
        enableCombos: true,
      },
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),

      // Current game state
      isPlaying: false,
      isPaused: false,
      hasAnswered: false,
      currentQuestion: null,
      questionIndex: 0,
      totalQuestions: 0,
      score: 0,
      streak: 0,
      bestStreak: 0,
      fastAnswers: 0,
      lastPointsEarned: 0,
      timeRemaining: 20,
      lives: 3,

      // Results
      results: [],
      addResult: (result) =>
        set((state) => ({ results: [...state.results, result] })),
      clearResults: () => set({ results: [] }),

      // Team mode
      teams: [],
      currentTeamIndex: 0,
      isTeamMode: false,
      setTeams: (teams) => set({ teams }),
      setCurrentTeamIndex: (index) => set({ currentTeamIndex: index }),
      setIsTeamMode: (enabled) => set({ isTeamMode: enabled }),
      updateTeamScore: (teamId, points) =>
        set((state) => ({
          teams: state.teams.map((team) =>
            team.id === teamId ? { ...team, score: team.score + points } : team
          ),
        })),

      // Game actions
      startGame: (mode, questions) =>
        set({
          currentMode: mode,
          isPlaying: true,
          isPaused: false,
          hasAnswered: false,
          questionIndex: 0,
          totalQuestions: questions.length,
          score: 0,
          streak: 0,
          bestStreak: 0,
          fastAnswers: 0,
          lastPointsEarned: 0,
          timeRemaining: get().settings.timePerQuestion,
          lives: mode === 'lightning_ladder' ? 3 : Infinity,
          results: [],
          questionsPool: questions,
          currentQuestion: questions[0] || null,
        }),

      endGame: () => {
        const {
          isPlaying,
          results,
          totalVersesStudied,
          currentMode,
          score,
          bestStreak,
          fastAnswers,
          isTeamMode,
          teams,
        } = get();
        if (!isPlaying) return; // already ended; don't record stats twice
        set({
          isPlaying: false,
          isPaused: false,
          currentQuestion: null,
          totalVersesStudied: totalVersesStudied + results.length,
        });

        // Meta-progression: XP, crowns, badges, bests, daily quest
        if (results.length > 0 && currentMode) {
          get().updateDayStreak();
          useProgressStore.getState().recordRound(
            {
              mode: currentMode,
              score,
              bestCombo: Math.min(bestStreak, COMBO_CAP),
              correct: results.filter((r) => r.correct).length,
              total: results.length,
              fastAnswers,
              verseResults: results.map((r) => ({ id: r.questionId, correct: r.correct })),
              isTeamRound: isTeamMode && teams.length > 1,
            },
            get().dayStreak
          );
        }
      },

      pauseGame: () => set({ isPaused: true }),
      resumeGame: () => set({ isPaused: false }),

      setCurrentQuestion: (question) => set({ currentQuestion: question }),

      nextQuestion: () => {
        const { questionIndex, questionsPool, settings, isTeamMode, teams, currentTeamIndex } = get();
        const nextIndex = questionIndex + 1;

        if (nextIndex >= questionsPool.length) {
          get().endGame();
          return;
        }

        // In team mode, rotate to next team
        if (isTeamMode && teams.length > 1) {
          const nextTeamIndex = (currentTeamIndex + 1) % teams.length;
          set({ currentTeamIndex: nextTeamIndex });
        }

        set({
          questionIndex: nextIndex,
          currentQuestion: questionsPool[nextIndex],
          timeRemaining: settings.timePerQuestion,
          hasAnswered: false,
        });
      },

      answerQuestion: ({ correct, partial, timeSpent }) => {
        const { streak, bestStreak, fastAnswers, isTeamMode, teams, currentTeamIndex, settings } = get();
        const teamRound = isTeamMode && teams.length > 1;
        const fast = timeSpent <= SPEED_WINDOW_SECONDS;

        // Freeze the timer while the feedback screen is showing
        set({ hasAnswered: true });

        if (correct) {
          const newStreak = streak + 1;
          const multiplier = settings.enableCombos ? comboMultiplier(newStreak) : 1;
          let points = COMBO_BASE * multiplier;
          if (teamRound && fast) points += SPEED_BONUS_TEAM;

          if (teamRound) {
            get().updateTeamScore(teams[currentTeamIndex].id, points);
          }

          set({
            score: get().score + points,
            streak: newStreak,
            bestStreak: Math.max(newStreak, bestStreak),
            fastAnswers: fast && !teamRound ? fastAnswers + 1 : fastAnswers,
            lastPointsEarned: points,
          });

          // Gain life every 5 streak in lightning ladder
          if (newStreak % 5 === 0 && get().currentMode === 'lightning_ladder') {
            get().gainLife();
          }
        } else if (partial) {
          // ACE: one of the two picks right — consolation points, combo resets
          if (teamRound) {
            get().updateTeamScore(teams[currentTeamIndex].id, ACE_PARTIAL_POINTS);
          }
          set({
            score: get().score + ACE_PARTIAL_POINTS,
            streak: 0,
            lastPointsEarned: ACE_PARTIAL_POINTS,
          });
        } else {
          set({ streak: 0, lastPointsEarned: 0 });

          if (get().currentMode === 'lightning_ladder') {
            get().loseLife();
          }
        }
      },

      setTimeRemaining: (time) => set({ timeRemaining: time }),

      decrementTime: () => {
        const { timeRemaining } = get();
        if (timeRemaining <= 0) return;
        set({ timeRemaining: timeRemaining - 1 });
      },

      loseLife: () => {
        const { lives } = get();
        if (lives <= 1) {
          set({ lives: 0 });
          get().endGame();
        } else {
          set({ lives: lives - 1 });
        }
      },

      gainLife: () => set((state) => ({ lives: state.lives + 1 })),

      // Persistence
      dayStreak: 0,
      lastPlayedDate: null,
      totalVersesStudied: 0,

      updateDayStreak: () => {
        const today = localDateString();
        const { lastPlayedDate, dayStreak } = get();

        if (lastPlayedDate === today) {
          return; // Already played today
        }

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = localDateString(yesterday);

        if (lastPlayedDate === yesterdayStr) {
          set({ dayStreak: dayStreak + 1, lastPlayedDate: today });
        } else {
          set({ dayStreak: 1, lastPlayedDate: today });
        }
      },

      resetLocalStats: () =>
        set({ dayStreak: 0, lastPlayedDate: null, totalVersesStudied: 0 }),

      // Questions pool
      questionsPool: [],
      setQuestionsPool: (questions) => set({ questionsPool: questions }),
    }),
    {
      name: 'dm-game-store',
      partialize: (state) => ({
        language: state.language,
        selectedIds: state.selectedIds,
        settings: state.settings,
        dayStreak: state.dayStreak,
        lastPlayedDate: state.lastPlayedDate,
        totalVersesStudied: state.totalVersesStudied,
        teams: state.teams,
        isTeamMode: state.isTeamMode,
      }),
    }
  )
);
