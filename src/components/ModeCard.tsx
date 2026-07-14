import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { LucideIcon, Zap, PenLine, Shapes, Flame, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GameMode } from '@/data/types';
import { useProgressStore } from '@/store/useProgressStore';

interface ModeCardProps {
  mode: GameMode;
  onClick: () => void;
  disabled?: boolean;
}

const modeConfig: Record<GameMode, { icon: LucideIcon; color: string; bg: string }> = {
  reference_rush: { icon: Zap, color: 'text-gold', bg: 'bg-gold/15' },
  fill_verse: { icon: PenLine, color: 'text-primary', bg: 'bg-primary/15' },
  ace_match: { icon: Shapes, color: 'text-accent2', bg: 'bg-accent2/15' },
  lightning_ladder: { icon: Flame, color: 'text-streak', bg: 'bg-streak/15' },
  team_mode: { icon: Users, color: 'text-teal', bg: 'bg-teal/15' },
};

const modeTranslationKeys: Record<GameMode, string> = {
  reference_rush: 'modes.referenceRush',
  fill_verse: 'modes.fillVerse',
  ace_match: 'modes.aceMatch',
  lightning_ladder: 'modes.lightningLadder',
  team_mode: 'modes.teamMode',
};

// Which personal best to brag about per mode
const bestLineFor = (mode: GameMode, best?: { score: number; combo: number }): 'score' | 'combo' =>
  mode === 'fill_verse' || mode === 'ace_match' ? (best?.combo ? 'combo' : 'score') : 'score';

export function ModeCard({ mode, onClick, disabled }: ModeCardProps) {
  const { t } = useTranslation();
  const bests = useProgressStore((s) => s.bests);
  const config = modeConfig[mode];
  const Icon = config.icon;

  const best = bests[mode];
  const hasBest = !!best && (best.score > 0 || best.combo > 0);
  const bestLine = !hasBest
    ? t('home.notRanked')
    : bestLineFor(mode, best) === 'combo'
      ? t('home.bestCombo', { combo: best!.combo })
      : t('home.bestScore', { score: best!.score.toLocaleString() });

  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={cn(
        'w-full h-full rounded-2xl border bg-card p-4 text-left space-y-2 raised-card pressable transition-colors',
        'hover:border-primary/50 focus-visible:ring-2 focus-visible:ring-ring',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      <div className={cn('inline-flex p-2.5 rounded-xl', config.bg, config.color)}>
        <Icon className="w-5 h-5" aria-hidden="true" />
      </div>
      <p className="font-heading font-bold leading-tight">{t(modeTranslationKeys[mode])}</p>
      <p className={cn('text-[10px] font-bold theme-label', hasBest ? 'text-gold' : 'text-muted-foreground')}>
        {bestLine}
      </p>
    </motion.button>
  );
}
