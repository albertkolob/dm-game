import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Check, Sparkles, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ModeCard } from '@/components/ModeCard';
import { AvatarRing, RankPill, StreakPill, XpBar } from '@/components/Progression';
import { useGameStore } from '@/store/useGameStore';
import { useProgressStore, getDailyQuestVerse, workMastery } from '@/store/useProgressStore';
import { rankFromPoints, rankPoints } from '@/lib/progression';
import { localDateString } from '@/lib/utils';
import { GameMode, Work, WORK_NAMES } from '@/data/types';
import { cn } from '@/lib/utils';

const WORKS: Work[] = ['OT', 'NT', 'BOM', 'DC', 'PGP'];
const WORK_SHORT: Record<Work, string> = { OT: 'OT', NT: 'NT', BOM: 'BoM', DC: 'D&C', PGP: 'PGP' };

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { dayStreak, selectedIds } = useGameStore();
  const { name, bests, verses, questClaimDate } = useProgressStore();

  const rank = rankFromPoints(rankPoints(bests));
  const mastery = workMastery(verses);
  const questVerse = getDailyQuestVerse();
  const questDone = questClaimDate === localDateString();

  const handleModeSelect = (mode: GameMode) => {
    if (mode === 'team_mode') {
      navigate('/teacher');
    } else {
      navigate(`/play/${mode}`);
    }
  };

  const startDailyQuest = () => {
    navigate(`/play/reference_rush?focus=${encodeURIComponent(questVerse.id)}`);
  };

  const disabled = selectedIds.length < 4;

  return (
    <div className="min-h-screen bg-background safe-area-padding">
      <div className="container max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Identity header */}
        <motion.header
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between gap-3"
        >
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center gap-3 text-left rounded-2xl focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={t('profile.title')}
          >
            <AvatarRing size={48} />
            <div className="space-y-1">
              <p className="font-heading font-bold text-lg leading-none">
                {name ? t('home.greeting', { name }) : t('app.title')}
              </p>
              <RankPill tier={rank} />
            </div>
          </button>
          <StreakPill days={dayStreak} />
        </motion.header>

        {/* XP */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }}>
          <XpBar />
        </motion.div>

        {/* Daily quest */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card
            className={cn(
              'border-accent2/60 overflow-hidden',
              !questDone && 'animate-pulse-glow'
            )}
          >
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-accent2/15 text-accent2 shrink-0">
                {questDone ? <Check className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold theme-label text-accent2">{t('quest.daily')}</p>
                <p className="font-semibold text-sm truncate">
                  {t('quest.master', { ref: questVerse.reference })}
                </p>
                <p className="text-xs text-muted-foreground">
                  {questDone ? t('quest.done') : t('quest.reward')}
                </p>
              </div>
              {!questDone && (
                <Button size="sm" onClick={startDailyQuest} disabled={disabled} className="raised-primary pressable shrink-0">
                  {t('quest.go')}
                </Button>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Standard works mastery */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="space-y-2">
          <h2 className="text-[11px] font-bold theme-label text-muted-foreground">
            {t('home.mastery')}
          </h2>
          <div className="grid grid-cols-5 gap-2">
            {WORKS.map((work) => {
              const m = mastery[work] ?? { mastered: 0, total: 0 };
              const pct = m.total > 0 ? m.mastered / m.total : 0;
              const highlight = pct >= 0.9;
              return (
                <div
                  key={work}
                  className={cn(
                    'rounded-xl border bg-card p-2 text-center space-y-1.5 raised-card',
                    highlight && 'border-gold-border bg-gold-soft'
                  )}
                  title={WORK_NAMES[work].en}
                >
                  <p className={cn('text-[11px] font-bold', highlight ? 'text-gold' : 'text-muted-foreground')}>
                    {WORK_SHORT[work]}
                  </p>
                  <div className="h-1 rounded-full bg-secondary overflow-hidden">
                    <div
                      className={cn('h-full rounded-full', highlight ? 'bg-gold' : 'xp-fill')}
                      style={{ width: `${Math.round(pct * 100)}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-muted-foreground tabular-nums">
                    {m.mastered}/{m.total}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* Mode grid */}
        <motion.section variants={container} initial="hidden" animate="show" className="space-y-3">
          <motion.h2 variants={item} className="text-[11px] font-bold theme-label text-muted-foreground">
            {t('home.selectMode')}
          </motion.h2>

          <div className="grid grid-cols-2 gap-3">
            {(['reference_rush', 'fill_verse', 'ace_match', 'lightning_ladder'] as GameMode[]).map((mode) => (
              <motion.div key={mode} variants={item}>
                <ModeCard mode={mode} onClick={() => handleModeSelect(mode)} disabled={disabled} />
              </motion.div>
            ))}
          </div>

          {/* Team mode row */}
          <motion.div variants={item}>
            <button
              onClick={() => handleModeSelect('team_mode')}
              className={cn(
                'w-full rounded-2xl border bg-card p-4 flex items-center gap-3 text-left raised-card pressable transition-colors',
                'hover:border-primary/50'
              )}
            >
              <div className="p-2.5 rounded-xl bg-teal/15 text-teal shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <p className="font-heading font-bold flex-1">{t('modes.teamMode')}</p>
              <p className="text-xs text-muted-foreground shrink-0">{t('home.classroomBattle')} →</p>
            </button>
          </motion.div>

          {disabled && (
            <motion.p variants={item} className="text-xs text-muted-foreground text-center">
              {t('home.needVerses')}
            </motion.p>
          )}

          <motion.div variants={item} className="flex items-center justify-center">
            <Button variant="link" size="sm" onClick={() => navigate('/teacher')}>
              {selectedIds.length} {t('home.versesInSet')} · {t('home.changeSet')}
            </Button>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}
