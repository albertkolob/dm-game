import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Trophy, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useGameStore } from '@/store/useGameStore';

export function TeamScoreboard() {
  const { t } = useTranslation();
  const { teams, currentTeamIndex, isPlaying } = useGameStore();

  // Sort teams by score for ranking
  const rankedTeams = [...teams].sort((a, b) => b.score - a.score);
  const topScore = rankedTeams[0]?.score || 0;

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-warning" />
          {t('team.scoreboard')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {teams.map((team, index) => {
          const isCurrentTeam = isPlaying && index === currentTeamIndex;
          const isLeading = team.score === topScore && topScore > 0;

          return (
            <motion.div
              key={team.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                'flex items-center justify-between p-4 rounded-xl transition-all',
                isCurrentTeam && 'ring-2 ring-primary ring-offset-2 ring-offset-background',
                !isCurrentTeam && 'bg-secondary/50'
              )}
              style={{
                backgroundColor: isCurrentTeam ? `${team.color}20` : undefined,
                borderLeft: `4px solid ${team.color}`,
              }}
            >
              <div className="flex items-center gap-3">
                {isLeading && (
                  <Crown className="w-5 h-5 text-warning" />
                )}
                <span className="font-medium">{team.name}</span>
                {isCurrentTeam && (
                  <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                    {t('team.currentTeam')}
                  </span>
                )}
              </div>
              <motion.span
                key={team.score}
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                className="font-bold text-xl tabular-nums"
              >
                {team.score}
              </motion.span>
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
}

export function TeamWinner() {
  const { t } = useTranslation();
  const { teams } = useGameStore();

  const rankedTeams = [...teams].sort((a, b) => b.score - a.score);
  const topScore = rankedTeams[0]?.score || 0;
  const winners = rankedTeams.filter((t) => t.score === topScore);
  const isTie = winners.length > 1;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-6"
    >
      <Trophy className="w-20 h-20 text-warning mx-auto" />

      {isTie ? (
        <>
          <h2 className="text-3xl font-bold">{t('team.tie')}</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {winners.map((team) => (
              <div
                key={team.id}
                className="px-4 py-2 rounded-xl font-medium"
                style={{ backgroundColor: `${team.color}30`, borderColor: team.color }}
              >
                {team.name}
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <h2 className="text-3xl font-bold">{winners[0]?.name}</h2>
          <p className="text-xl text-muted-foreground">{t('team.winner')}</p>
        </>
      )}

      <div className="text-4xl font-bold text-warning">{topScore} pts</div>
    </motion.div>
  );
}
