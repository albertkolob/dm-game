import { useEffect, useCallback } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Pause, Play as PlayIcon, Home, Crown, Sparkles, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Timer } from '@/components/Timer';
import { ProgressSegments, ComboPill, ScoreFooter } from '@/components/ScoreBar';
import { GameCard } from '@/components/GameCard';
import { TeamScoreboard, TeamPodium } from '@/components/TeamScoreboard';
import { XpRing, RankPill, ConfettiBurst } from '@/components/Progression';
import { useLevelTitle } from '@/hooks/useProgressionLabels';
import { useGameStore } from '@/store/useGameStore';
import { useProgressStore } from '@/store/useProgressStore';
import { DM_MASTER, getItemsByIds } from '@/data';
import { generateQuestionSet } from '@/lib/generators';
import { GameMode } from '@/data/types';
import { SPEED_BONUS_XP_SOLO } from '@/lib/progression';

const BADGE_LABEL_KEY: Record<string, string> = {
  first_round: 'badges.firstRound',
  perfect_round: 'badges.perfectRound',
  combo10: 'badges.combo10',
  streak7: 'badges.streak7',
  streak30: 'badges.streak30',
  level5: 'badges.level5',
  level10: 'badges.level10',
  work90: 'badges.work90',
};

export function Play() {
  const { mode } = useParams<{ mode: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    language,
    selectedIds,
    settings,
    isPlaying,
    isPaused,
    currentQuestion,
    results,
    isTeamMode,
    teams,
    startGame,
    endGame,
    pauseGame,
    resumeGame,
    nextQuestion,
    answerQuestion,
    addResult,
    setTimeRemaining,
  } = useGameStore();

  const lastReport = useProgressStore((s) => s.lastReport);
  const focusId = searchParams.get('focus') ?? undefined;

  // Initialize game on mount
  useEffect(() => {
    if (!mode || selectedIds.length < 4) {
      navigate('/');
      return;
    }

    let pool = getItemsByIds(selectedIds);
    // Daily quest: make sure the featured verse is in the pool
    if (focusId && !pool.some((item) => item.id === focusId)) {
      const focusItem = DM_MASTER.find((item) => item.id === focusId);
      if (focusItem) pool = [...pool, focusItem];
    }

    const gameMode = mode as GameMode;
    const questionCount = Math.min(settings.questionsPerRound, pool.length);
    const questions = generateQuestionSet(language, pool, gameMode, questionCount, focusId);

    startGame(gameMode, questions);

    return () => {
      endGame();
    };
  }, [mode, selectedIds, settings.questionsPerRound, language, focusId, navigate, startGame, endGame]);

  const handleAnswer = useCallback(
    (correct: boolean, partial?: boolean) => {
      const timeSpent = settings.timePerQuestion - useGameStore.getState().timeRemaining;

      // Record the result before answerQuestion, which may end the game
      // (last life lost) and snapshot results for the round report
      if (currentQuestion) {
        addResult({
          questionId: currentQuestion.meta.id,
          reference: currentQuestion.meta.ref || '',
          correct,
          timeSpent,
          mode: mode as GameMode,
        });
      }

      answerQuestion({ correct, partial, timeSpent });
    },
    [answerQuestion, addResult, currentQuestion, mode, settings.timePerQuestion]
  );

  const handleNext = useCallback(() => {
    nextQuestion();
    setTimeRemaining(settings.timePerQuestion);
  }, [nextQuestion, setTimeRemaining, settings.timePerQuestion]);

  const handleQuit = () => {
    endGame();
    navigate('/');
  };

  const handlePlayAgain = () => {
    const pool = getItemsByIds(selectedIds);
    const gameMode = mode as GameMode;
    const questionCount = Math.min(settings.questionsPerRound, pool.length);
    const questions = generateQuestionSet(language, pool, gameMode, questionCount);
    startGame(gameMode, questions);
  };

  const levelTitle = useLevelTitle(lastReport?.levelAfter ?? 1);

  // Game complete screen
  if (!isPlaying && results.length > 0) {
    const correctCount = results.filter((r) => r.correct).length;
    const missedResults = results.filter((r) => !r.correct);
    const isTeamRound = isTeamMode && teams.length > 1;

    const rankUp = lastReport && lastReport.rankAfter !== lastReport.rankBefore;
    const levelUp = lastReport && lastReport.levelAfter > lastReport.levelBefore;
    const celebrate = rankUp || levelUp || missedResults.length === 0;

    return (
      <div className="min-h-screen bg-background safe-area-padding relative">
        {celebrate && <ConfettiBurst />}
        <div className="container max-w-lg mx-auto px-4 py-6 space-y-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-5"
          >
            {isTeamRound ? (
              <TeamPodium />
            ) : (
              <>
                {/* Celebration header */}
                <div className="space-y-1.5">
                  {(rankUp || levelUp) && (
                    <p className="text-[11px] font-bold theme-label text-muted-foreground">
                      {t('results.roundComplete')}
                    </p>
                  )}
                  <h1 className="font-heading text-[34px] leading-tight font-bold text-gold">
                    {rankUp ? t('results.rankUp') : levelUp ? t('results.levelUp') : t('results.complete')}
                  </h1>
                  {levelUp && lastReport && (
                    <p className="text-sm text-muted-foreground">
                      {t('results.reachedLevel', { level: lastReport.levelAfter, title: levelTitle })}
                    </p>
                  )}
                </div>

                {/* Rank transition */}
                {rankUp && lastReport && (
                  <div className="flex items-center justify-center gap-3">
                    <RankPill tier={lastReport.rankBefore} className="opacity-60" />
                    <span className="text-muted-foreground" aria-hidden="true">→</span>
                    <RankPill tier={lastReport.rankAfter} />
                  </div>
                )}

                {/* XP ring */}
                {lastReport && <XpRing xpGained={lastReport.xpGained} />}

                {/* Stats */}
                <Card className="raised-card text-left">
                  <CardContent className="p-4 divide-y divide-border">
                    <div className="flex items-center justify-between py-2.5">
                      <span className="text-sm text-muted-foreground">{t('results.accuracy')}</span>
                      <span className="font-bold tabular-nums">
                        {Math.round((correctCount / results.length) * 100)}%
                        <span className="text-muted-foreground font-normal text-xs ml-2">
                          {correctCount}/{results.length}
                        </span>
                      </span>
                    </div>
                    {settings.enableCombos && lastReport && (
                      <div className="flex items-center justify-between py-2.5">
                        <span className="text-sm text-muted-foreground">{t('results.bestCombo')}</span>
                        <span className="font-bold text-streak tabular-nums">×{lastReport.bestCombo}</span>
                      </div>
                    )}
                    {lastReport && lastReport.fastAnswers > 0 && (
                      <div className="flex items-center justify-between py-2.5">
                        <span className="text-sm text-muted-foreground">{t('results.speedBonus')}</span>
                        <span className="font-bold text-primary tabular-nums">
                          +{lastReport.fastAnswers * SPEED_BONUS_XP_SOLO} XP
                        </span>
                      </div>
                    )}
                    {lastReport?.questCompleted && (
                      <div className="flex items-center justify-between py-2.5">
                        <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-accent2" />
                          {t('quest.daily')}
                        </span>
                        <span className="font-bold text-accent2 tabular-nums">+50 XP</span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* New badges */}
                {lastReport && lastReport.newBadges.length > 0 && (
                  <div className="space-y-2">
                    <h2 className="text-[11px] font-bold theme-label text-muted-foreground">
                      {t('results.newBadges')}
                    </h2>
                    <div className="flex flex-wrap justify-center gap-2">
                      {lastReport.newBadges.map((badge) => (
                        <span
                          key={badge}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold-soft border border-gold-border text-gold text-xs font-bold theme-label"
                        >
                          <Award className="w-3.5 h-3.5" />
                          {t(BADGE_LABEL_KEY[badge] ?? badge)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Verse crowns earned */}
                {lastReport && lastReport.crownedVerses.length > 0 && (
                  <div className="space-y-2">
                    <h2 className="text-[11px] font-bold theme-label text-muted-foreground">
                      {t('results.crownsEarned')}
                    </h2>
                    <div className="flex flex-wrap justify-center gap-2">
                      {lastReport.crownedVerses.map((crowned) => {
                        const verse = DM_MASTER.find((item) => item.id === crowned.id);
                        return (
                          <span
                            key={crowned.id}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold-soft border border-gold-border text-gold text-xs font-bold"
                          >
                            <Crown className="w-3.5 h-3.5" />
                            {verse?.reference ?? crowned.id}
                            <span className="opacity-70">·</span>
                            {crowned.level}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Missed verses review */}
                {missedResults.length > 0 ? (
                  <div className="space-y-2 text-left">
                    <h2 className="text-[11px] font-bold theme-label text-muted-foreground">
                      {t('results.missedVerses')}
                    </h2>
                    {missedResults.map((result) => {
                      const item = DM_MASTER.find((i) => i.id === result.questionId);
                      return (
                        <Card key={result.questionId} className="raised-card">
                          <CardContent className="p-3.5">
                            <p className="font-semibold text-sm">{result.reference}</p>
                            {item && (
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {item.keyPhrase[language]}
                              </p>
                            )}
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-success font-semibold">{t('results.noMisses')}</p>
                )}
              </>
            )}

            <div className="flex gap-3 pt-1">
              <Button variant="outline" onClick={handleQuit} className="flex-1 pressable theme-label">
                <Home className="w-4 h-4 mr-2" />
                {t('results.backHome')}
              </Button>
              <Button onClick={handlePlayAgain} className="flex-1 raised-primary pressable theme-label">
                {t('results.playAgain')}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Loading state
  if (!isPlaying || !currentQuestion) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">{t('common.loading')}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background safe-area-padding">
      <div className="container max-w-lg mx-auto px-4 py-4 space-y-4">
        {/* Header: quit + progress segments + pause */}
        <header className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={handleQuit} aria-label={t('game.quit')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>

          <ProgressSegments />

          <Button
            variant="ghost"
            size="icon"
            onClick={isPaused ? resumeGame : pauseGame}
            aria-label={isPaused ? t('game.resume') : t('game.pause')}
          >
            {isPaused ? <PlayIcon className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
          </Button>
        </header>

        {/* Timer + combo */}
        <div className="flex items-center gap-3">
          <Timer />
          <ComboPill />
        </div>

        {/* Team Scoreboard (if team mode) */}
        {isTeamMode && teams.length > 1 && <TeamScoreboard />}

        {/* Pause overlay */}
        <AnimatePresence>
          {isPaused && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
            >
              <Card className="w-full max-w-sm mx-4 raised-card">
                <CardContent className="p-6 text-center space-y-4">
                  <h2 className="text-xl font-bold">{t('game.pause')}</h2>
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={handleQuit} className="flex-1 pressable">
                      {t('game.quit')}
                    </Button>
                    <Button onClick={resumeGame} className="flex-1 raised-primary pressable">
                      {t('game.resume')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Game Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentQuestion.meta.id}-${useGameStore.getState().questionIndex}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.2 }}
          >
            <GameCard question={currentQuestion} onAnswer={handleAnswer} onNext={handleNext} />
          </motion.div>
        </AnimatePresence>

        {/* Team-mode hype line */}
        {isTeamMode && teams.length > 1 && settings.enableCombos && (
          <p className="text-center text-xs font-bold text-streak theme-label">
            {t('team.speedHype')}
          </p>
        )}

        {/* Score footer */}
        <ScoreFooter />
      </div>
    </div>
  );
}
