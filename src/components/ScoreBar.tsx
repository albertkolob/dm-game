import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useGameStore } from '@/store/useGameStore';
import { COMBO_BASE, comboMultiplier } from '@/lib/progression';

/* Segmented round progress: one segment per question */
export function ProgressSegments({ className }: { className?: string }) {
  const { questionIndex, totalQuestions } = useGameStore();
  const segments = Math.max(totalQuestions, 1);

  return (
    <div
      className={cn('flex gap-1 flex-1', className)}
      role="progressbar"
      aria-valuenow={questionIndex + 1}
      aria-valuemin={1}
      aria-valuemax={segments}
    >
      {Array.from({ length: segments }, (_, i) => (
        <div
          key={i}
          className={cn(
            'h-[5px] flex-1 rounded-full transition-colors duration-200',
            i <= questionIndex ? 'bg-primary' : 'bg-secondary'
          )}
        />
      ))}
    </div>
  );
}

/* Combo pill: flame + xN + points-per-hit, pops when the combo grows */
export function ComboPill({ className }: { className?: string }) {
  const { t } = useTranslation();
  const { streak, settings } = useGameStore();
  if (!settings.enableCombos) return null;

  const multiplier = comboMultiplier(streak);
  const active = streak > 1;

  return (
    <motion.div
      key={multiplier}
      initial={{ scale: active ? 1.25 : 1 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.25 }}
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-bold tabular-nums',
        active
          ? 'bg-streak/10 border-streak/50 text-streak'
          : 'bg-secondary border-transparent text-muted-foreground',
        className
      )}
    >
      <Flame className="w-4 h-4" aria-hidden="true" />
      <span className="theme-label">{t('game.combo', { multiplier })}</span>
      {active && (
        <span className="text-xs font-semibold opacity-80">
          +{COMBO_BASE * multiplier}/{t('game.hit')}
        </span>
      )}
    </motion.div>
  );
}

/* Bottom score strip; hearts only in lightning ladder */
export function ScoreFooter({ className }: { className?: string }) {
  const { t } = useTranslation();
  const { score, lives, currentMode } = useGameStore();
  const showLives = currentMode === 'lightning_ladder';

  return (
    <div className={cn('flex items-center justify-between', className)}>
      <span className="text-[11px] font-bold theme-label text-muted-foreground">{t('game.score')}</span>

      <div className="flex items-center gap-3">
        {showLives && (
          <div className="flex items-center gap-1" aria-label={`${lives} lives`}>
            {Array.from({ length: 3 }, (_, i) => (
              <Heart
                key={i}
                className={cn('w-5 h-5', i < lives ? 'text-accent2 fill-current' : 'text-muted-foreground/40')}
              />
            ))}
          </div>
        )}
        <AnimatePresence mode="popLayout">
          <motion.span
            key={score}
            initial={{ scale: 1.2, y: -2 }}
            animate={{ scale: 1, y: 0 }}
            className="text-xl font-bold text-gold tabular-nums"
          >
            {score.toLocaleString()}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
