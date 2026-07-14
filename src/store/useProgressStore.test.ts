import { describe, it, expect, beforeEach } from 'vitest';
import { useProgressStore, getDailyQuestVerse, RoundSummary, workMastery } from './useProgressStore';
import { DM_MASTER } from '@/data';

const initialState = useProgressStore.getState();

function makeSummary(overrides: Partial<RoundSummary> = {}): RoundSummary {
  return {
    mode: 'reference_rush',
    score: 100,
    bestCombo: 4,
    correct: 8,
    total: 10,
    fastAnswers: 2,
    verseResults: [
      { id: 'v1', correct: true },
      { id: 'v2', correct: false },
    ],
    isTeamRound: false,
    ...overrides,
  };
}

beforeEach(() => {
  useProgressStore.setState(initialState, true);
  localStorage.clear();
});

describe('recordRound', () => {
  it('grants XP = score + 5 per fast answer (solo)', () => {
    const report = useProgressStore.getState().recordRound(makeSummary(), 1);
    expect(report.xpGained).toBe(100 + 10);
    expect(useProgressStore.getState().xp).toBe(110);
  });

  it('grants no speed XP in team rounds', () => {
    const report = useProgressStore.getState().recordRound(makeSummary({ isTeamRound: true }), 1);
    expect(report.xpGained).toBe(100);
  });

  it('tracks per-verse correct/missed counts', () => {
    useProgressStore.getState().recordRound(makeSummary(), 1);
    const verses = useProgressStore.getState().verses;
    expect(verses.v1.timesCorrect).toBe(1);
    expect(verses.v2.timesMissed).toBe(1);
  });

  it('awards a crown level after 2 perfect rounds containing a verse', () => {
    const perfect = makeSummary({
      correct: 2,
      total: 2,
      verseResults: [
        { id: 'v1', correct: true },
        { id: 'v2', correct: true },
      ],
    });
    let report = useProgressStore.getState().recordRound(perfect, 1);
    expect(report.crownedVerses).toEqual([]);
    report = useProgressStore.getState().recordRound(perfect, 1);
    expect(report.crownedVerses).toEqual([
      { id: 'v1', level: 1 },
      { id: 'v2', level: 1 },
    ]);
    expect(useProgressStore.getState().verses.v1.crownLevel).toBe(1);
  });

  it('gives no crown progress on imperfect rounds', () => {
    useProgressStore.getState().recordRound(makeSummary(), 1);
    expect(useProgressStore.getState().verses.v1.crownProgress).toBe(0);
  });

  it('updates per-mode bests and rank', () => {
    useProgressStore.getState().recordRound(makeSummary({ score: 200, bestCombo: 6 }), 1);
    useProgressStore.getState().recordRound(makeSummary({ score: 150, bestCombo: 8 }), 1);
    const best = useProgressStore.getState().bests.reference_rush!;
    expect(best.score).toBe(200);
    expect(best.combo).toBe(8);
  });

  it('reports a rank-up when bests cross a tier threshold', () => {
    const report = useProgressStore.getState().recordRound(makeSummary({ score: 200 }), 1);
    expect(report.rankBefore).toBe('bronze3');
    expect(report.rankAfter).toBe('bronze2');
  });

  it('awards badges once', () => {
    const report1 = useProgressStore.getState().recordRound(makeSummary({ bestCombo: 10 }), 7);
    expect(report1.newBadges).toContain('first_round');
    expect(report1.newBadges).toContain('combo10');
    expect(report1.newBadges).toContain('streak7');

    const report2 = useProgressStore.getState().recordRound(makeSummary({ bestCombo: 10 }), 8);
    expect(report2.newBadges).toEqual([]);
  });

  it('claims the daily quest once per day when its verse is answered correctly', () => {
    const quest = getDailyQuestVerse();
    const withQuest = makeSummary({
      verseResults: [{ id: quest.id, correct: true }],
    });
    const report1 = useProgressStore.getState().recordRound(withQuest, 1);
    expect(report1.questCompleted).toBe(true);
    expect(report1.xpGained).toBe(100 + 10 + 50);

    const report2 = useProgressStore.getState().recordRound(withQuest, 1);
    expect(report2.questCompleted).toBe(false);
  });
});

describe('daily quest verse', () => {
  it('is deterministic for a given date and comes from the master list', () => {
    const d = new Date(2026, 6, 14);
    const a = getDailyQuestVerse(d);
    const b = getDailyQuestVerse(d);
    expect(a.id).toBe(b.id);
    expect(DM_MASTER.some((item) => item.id === a.id)).toBe(true);
  });
});

describe('workMastery', () => {
  it('counts a verse after 3 correct answers', () => {
    const sample = DM_MASTER[0];
    const mastery = workMastery({
      [sample.id]: { crownLevel: 0, crownProgress: 0, timesCorrect: 3, timesMissed: 0 },
    });
    expect(mastery[sample.work].mastered).toBe(1);
  });
});

describe('eraseAll', () => {
  it('resets progression to a blank slate', () => {
    useProgressStore.getState().recordRound(makeSummary(), 5);
    useProgressStore.getState().setName('Eli');
    useProgressStore.getState().eraseAll();
    const s = useProgressStore.getState();
    expect(s.xp).toBe(0);
    expect(s.badges).toEqual([]);
    expect(s.verses).toEqual({});
    expect(s.name).toBe('');
  });
});
