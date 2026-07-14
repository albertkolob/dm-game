import { describe, it, expect } from 'vitest';
import {
  xpToNext,
  totalXpForLevel,
  levelFromXp,
  levelProgress,
  rankFromPoints,
  comboMultiplier,
} from './progression';

describe('level math', () => {
  it('level 1 -> 2 costs 500, each level +250 more', () => {
    expect(xpToNext(1)).toBe(500);
    expect(xpToNext(2)).toBe(750);
    expect(xpToNext(7)).toBe(2000);
  });

  it('totalXpForLevel accumulates the ladder', () => {
    expect(totalXpForLevel(1)).toBe(0);
    expect(totalXpForLevel(2)).toBe(500);
    expect(totalXpForLevel(3)).toBe(1250);
  });

  it('levelFromXp inverts the ladder', () => {
    expect(levelFromXp(0)).toBe(1);
    expect(levelFromXp(499)).toBe(1);
    expect(levelFromXp(500)).toBe(2);
    expect(levelFromXp(1249)).toBe(2);
    expect(levelFromXp(1250)).toBe(3);
  });

  it('levelProgress reports XP into the current level', () => {
    const p = levelProgress(600);
    expect(p.level).toBe(2);
    expect(p.into).toBe(100);
    expect(p.needed).toBe(750);
  });
});

describe('rank tiers', () => {
  it('starts at bronze3 and climbs every 180 points', () => {
    expect(rankFromPoints(0)).toBe('bronze3');
    expect(rankFromPoints(179)).toBe('bronze3');
    expect(rankFromPoints(180)).toBe('bronze2');
    expect(rankFromPoints(540)).toBe('silver3');
  });

  it('caps at platinum1', () => {
    expect(rankFromPoints(999999)).toBe('platinum1');
  });
});

describe('comboMultiplier', () => {
  it('equals the streak, capped at 10, minimum 1', () => {
    expect(comboMultiplier(0)).toBe(1);
    expect(comboMultiplier(1)).toBe(1);
    expect(comboMultiplier(4)).toBe(4);
    expect(comboMultiplier(15)).toBe(10);
  });
});
