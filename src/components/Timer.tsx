import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useGameStore } from '@/store/useGameStore';

export function Timer() {
  const { timeRemaining, decrementTime, isPaused, isPlaying, hasAnswered, settings } = useGameStore();
  const isExpired = timeRemaining <= 0;

  useEffect(() => {
    // hasAnswered pauses the countdown while the feedback screen is showing
    if (!isPlaying || isPaused || isExpired || hasAnswered) return;

    const interval = setInterval(() => {
      decrementTime();
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, isPaused, isExpired, hasAnswered, decrementTime]);

  const percentage = (timeRemaining / settings.timePerQuestion) * 100;
  const isLow = timeRemaining <= 5;
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className="flex items-center gap-3 flex-1" role="timer" aria-live="polite">
      <span
        className={cn(
          'text-[26px] leading-none font-bold tabular-nums',
          isLow ? 'text-streak animate-pulse' : 'text-primary'
        )}
      >
        {minutes}:{seconds.toString().padStart(2, '0')}
      </span>
      <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className={cn('h-full rounded-full', isLow ? 'bg-streak' : 'bg-primary')}
          initial={{ width: '100%' }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}
