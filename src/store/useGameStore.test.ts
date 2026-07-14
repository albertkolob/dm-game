import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useGameStore } from './useGameStore';
import { useProgressStore } from './useProgressStore';
import { Question, GameResult } from '@/data/types';

const SLOW = { timeSpent: 10 }; // outside the 5s speed window

function makeQuestion(n: number): Question {
  return {
    type: 'ref',
    prompt: `prompt ${n}`,
    options: ['a', 'b', 'c', 'd'],
    correctIndex: 0,
    meta: { id: `q-${n}`, ref: `Ref ${n}:${n}` },
  };
}

function makeResult(n: number, correct = true): GameResult {
  return {
    questionId: `q-${n}`,
    reference: `Ref ${n}:${n}`,
    correct,
    timeSpent: 5,
    mode: 'reference_rush',
  };
}

const questions = [1, 2, 3].map(makeQuestion);
const initialState = useGameStore.getState();
const initialProgress = useProgressStore.getState();

beforeEach(() => {
  useGameStore.setState(initialState, true);
  useProgressStore.setState(initialProgress, true);
});

describe('startGame', () => {
  it('initializes a fresh session', () => {
    useGameStore.getState().startGame('reference_rush', questions);
    const s = useGameStore.getState();
    expect(s.isPlaying).toBe(true);
    expect(s.score).toBe(0);
    expect(s.streak).toBe(0);
    expect(s.results).toEqual([]);
    expect(s.totalQuestions).toBe(3);
    expect(s.currentQuestion).toEqual(questions[0]);
    expect(s.lives).toBe(Infinity);
  });

  it('grants 3 lives in lightning ladder', () => {
    useGameStore.getState().startGame('lightning_ladder', questions);
    expect(useGameStore.getState().lives).toBe(3);
  });
});

describe('answerQuestion (combo scoring)', () => {
  it('scores 10 x combo multiplier on consecutive correct answers', () => {
    useGameStore.getState().startGame('reference_rush', questions);
    useGameStore.getState().answerQuestion({ correct: true, ...SLOW }); // x1 = 10
    useGameStore.getState().answerQuestion({ correct: true, ...SLOW }); // x2 = 20
    useGameStore.getState().answerQuestion({ correct: true, ...SLOW }); // x3 = 30
    const s = useGameStore.getState();
    expect(s.score).toBe(60);
    expect(s.streak).toBe(3);
    expect(s.bestStreak).toBe(3);
    expect(s.lastPointsEarned).toBe(30);
  });

  it('caps the combo multiplier at x10', () => {
    useGameStore.getState().startGame('reference_rush', questions);
    for (let i = 0; i < 12; i++) {
      useGameStore.getState().answerQuestion({ correct: true, ...SLOW });
    }
    // 10+20+...+100 for the first 10, then 100 each
    expect(useGameStore.getState().score).toBe(550 + 200);
  });

  it('scores flat 10 per answer when combos are disabled', () => {
    useGameStore.getState().updateSettings({ enableCombos: false });
    useGameStore.getState().startGame('reference_rush', questions);
    useGameStore.getState().answerQuestion({ correct: true, ...SLOW });
    useGameStore.getState().answerQuestion({ correct: true, ...SLOW });
    expect(useGameStore.getState().score).toBe(20);
  });

  it('counts fast answers for the solo speed XP bonus', () => {
    useGameStore.getState().startGame('reference_rush', questions);
    useGameStore.getState().answerQuestion({ correct: true, timeSpent: 3 });
    useGameStore.getState().answerQuestion({ correct: true, timeSpent: 9 });
    expect(useGameStore.getState().fastAnswers).toBe(1);
  });

  it('awards +50 speed bonus points to the active team on fast answers', () => {
    useGameStore.getState().setTeams([
      { id: 't1', name: 'A', score: 0, color: '#fff' },
      { id: 't2', name: 'B', score: 0, color: '#000' },
    ]);
    useGameStore.getState().setIsTeamMode(true);
    useGameStore.getState().startGame('team_mode', questions);
    useGameStore.getState().answerQuestion({ correct: true, timeSpent: 2 });
    expect(useGameStore.getState().teams[0].score).toBe(60); // 10 x1 + 50
  });

  it('gives partial ACE credit without advancing the combo', () => {
    useGameStore.getState().startGame('ace_match', questions);
    useGameStore.getState().answerQuestion({ correct: true, ...SLOW });
    useGameStore.getState().answerQuestion({ correct: false, partial: true, ...SLOW });
    const s = useGameStore.getState();
    expect(s.score).toBe(10 + 15);
    expect(s.streak).toBe(0);
  });

  it('resets the streak on a wrong answer but keeps bestStreak', () => {
    useGameStore.getState().startGame('reference_rush', questions);
    useGameStore.getState().answerQuestion({ correct: true, ...SLOW });
    useGameStore.getState().answerQuestion({ correct: false, ...SLOW });
    const s = useGameStore.getState();
    expect(s.streak).toBe(0);
    expect(s.bestStreak).toBe(1);
    expect(s.lastPointsEarned).toBe(0);
  });

  it('costs a life in lightning ladder on a wrong answer', () => {
    useGameStore.getState().startGame('lightning_ladder', questions);
    useGameStore.getState().answerQuestion({ correct: false, ...SLOW });
    expect(useGameStore.getState().lives).toBe(2);
  });

  it('ends the game when the last life is lost', () => {
    useGameStore.getState().startGame('lightning_ladder', questions);
    for (let i = 0; i < 3; i++) {
      useGameStore.getState().addResult(makeResult(i, false));
      useGameStore.getState().answerQuestion({ correct: false, ...SLOW });
    }
    const s = useGameStore.getState();
    expect(s.lives).toBe(0);
    expect(s.isPlaying).toBe(false);
    expect(s.totalVersesStudied).toBe(3);
  });
});

