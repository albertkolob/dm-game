import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useGameStore } from './useGameStore';
import { Question, GameResult } from '@/data/types';

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

beforeEach(() => {
  useGameStore.setState(initialState, true);
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

describe('answerQuestion', () => {
  it('adds points and grows the streak on correct answers', () => {
    useGameStore.getState().startGame('reference_rush', questions);
    useGameStore.getState().answerQuestion(true, 100);
    useGameStore.getState().answerQuestion(true, 100);
    const s = useGameStore.getState();
    expect(s.score).toBe(200);
    expect(s.streak).toBe(2);
    expect(s.bestStreak).toBe(2);
  });

  it('adds a +10 bonus on every 5th streak answer', () => {
    useGameStore.getState().startGame('reference_rush', questions);
    for (let i = 0; i < 5; i++) {
      useGameStore.getState().answerQuestion(true, 100);
    }
    expect(useGameStore.getState().score).toBe(510);
  });

  it('resets the streak on a wrong answer but keeps bestStreak', () => {
    useGameStore.getState().startGame('reference_rush', questions);
    useGameStore.getState().answerQuestion(true, 100);
    useGameStore.getState().answerQuestion(false, 0);
    const s = useGameStore.getState();
    expect(s.streak).toBe(0);
    expect(s.bestStreak).toBe(1);
  });

  it('costs a life in lightning ladder on a wrong answer', () => {
    useGameStore.getState().startGame('lightning_ladder', questions);
    useGameStore.getState().answerQuestion(false, 0);
    expect(useGameStore.getState().lives).toBe(2);
  });

  it('ends the game when the last life is lost', () => {
    useGameStore.getState().startGame('lightning_ladder', questions);
    for (let i = 0; i < 3; i++) {
      useGameStore.getState().addResult(makeResult(i, false));
      useGameStore.getState().answerQuestion(false, 0);
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

    useGameStore.getState().answerQuestion(true, 100);
    expect(useGameStore.getState().teams[0].score).toBe(100);

    useGameStore.getState().nextQuestion();
    expect(useGameStore.getState().currentTeamIndex).toBe(1);

    useGameStore.getState().answerQuestion(true, 100);
    expect(useGameStore.getState().teams[1].score).toBe(100);
  });
});
