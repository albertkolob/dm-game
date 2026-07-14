import { useTranslation } from 'react-i18next';
import { RankTier } from '@/lib/progression';

const RANK_LABEL: Record<RankTier, { key: string; numeral: string }> = {
  bronze3: { key: 'ranks.bronze', numeral: 'III' },
  bronze2: { key: 'ranks.bronze', numeral: 'II' },
  bronze1: { key: 'ranks.bronze', numeral: 'I' },
  silver3: { key: 'ranks.silver', numeral: 'III' },
  silver2: { key: 'ranks.silver', numeral: 'II' },
  silver1: { key: 'ranks.silver', numeral: 'I' },
  gold3: { key: 'ranks.gold', numeral: 'III' },
  gold2: { key: 'ranks.gold', numeral: 'II' },
  gold1: { key: 'ranks.gold', numeral: 'I' },
  platinum3: { key: 'ranks.platinum', numeral: 'III' },
  platinum2: { key: 'ranks.platinum', numeral: 'II' },
  platinum1: { key: 'ranks.platinum', numeral: 'I' },
};

export function useRankLabel(tier: RankTier): string {
  const { t } = useTranslation();
  const { key, numeral } = RANK_LABEL[tier];
  return `${t(key)} ${numeral}`;
}

// Level titles shown alongside the level (quest results, profile)
const LEVEL_TITLE_KEYS: [number, string][] = [
  [20, 'levelTitles.legend'],
  [16, 'levelTitles.sage'],
  [12, 'levelTitles.verseMaster'],
  [8, 'levelTitles.scholar'],
  [5, 'levelTitles.disciple'],
  [3, 'levelTitles.learner'],
  [1, 'levelTitles.novice'],
];

export function useLevelTitle(level: number): string {
  const { t } = useTranslation();
  const entry =
    LEVEL_TITLE_KEYS.find(([min]) => level >= min) ?? LEVEL_TITLE_KEYS[LEVEL_TITLE_KEYS.length - 1];
  return t(entry[1]);
}
