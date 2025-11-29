import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useGameStore } from '@/store/useGameStore';

interface TimerProps {
  onTimeUp?: () => void;
}

export function Timer({ onTimeUp }: TimerProps) {
  const { timeRemaining, decrementTime, isPaused, isPlaying, settings } = useGameStore();

  useEffect(() => {
    if (!isPlaying || isPaused) return;

    const interval = setInterval(() => {
      decrementTime();
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, isPaused, decrementTime]);

  useEffect(() => {
    if (timeRemaining <= 0 && onTimeUp) {
      onTimeUp();
    }
  }, [timeRemaining, onTimeUp]);

  const percentage = (timeRemaining / settings.timePerQuestion) * 100;
  const isLow = timeRemaining <= 5;
  const isCritical = timeRemaining <= 3;

  return (
    <div className="relative flex items-center gap-3" role="timer" aria-live="polite">
      {/* Circular progress */}
      <div className="relative w-14 h-14">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
          {/* Background circle */}
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-secondary"
          />
          {/* Progress circle */}
          <motion.circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={100}
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: 100 - percentage }}
            transition={{ duration: 0.3 }}
            className={cn(
              isCritical ? 'text-destructive' : isLow ? 'text-warning' : 'text-primary'
            )}
            style={{ strokeDasharray: '100 100' }}
          />
        </svg>
        {/* Time text */}
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center font-bold text-lg',
            isCritical && 'text-destructive animate-pulse'
          )}
        >
          {timeRemaining}
        </div>
      </div>

      {/* Time bar for mobile */}
      <div className="flex-1 sm:hidden">
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className={cn(
              'h-full rounded-full',
              isCritical ? 'bg-destructive' : isLow ? 'bg-warning' : 'bg-primary'
            )}
            initial={{ width: '100%' }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </div>
  );
}
