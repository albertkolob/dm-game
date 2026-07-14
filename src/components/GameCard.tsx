import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Question, ACE, GameMode } from '@/data/types';
import { useGameStore } from '@/store/useGameStore';
import { vibrate, playSound } from '@/lib/utils';
import { ACE_NAMES } from '@/data/types';

interface GameCardProps {
  question: Question;
  onAnswer: (correct: boolean, partial?: boolean) => void;
  onNext: () => void;
}

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

const MODE_LABEL_KEY: Record<GameMode, string> = {
  reference_rush: 'modes.referenceRush',
  fill_verse: 'modes.fillVerse',
  ace_match: 'modes.aceMatch',
  lightning_ladder: 'modes.lightningLadder',
  team_mode: 'modes.teamMode',
};

const ACE_DESC_KEY: Record<ACE, string> = {
  act_in_faith: 'ace.actInFaithDesc',
  eternal_perspective: 'ace.eternalPerspectiveDesc',
  divinely_appointed_sources: 'ace.divinelyAppointedSourcesDesc',
};

function PointsFloater({ show, points }: { show: boolean; points: number }) {
  if (!show || points <= 0) return null;
  return (
    <span
      className="absolute -top-3 right-4 text-lg font-bold text-gold tabular-nums animate-float-up pointer-events-none"
      aria-hidden="true"
    >
      +{points}
    </span>
  );
}

