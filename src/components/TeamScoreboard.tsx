import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Crown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useGameStore } from '@/store/useGameStore';
import { ConfettiBurst } from './Progression';

export function TeamScoreboard() {
  const { t } = useTranslation();
  const { teams, currentTeamIndex, isPlaying } = useGameStore();

  return (
    <div className="space-y-2" role="list" aria-label={t('team.scoreboard')}>
      {teams.map((team, index) => {
        const isCurrentTeam = isPlaying && index === currentTeamIndex;

        return (
          <motion.div
            key={team.id}
            role="listitem"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.06 }}
            className={cn(
              'flex items-center gap-3 rounded-2xl border px-4 py-3 transition-all',
              isCurrentTeam ? 'border-primary bg-primary/8 raised-primary' : 'border-border bg-card raised-card'
            )}
          >
            <span
              className="w-3 h-3 rounded shrink-0"
              style={{ backgroundColor: team.color }}
              aria-hidden="true"
            />
            <span className="font-semibold flex-1 truncate">{team.name}</span>
            {isCurrentTeam && (
              <span className="text-[10px] font-bold theme-label bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                {t('team.upNow')}
              </span>
            )}
            <motion.span
              key={team.score}
              initial={{ scale: 1.3 }}
              animate={{ scale: 1 }}
              className="font-bold text-lg tabular-nums"
            >
              {team.score.toLocaleString()}
            </motion.span>
          </motion.div>
        );
      })}
    </div>
  );
}

/* End-of-match podium: columns sized by rank, winner in gold with crown */
export function TeamPodium() {
  const { t } = useTranslation();
  const { teams } = useGameStore();

  const ranked = [...teams].sort((a, b) => b.score - a.score);
  const topScore = ranked[0]?.score ?? 0;
  const winners = ranked.filter((team) => team.score === topScore);
  const isTie = winners.length > 1;

  // Podium display order: 2nd, 1st, 3rd
  const podium = [ranked[1], ranked[0], ranked[2]].filter(Boolean);
  const heights: Record<string, number> = {};
  ranked.forEach((team, i) => {
    heights[team.id] = i === 0 ? 112 : i === 1 ? 84 : 64;
  });
  const rest = ranked.slice(3);

  return (
    <div className="relative space-y-6">
      <ConfettiBurst />
      <div className="space-y-1 pt-2">
        <p className="text-[11px] font-bold theme-label text-muted-foreground">{t('team.matchOver')}</p>
        <h1 className="font-heading text-3xl font-bold">
          {isTie ? t('team.tie') : t('team.winnerIs', { name: winners[0]?.name })}
        </h1>
      </div>

      <div className="flex items-end justify-center gap-3">
        {podium.map((team) => {
          const isWinner = team.score === topScore;
          const rank = ranked.findIndex((t) => t.id === team.id) + 1;
          return (
            <div key={team.id} className="flex flex-col items-center gap-1.5 w-24">
              {isWinner && <Crown className="w-6 h-6 text-gold" aria-hidden="true" />}
              <span className="text-xs font-bold theme-label truncate max-w-full">{team.name}</span>
              <span className={cn('font-bold tabular-nums', isWinner ? 'text-xl' : 'text-muted-foreground')}>
                {team.score.toLocaleString()}
              </span>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: heights[team.id] }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className={cn('w-full rounded-t-xl flex items-start justify-center pt-2', isWinner && 'raised-gold')}
                style={{ backgroundColor: team.color }}
              >
                <span className="text-xl font-bold text-background/80">{rank}</span>
              </motion.div>
            </div>
          );
        })}
      </div>

      {rest.length > 0 && (
        <div className="space-y-1.5">
          {rest.map((team, i) => (
            <div key={team.id} className="flex items-center gap-3 rounded-xl bg-secondary px-4 py-2 text-sm">
              <span className="text-muted-foreground tabular-nums">{i + 4}.</span>
              <span className="w-2.5 h-2.5 rounded" style={{ backgroundColor: team.color }} aria-hidden="true" />
              <span className="font-semibold flex-1 truncate text-left">{team.name}</span>
              <span className="font-bold tabular-nums">{team.score.toLocaleString()}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
