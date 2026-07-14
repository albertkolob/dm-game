import { GameMode } from '@/data/types';

/**
 * Pure progression math, kept separate from the store for easy testing.
 */

// XP needed to go from level N to N+1
export function xpToNext(level: number): number {
  return 500 + 250 * (level - 1);
}

// Total XP required to reach a level (level 1 = 0 XP)
export function totalXpForLevel(level: number): number {
  let total = 0;
  for (let n = 1; n < level; n++) total += xpToNext(n);
  return total;
}

export function levelFromXp(xp: number): number {
  let level = 1;
  let remaining = xp;
  while (remaining >= xpToNext(level)) {
    remaining -= xpToNext(level);
    level++;
  }
  return level;
}

// XP progress within the current level: [earned, needed]
export function levelProgress(xp: number): { level: number; into: number; needed: number } {
  const level = levelFromXp(xp);
  return { level, into: xp - totalXpForLevel(level), needed: xpToNext(level) };
}

// Rank ladder: Bronze III ... Platinum I, driven by the sum of best scores
export const RANK_TIERS = [
  'bronze3', 'bronze2', 'bronze1',
  'silver3', 'silver2', 'silver1',
  'gold3', 'gold2', 'gold1',
  'platinum3', 'platinum2', 'platinum1',
] as const;

export type RankTier = (typeof RANK_TIERS)[number];

const RANK_STEP = 180;

export function rankFromPoints(points: number): RankTier {
  const index = Math.min(Math.floor(points / RANK_STEP), RANK_TIERS.length - 1);
  return RANK_TIERS[Math.max(0, index)];
}

export function rankPoints(bests: Partial<Record<GameMode, { score: number; combo: number }>>): number {
  return Object.values(bests).reduce((sum, b) => sum + (b?.score ?? 0), 0);
}

// Combo scoring: base 10 points x multiplier, multiplier = streak capped at x10
export const COMBO_BASE = 10;
export const COMBO_CAP = 10;
export const SPEED_WINDOW_SECONDS = 5;
export const SPEED_BONUS_TEAM = 50;
export const SPEED_BONUS_XP_SOLO = 5;
export const DAILY_QUEST_XP = 50;
export const ACE_PARTIAL_POINTS = 15;

export function comboMultiplier(streak: number): number {
  return Math.max(1, Math.min(streak, COMBO_CAP));
}

// Verse crowns: perfect rounds containing a verse advance its crown;
// every PERFECTS_PER_CROWN perfect rounds = +1 crown level (max 5)
export const CROWN_MAX_LEVEL = 5;
export const PERFECTS_PER_CROWN = 2;

export interface VerseProgress {
  crownLevel: number;
  crownProgress: number;
  timesCorrect: number;
  timesMissed: number;
}

export function emptyVerseProgress(): VerseProgress {
  return { crownLevel: 0, crownProgress: 0, timesCorrect: 0, timesMissed: 0 };
}

// Badges
export const BADGE_IDS = [
  'first_round',
  'perfect_round',
  'combo10',
  'streak7',
  'streak30',
  'level5',
  'level10',
  'work90',
] as const;

export type BadgeId = (typeof BADGE_IDS)[number];

// A verse counts toward work mastery once answered correctly 3+ times
export const MASTERY_CORRECT_THRESHOLD = 3;
