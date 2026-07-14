import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import { cn } from '@/lib/utils';
import { levelProgress, RankTier } from '@/lib/progression';
import { useProgressStore } from '@/store/useProgressStore';
import { useRankLabel } from '@/hooks/useProgressionLabels';

/* ---------- Avatar with level ring ---------- */

interface AvatarRingProps {
  size?: number;
  showLevelPill?: boolean;
  className?: string;
}

export function AvatarRing({ size = 48, showLevelPill = false, className }: AvatarRingProps) {
  const { name, avatarDataUrl, xp } = useProgressStore();
  const { level } = levelProgress(xp);
  const initial = (name || 'DM').trim().charAt(0).toUpperCase();

  return (
    <div className={cn('relative inline-flex', className)} style={{ width: size, height: size }}>
      <div
        className="w-full h-full rounded-full border-[3px] border-primary bg-secondary flex items-center justify-center overflow-hidden raised-primary"
        aria-hidden="true"
      >
        {avatarDataUrl ? (
          <img src={avatarDataUrl} alt="" className="w-full h-full object-cover" />
        ) : (
          <span className="font-heading font-bold text-primary" style={{ fontSize: size * 0.4 }}>
            {initial}
          </span>
        )}
      </div>
      {showLevelPill && (
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold theme-label whitespace-nowrap">
          LVL {level}
        </span>
      )}
      {!showLevelPill && (
        <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
          {level}
        </span>
      )}
    </div>
  );
}

/* ---------- Pills ---------- */

export function RankPill({ tier, className }: { tier: RankTier; className?: string }) {
  const label = useRankLabel(tier);
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-bold theme-label',
        'bg-gold-soft text-gold border border-gold-border',
        className
      )}
    >
      {label}
    </span>
  );
}

export function StreakPill({ days, className }: { days: number; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold',
        'bg-streak/10 text-streak border border-streak/40',
        className
      )}
    >
      <Flame className="w-4 h-4" aria-hidden="true" />
      {days}
    </span>
  );
}

/* ---------- XP bar ---------- */

export function XpBar({ className }: { className?: string }) {
  const { t } = useTranslation();
  const { xp } = useProgressStore();
  const { level, into, needed } = levelProgress(xp);
  const pct = Math.min(100, Math.round((into / needed) * 100));

  return (
    <div className={cn('space-y-1.5', className)}>
      <div className="flex items-baseline justify-between text-xs font-semibold">
        <span className="theme-label text-muted-foreground">
          {t('progress.level')} {level}
        </span>
        <span className="text-muted-foreground tabular-nums">
          {into.toLocaleString()} / {needed.toLocaleString()} XP
        </span>
      </div>
      <div
        className="h-2 rounded-full bg-secondary overflow-hidden"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${t('progress.level')} ${level}`}
      >
        <motion.div
          className="h-full rounded-full xp-fill"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

/* ---------- Animated XP ring (results) ---------- */

export function XpRing({ xpGained, size = 130 }: { xpGained: number; size?: number }) {
  const r = 56;
  const circumference = 2 * Math.PI * r;
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      <svg className="w-full h-full -rotate-90" viewBox="0 0 130 130" aria-hidden="true">
        <circle cx="65" cy="65" r={r} fill="none" strokeWidth="8" className="stroke-secondary" />
        <circle
          cx="65"
          cy="65"
          r={r}
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
          className="stroke-primary"
          strokeDasharray={circumference}
          strokeDashoffset={mounted ? circumference * 0.1 : circumference}
          style={{ transition: 'stroke-dashoffset 600ms ease-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-primary tabular-nums">+{xpGained.toLocaleString()}</span>
        <span className="text-xs font-bold theme-label text-muted-foreground">XP</span>
      </div>
    </div>
  );
}

/* ---------- Confetti (decorative, reduced-motion safe) ---------- */

const CONFETTI_COLORS = ['#f5b52e', '#2ab3a6', '#f0705a', '#8f7ae5', '#22d3ee', '#a78bfa'];

export function ConfettiBurst({ count = 18 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 h-32 overflow-hidden" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className={cn('absolute block animate-confetti', i % 3 === 0 ? 'rounded-full' : 'rounded-[2px]')}
          style={{
            left: `${(i * 53) % 100}%`,
            width: i % 3 === 0 ? 8 : 7,
            height: i % 3 === 0 ? 8 : 10,
            backgroundColor: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
            animationDelay: `${(i % 6) * 120}ms`,
          }}
        />
      ))}
    </div>
  );
}