describe('nextQuestion', () => {
  it('advances through the pool and resets the clock', () => {
    useGameStore.getState().startGame('reference_rush', questions);
    useGameStore.getState().setTimeRemaining(3);
    useGameStore.getState().nextQuestion();
    const s = useGameStore.getState();
    expect(s.questionIndex).toBe(1);
    expect(s.currentQuestion).toEqual(questions[1]);
    expect(s.timeRemaining).toBe(s.settings.timePerQuestion);
  });

  it('ends the game after the last question', () => {
    useGameStore.getState().startGame('reference_rush', questions);
    for (let i = 0; i < 3; i++) {
      useGameStore.getState().addResult(makeResult(i));
      useGameStore.getState().nextQuestion();
    }
    const s = useGameStore.getState();
    expect(s.isPlaying).toBe(false);
    expect(s.currentQuestion).toBeNull();
  });
});

describe('endGame stat recording', () => {
  it('credits one verse per answered question, exactly once', () => {
    useGameStore.getState().startGame('reference_rush', questions);
    useGameStore.getState().addResult(makeResult(1));
    useGameStore.getState().addResult(makeResult(2));
    useGameStore.getState().endGame();
    useGameStore.getState().endGame(); // e.g. unmount cleanup after quit
    expect(useGameStore.getState().totalVersesStudied).toBe(2);
  });

  it('accumulates across sessions', () => {
    useGameStore.getState().startGame('reference_rush', questions);
    useGameStore.getState().addResult(makeResult(1));
    useGameStore.getState().endGame();

    useGameStore.getState().startGame('reference_rush', questions);
    useGameStore.getState().addResult(makeResult(2));
    useGameStore.getState().addResult(makeResult(3));
    useGameStore.getState().endGame();

    expect(useGameStore.getState().totalVersesStudied).toBe(3);
  });
});

