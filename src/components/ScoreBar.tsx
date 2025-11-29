import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Heart, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useGameStore } from '@/store/useGameStore';

export function ScoreBar() {
  const { t } = useTranslation();
  const { score, streak, lives, currentMode, questionIndex, totalQuestions } = useGameStore();
  const showLives = currentMode === 'lightning_ladder';

  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3 bg-card rounded-2xl">
      {/* Score */}
      <div className="flex items-center gap-2">
        <Trophy className="w-5 h-5 text-warning" />
        <AnimatePresence mode="wait">
          <motion.span
            key={score}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            className="font-bold text-lg tabular-nums"
          >
            {score}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Streak */}
      <div className="flex items-center gap-2">
        <Flame className={cn('w-5 h-5', streak >= 3 ? 'text-orange-500' : 'text-muted-foreground')} />
        <AnimatePresence mode="wait">
          <motion.span
            key={streak}
            initial={{ scale: 1.5 }}
            animate={{ scale: 1 }}
            className={cn(
              'font-bold text-lg tabular-nums',
              streak >= 5 && 'text-orange-500'
            )}
          >
            {streak}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Lives (Lightning Ladder only) */}
      {showLives && (
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Heart
              key={i}
              className={cn(
                'w-5 h-5 transition-all',
                i < lives ? 'text-destructive fill-destructive' : 'text-muted-foreground'
              )}
            />
          ))}
        </div>
      )}

      {/* Question progress */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="font-medium">
          {questionIndex + 1}/{totalQuestions}
        </span>
      </div>
    </div>
  );
}
