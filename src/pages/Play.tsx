import { useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Pause, Play as PlayIcon, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Timer } from '@/components/Timer';
import { ScoreBar } from '@/components/ScoreBar';
import { GameCard } from '@/components/GameCard';
import { TeamScoreboard, TeamWinner } from '@/components/TeamScoreboard';
import { useGameStore } from '@/store/useGameStore';
import { DM_MASTER, getItemsByIds } from '@/data';
import { generateQuestionSet } from '@/lib/generators';
import { GameMode } from '@/data/types';

export function Play() {
  const { mode } = useParams<{ mode: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const hasRecordedResults = useRef(false);

  const {
    language,
    selectedIds,
    settings,
    isPlaying,
    isPaused,
    currentQuestion,
    score,
    bestStreak,
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
    incrementVersesStudied,
    setTimeRemaining,
  } = useGameStore();

  // Initialize game on mount
  useEffect(() => {
    if (!mode || selectedIds.length < 4) {
      navigate('/');
      return;
    }

    const pool = getItemsByIds(selectedIds);
    const gameMode = mode as GameMode;
    const questionCount = Math.min(settings.questionsPerRound, pool.length);
    const questions = generateQuestionSet(language, pool, gameMode, questionCount);

    startGame(gameMode, questions);

    return () => {
      endGame();
    };
  }, [mode, selectedIds, settings.questionsPerRound, language, navigate, startGame, endGame]);

  const handleAnswer = useCallback(
    (correct: boolean, points: number) => {
      answerQuestion(correct, points);

      if (currentQuestion) {
        addResult({
          questionId: currentQuestion.meta.id,
          reference: currentQuestion.meta.ref || '',
          correct,
          timeSpent: settings.timePerQuestion - useGameStore.getState().timeRemaining,
          mode: mode as GameMode,
        });
      }
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

  // Record verses studied when game completes (only once per game session)
  useEffect(() => {
    if (!isPlaying && results.length > 0 && !hasRecordedResults.current) {
      hasRecordedResults.current = true;
      incrementVersesStudied(results.length);
    }
  }, [isPlaying, results.length, incrementVersesStudied]);

  // Reset the recorded flag when starting a new game
  useEffect(() => {
    if (isPlaying) {
      hasRecordedResults.current = false;
    }
  }, [isPlaying]);

  // Game complete screen
  if (!isPlaying && results.length > 0) {
    const correctCount = results.filter((r) => r.correct).length;
    const accuracy = Math.round((correctCount / results.length) * 100);
    const missedResults = results.filter((r) => !r.correct);

    return (
      <div className="min-h-screen bg-background safe-area-padding">
        <div className="container max-w-lg mx-auto px-4 py-6 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-4"
          >
            <h1 className="font-heading text-3xl font-bold">{t('results.complete')}</h1>

            {isTeamMode && teams.length > 1 ? (
              <TeamWinner />
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-3xl font-bold text-primary">{score}</p>
                      <p className="text-sm text-muted-foreground">{t('results.finalScore')}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-3xl font-bold">{accuracy}%</p>
                      <p className="text-sm text-muted-foreground">{t('results.accuracy')}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-3xl font-bold text-orange-500">{bestStreak}</p>
                      <p className="text-sm text-muted-foreground">{t('results.bestStreak')}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-3xl font-bold">{correctCount}/{results.length}</p>
                      <p className="text-sm text-muted-foreground">{t('game.correct')}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Missed verses review */}
                {missedResults.length > 0 && (
                  <div className="mt-6 space-y-3">
                    <h2 className="font-semibold text-lg text-left">{t('results.missedVerses')}</h2>
                    {missedResults.map((result) => {
                      const item = DM_MASTER.find((i) => i.id === result.questionId);
                      return (
                        <Card key={result.questionId}>
                          <CardContent className="p-4">
                            <p className="font-medium">{result.reference}</p>
                            {item && (
                              <p className="text-sm text-muted-foreground mt-1">
                                {item.keyPhrase[language]}
                              </p>
                            )}
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}

                {missedResults.length === 0 && (
                  <p className="text-success font-medium mt-4">{t('results.noMisses')}</p>
                )}
              </>
            )}

            <div className="flex gap-3 mt-6">
              <Button variant="outline" onClick={handleQuit} className="flex-1">
                <Home className="w-4 h-4 mr-2" />
                {t('results.backHome')}
              </Button>
              <Button
                onClick={() => {
                  const pool = getItemsByIds(selectedIds);
                  const gameMode = mode as GameMode;
                  const questions = generateQuestionSet(
                    language,
                    pool,
                    gameMode,
                    settings.questionsPerRound
                  );
                  startGame(gameMode, questions);
                }}
                className="flex-1"
              >
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
        {/* Header */}
        <header className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={handleQuit}>
            <ArrowLeft className="w-5 h-5" />
          </Button>

          <Timer />

          <Button
            variant="ghost"
            size="icon"
            onClick={isPaused ? resumeGame : pauseGame}
          >
            {isPaused ? <PlayIcon className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
          </Button>
        </header>

        {/* Score Bar */}
        <ScoreBar />

        {/* Team Scoreboard (if team mode) */}
        {isTeamMode && teams.length > 1 && (
          <TeamScoreboard />
        )}

        {/* Pause overlay */}
        <AnimatePresence>
          {isPaused && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
            >
              <Card className="w-full max-w-sm mx-4">
                <CardContent className="p-6 text-center space-y-4">
                  <h2 className="text-xl font-bold">{t('game.pause')}</h2>
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={handleQuit} className="flex-1">
                      {t('game.quit')}
                    </Button>
                    <Button onClick={resumeGame} className="flex-1">
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
            key={currentQuestion.meta.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.2 }}
          >
            <GameCard
              question={currentQuestion}
              onAnswer={handleAnswer}
              onNext={handleNext}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