describe('hasAnswered (timer pause during feedback)', () => {
  it('is set by answerQuestion and cleared by nextQuestion', () => {
    useGameStore.getState().startGame('reference_rush', questions);
    expect(useGameStore.getState().hasAnswered).toBe(false);

    useGameStore.getState().answerQuestion({ correct: true, ...SLOW });
    expect(useGameStore.getState().hasAnswered).toBe(true);

    useGameStore.getState().nextQuestion();
    expect(useGameStore.getState().hasAnswered).toBe(false);
  });

  it('is set on wrong answers too', () => {
    useGameStore.getState().startGame('reference_rush', questions);
    useGameStore.getState().answerQuestion({ correct: false, ...SLOW });
    expect(useGameStore.getState().hasAnswered).toBe(true);
  });

  it('resets when a new game starts', () => {
    useGameStore.getState().startGame('reference_rush', questions);
    useGameStore.getState().answerQuestion({ correct: true, ...SLOW });
    useGameStore.getState().startGame('reference_rush', questions);
    expect(useGameStore.getState().hasAnswered).toBe(false);
  });
});

describe('decrementTime', () => {
  it('counts down and stops at zero', () => {
    useGameStore.getState().startGame('reference_rush', questions);
    useGameStore.getState().setTimeRemaining(1);
    useGameStore.getState().decrementTime();
    expect(useGameStore.getState().timeRemaining).toBe(0);
    useGameStore.getState().decrementTime();
    expect(useGameStore.getState().timeRemaining).toBe(0);
  });
});

describe('updateDayStreak', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts at 1, ignores repeat plays, grows on consecutive local days, resets after a gap', () => {
    vi.useFakeTimers();

    vi.setSystemTime(new Date(2026, 6, 10, 20, 0, 0));
    useGameStore.getState().updateDayStreak();
    expect(useGameStore.getState().dayStreak).toBe(1);

    // same local day, later in the evening
    vi.setSystemTime(new Date(2026, 6, 10, 23, 30, 0));
    useGameStore.getState().updateDayStreak();
    expect(useGameStore.getState().dayStreak).toBe(1);

    // next local day
    vi.setSystemTime(new Date(2026, 6, 11, 6, 0, 0));
    useGameStore.getState().updateDayStreak();
    expect(useGameStore.getState().dayStreak).toBe(2);

    // two days skipped
    vi.setSystemTime(new Date(2026, 6, 14, 12, 0, 0));
    useGameStore.getState().updateDayStreak();
    expect(useGameStore.getState().dayStreak).toBe(1);
  });
});

describe('team mode', () => {
  it('rotates teams on nextQuestion and scores the active team', () => {
    const teams = [
      { id: 't1', name: 'A', score: 0, color: '#fff' },
      { id: 't2', name: 'B', score: 0, color: '#000' },
    ];
    useGameStore.getState().setTeams(teams);
    useGameStore.getState().setIsTeamMode(true);
    useGameStore.getState().startGame('team_mode', questions);

    useGameStore.getState().answerQuestion({ correct: true, ...SLOW });
    expect(useGameStore.getState().teams[0].score).toBe(10);

    useGameStore.getState().nextQuestion();
    expect(useGameStore.getState().currentTeamIndex).toBe(1);

    // Combos are per team: B starts at x1, it does NOT inherit A's streak
    useGameStore.getState().answerQuestion({ correct: true, ...SLOW });
    expect(useGameStore.getState().teams[1].score).toBe(10);
  });

  it('resumes each team its own combo streak on its next turn', () => {
    const teams = [
      { id: 't1', name: 'A', score: 0, color: '#fff' },
      { id: 't2', name: 'B', score: 0, color: '#000' },
    ];
    useGameStore.getState().setTeams(teams);
    useGameStore.getState().setIsTeamMode(true);
    useGameStore.getState().startGame('team_mode', [1, 2, 3, 4].map(makeQuestion));

    useGameStore.getState().answerQuestion({ correct: true, ...SLOW }); // A x1 = 10
    useGameStore.getState().nextQuestion();
    useGameStore.getState().answerQuestion({ correct: false, ...SLOW }); // B misses
    useGameStore.getState().nextQuestion();
    useGameStore.getState().answerQuestion({ correct: true, ...SLOW }); // A resumes x2 = 20

    const s = useGameStore.getState();
    expect(s.teams[0].score).toBe(30);
    expect(s.teams[1].score).toBe(0);
  });
});
