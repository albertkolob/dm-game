import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { BookOpen, Flame, Trophy, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LanguagePicker } from '@/components/LanguagePicker';
import { ModeCard } from '@/components/ModeCard';
import { useGameStore } from '@/store/useGameStore';
import { GameMode } from '@/data/types';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { dayStreak, totalVersesStudied, selectedIds, updateDayStreak } = useGameStore();

  const handleModeSelect = (mode: GameMode) => {
    updateDayStreak();
    if (mode === 'team_mode') {
      navigate('/teacher');
    } else {
      navigate(`/play/${mode}`);
    }
  };

  const handleQuickStart = () => {
    updateDayStreak();
    navigate('/play/reference_rush');
  };

  return (
    <div className="min-h-screen bg-background safe-area-padding">
      <div className="container max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-xl">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-heading font-bold text-xl">{t('app.title')}</h1>
              <p className="text-sm text-muted-foreground">{t('app.subtitle')}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/teacher')}
            aria-label={t('nav.settings')}
          >
            <Settings className="w-5 h-5" />
          </Button>
        </motion.header>

        {/* Language Picker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <LanguagePicker />
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 gap-3"
        >
          <motion.div variants={item}>
            <Card>
              <CardContent className="flex items-center gap-3 p-4">
                <div className="p-2 bg-orange-500/20 rounded-xl">
                  <Flame className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{dayStreak}</p>
                  <p className="text-xs text-muted-foreground">{t('home.dayStreak')}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card>
              <CardContent className="flex items-center gap-3 p-4">
                <div className="p-2 bg-primary/20 rounded-xl">
                  <Trophy className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalVersesStudied}</p>
                  <p className="text-xs text-muted-foreground">{t('home.versesStudied')}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Quick Start */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            onClick={handleQuickStart}
            size="xl"
            className="w-full"
          >
            {t('home.studyNow')}
          </Button>
        </motion.div>

        {/* Selected Set Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="flex items-center justify-between"
        >
          <Badge variant="secondary" className="text-sm">
            {selectedIds.length} {t('home.versesStudied').split(' ')[0]}
          </Badge>
          <Button variant="link" size="sm" onClick={() => navigate('/teacher')}>
            {t('home.selectSet')}
          </Button>
        </motion.div>

        {/* Game Modes */}
        <motion.section
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          <motion.h2
            variants={item}
            className="font-heading font-semibold text-lg"
          >
            {t('home.selectMode')}
          </motion.h2>

          <motion.div variants={item}>
            <ModeCard
              mode="reference_rush"
              onClick={() => handleModeSelect('reference_rush')}
              disabled={selectedIds.length < 4}
            />
          </motion.div>

          <motion.div variants={item}>
            <ModeCard
              mode="fill_verse"
              onClick={() => handleModeSelect('fill_verse')}
              disabled={selectedIds.length < 4}
            />
          </motion.div>

          <motion.div variants={item}>
            <ModeCard
              mode="ace_match"
              onClick={() => handleModeSelect('ace_match')}
              disabled={selectedIds.length < 4}
            />
          </motion.div>

          <motion.div variants={item}>
            <ModeCard
              mode="lightning_ladder"
              onClick={() => handleModeSelect('lightning_ladder')}
              disabled={selectedIds.length < 4}
            />
          </motion.div>

          <motion.div variants={item}>
            <ModeCard
              mode="team_mode"
              onClick={() => handleModeSelect('team_mode')}
              disabled={selectedIds.length < 4}
            />
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}