export function GameCard({ question, onAnswer, onNext }: GameCardProps) {
  const { t } = useTranslation();
  const { settings, currentMode, language, timeRemaining, isPlaying, lastPointsEarned } = useGameStore();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedACE, setSelectedACE] = useState<ACE | null>(null);
  const [selectedVerse, setSelectedVerse] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isTimedOut, setIsTimedOut] = useState(false);

  // Reset state when question changes
  useEffect(() => {
    setSelectedIndex(null);
    setSelectedACE(null);
    setSelectedVerse(null);
    setIsRevealed(false);
    setIsCorrect(false);
    setIsTimedOut(false);
  }, [question]);

  // Time up: reveal the answer as incorrect, exactly once per question
  useEffect(() => {
    if (timeRemaining > 0 || isRevealed || !isPlaying) return;

    setIsTimedOut(true);
    setIsCorrect(false);
    setIsRevealed(true);
    onAnswer(false);

    if (settings.enableHaptics) {
      vibrate([50, 50, 50]);
    }
    if (settings.enableSound) {
      playSound('incorrect');
    }
  }, [timeRemaining, isRevealed, isPlaying, onAnswer, settings.enableHaptics, settings.enableSound]);

  const handleOptionSelect = (index: number) => {
    if (isRevealed) return;

    setSelectedIndex(index);
    const correct = index === question.correctIndex;
    setIsCorrect(correct);
    setIsRevealed(true);

    onAnswer(correct);

    if (settings.enableHaptics) {
      vibrate(correct ? [10] : [50, 50, 50]);
    }

    if (settings.enableSound) {
      playSound(correct ? 'correct' : 'incorrect');
    }
  };

  const handleACESelect = (ace: ACE) => {
    if (isRevealed) return;
    setSelectedACE(ace);
  };

  const handleVerseSelect = (verse: string) => {
    if (isRevealed) return;
    setSelectedVerse(verse);
  };

  const handleACESubmit = () => {
    if (!selectedACE || !selectedVerse || isRevealed) return;

    // Any linked principle / any verse sharing it counts as correct
    const aceCorrect = question.correctACEs?.includes(selectedACE) ?? false;
    const verseCorrect = question.correctVerses?.includes(selectedVerse) ?? false;
    const fullCorrect = aceCorrect && verseCorrect;
    const partial = aceCorrect || verseCorrect;

    setIsCorrect(fullCorrect);
    setIsRevealed(true);

    onAnswer(fullCorrect, partial && !fullCorrect);

    if (settings.enableHaptics) {
      vibrate(fullCorrect ? [10] : partial ? [20, 20] : [50, 50, 50]);
    }

    if (settings.enableSound) {
      playSound(fullCorrect ? 'correct' : 'incorrect');
    }
  };

  const modeEyebrow = currentMode ? t(MODE_LABEL_KEY[currentMode]) : '';

  const feedbackBanner = (
    <div
      className={cn(
        'text-center py-3 rounded-xl font-bold text-lg',
        isCorrect ? 'bg-success/20 text-success' : 'bg-destructive/15 text-destructive'
      )}
      role="alert"
      aria-live="assertive"
    >
      {isCorrect ? t('game.correct') : isTimedOut ? t('game.timeUp') : t('game.incorrect')}
    </div>
  );

  // Render regular question (ref/cloze)
  if (question.type === 'ref' || question.type === 'cloze') {
    return (
      <Card className="w-full max-w-lg mx-auto relative raised-card">
        <PointsFloater show={isRevealed && isCorrect} points={lastPointsEarned} />
        <CardContent className="p-5 space-y-5">
          {/* Prompt */}
          <div className="space-y-2">
            <p className="text-[10px] font-bold theme-label text-accent2">{modeEyebrow}</p>
            <p className="text-[19px] leading-[1.45] font-semibold">
              {question.type === 'ref' ? <>&ldquo;{question.prompt}&rdquo;</> : question.prompt}
            </p>
          </div>

          {/* Options */}
          <div className="grid gap-2.5">
            {question.options?.map((option, index) => {
              const revealedCorrect = isRevealed && index === question.correctIndex;
              const revealedWrong = isRevealed && selectedIndex === index && index !== question.correctIndex;
              return (
                <motion.button
                  key={index}
                  data-testid="answer-option"
                  whileTap={{ scale: isRevealed ? 1 : 0.98 }}
                  onClick={() => handleOptionSelect(index)}
                  disabled={isRevealed}
                  className={cn(
                    'w-full min-h-[48px] px-3.5 py-3 rounded-2xl text-left font-semibold text-[15px] transition-all border-2 flex items-center gap-3',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    !isRevealed && 'bg-secondary hover:bg-secondary/80 border-transparent pressable',
                    revealedCorrect && 'bg-success/15 border-success text-success animate-pulse-success',
                    revealedWrong && 'bg-destructive/10 border-destructive text-destructive animate-shake',
                    isRevealed && !revealedCorrect && !revealedWrong && 'opacity-50 border-transparent bg-secondary'
                  )}
                  aria-label={`${t('accessibility.selectOption')}: ${option}`}
                >
                  <span
                    className={cn(
                      'w-7 h-7 rounded-lg text-sm font-bold flex items-center justify-center shrink-0 border',
                      revealedCorrect
                        ? 'bg-success/20 border-success/60 text-success'
                        : revealedWrong
                          ? 'bg-destructive/20 border-destructive/60 text-destructive'
                          : 'bg-primary/10 border-primary/50 text-primary'
                    )}
                    aria-hidden="true"
                  >
                    {LETTERS[index]}
                  </span>
                  <span className="flex-1">{option}</span>
                  {revealedCorrect && <Check className="w-5 h-5 text-success shrink-0" />}
                  {revealedWrong && <X className="w-5 h-5 text-destructive shrink-0" />}
                </motion.button>
              );
            })}
          </div>

          {/* Feedback & Next */}
          <AnimatePresence>
            {isRevealed && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                {feedbackBanner}

                {!isCorrect && (
                  <p className="text-center text-muted-foreground">{question.meta.ref}</p>
                )}

                <Button onClick={onNext} className="w-full raised-primary pressable theme-label" size="lg">
                  {t('game.next')}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    );
  }

  // Render ACE question
  return (
    <Card className="w-full max-w-lg mx-auto relative raised-card">
      <PointsFloater show={isRevealed && lastPointsEarned > 0} points={lastPointsEarned} />
      <CardContent className="p-5 space-y-5">
        {/* Prompt */}
        <div className="space-y-2">
          <p className="text-[10px] font-bold theme-label text-accent2">{modeEyebrow}</p>
          <p className="text-[17px] leading-[1.45] font-semibold">{question.prompt}</p>
        </div>

        {/* ACE Selection */}
        <div className="space-y-2">
          <p className="text-[11px] font-bold theme-label text-muted-foreground">{t('game.chooseACE')}</p>
          <div className="grid gap-2">
            {question.optionsACE?.map((ace) => {
              const isLinked = question.correctACEs?.includes(ace) ?? false;
              return (
                <motion.button
                  key={ace}
                  data-testid="ace-option"
                  whileTap={{ scale: isRevealed ? 1 : 0.98 }}
                  onClick={() => handleACESelect(ace as ACE)}
                  disabled={isRevealed}
                  className={cn(
                    'w-full p-3 rounded-xl text-left transition-all tap-target border-2',
                    !isRevealed && selectedACE === ace && 'bg-primary/15 border-primary',
                    !isRevealed && selectedACE !== ace && 'bg-secondary border-transparent',
                    isRevealed && isLinked && 'bg-success/15 border-success',
                    isRevealed && selectedACE === ace && !isLinked && 'bg-destructive/10 border-destructive'
                  )}
                >
                  <span className="font-semibold block">{ACE_NAMES[ace as ACE][language]}</span>
                  <span className="text-xs text-muted-foreground block mt-0.5">
                    {t(ACE_DESC_KEY[ace as ACE])}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Verse Selection */}
        <div className="space-y-2">
          <p className="text-[11px] font-bold theme-label text-muted-foreground">
            {question.acePrimary
              ? t('game.chooseVerseFor', { principle: ACE_NAMES[question.acePrimary as ACE][language] })
              : t('game.chooseVerse')}
          </p>
          <div className="grid gap-2">
            {question.optionsVerse?.map((verse, index) => {
              const isSupporting = question.correctVerses?.includes(verse) ?? false;
              return (
                <motion.button
                  key={verse}
                  data-testid="verse-option"
                  whileTap={{ scale: isRevealed ? 1 : 0.98 }}
                  onClick={() => handleVerseSelect(verse)}
                  disabled={isRevealed}
                  className={cn(
                    'w-full p-3 rounded-xl text-left font-semibold transition-all tap-target border-2 flex items-center gap-3',
                    !isRevealed && selectedVerse === verse && 'bg-primary/15 border-primary',
                    !isRevealed && selectedVerse !== verse && 'bg-secondary border-transparent',
                    isRevealed && isSupporting && 'bg-success/15 border-success',
                    isRevealed && selectedVerse === verse && !isSupporting && 'bg-destructive/10 border-destructive'
                  )}
                >
                  <span
                    className="w-7 h-7 rounded-lg text-sm font-bold flex items-center justify-center shrink-0 border bg-primary/10 border-primary/50 text-primary"
                    aria-hidden="true"
                  >
                    {LETTERS[index]}
                  </span>
                  {verse}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Submit Button (for ACE) */}
        {!isRevealed && (
          <Button
            onClick={handleACESubmit}
            disabled={!selectedACE || !selectedVerse}
            className="w-full raised-primary pressable theme-label"
            size="lg"
          >
            {t('common.confirm')}
          </Button>
        )}

        {/* Feedback & Next */}
        <AnimatePresence>
          {isRevealed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {feedbackBanner}

              <Button onClick={onNext} className="w-full raised-primary pressable theme-label" size="lg">
                {t('game.next')}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
