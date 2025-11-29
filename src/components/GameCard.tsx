import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Question, ACE } from '@/data/types';
import { useGameStore } from '@/store/useGameStore';
import { calculatePoints } from '@/lib/generators';
import { vibrate, playSound } from '@/lib/utils';
import { ACE_NAMES } from '@/data/types';

interface GameCardProps {
  question: Question;
  onAnswer: (correct: boolean, points: number) => void;
  onNext: () => void;
}

export function GameCard({ question, onAnswer, onNext }: GameCardProps) {
  const { t } = useTranslation();
  const { settings, currentMode, language } = useGameStore();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedACE, setSelectedACE] = useState<ACE | null>(null);
  const [selectedVerse, setSelectedVerse] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Reset state when question changes
  useEffect(() => {
    setSelectedIndex(null);
    setSelectedACE(null);
    setSelectedVerse(null);
    setIsRevealed(false);
    setIsCorrect(false);
  }, [question]);

  const handleOptionSelect = (index: number) => {
    if (isRevealed) return;

    setSelectedIndex(index);
    const correct = index === question.correctIndex;
    setIsCorrect(correct);
    setIsRevealed(true);

    const points = calculatePoints(currentMode!, correct);
    onAnswer(correct, points);

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

    const aceCorrect = selectedACE === question.correctACE;
    const verseCorrect = selectedVerse === question.correctVerse;
    const fullCorrect = aceCorrect && verseCorrect;
    const partial = aceCorrect || verseCorrect;

    setIsCorrect(fullCorrect);
    setIsRevealed(true);

    const points = calculatePoints(currentMode!, fullCorrect, partial && !fullCorrect);
    onAnswer(fullCorrect, points);

    if (settings.enableHaptics) {
      vibrate(fullCorrect ? [10] : partial ? [20, 20] : [50, 50, 50]);
    }

    if (settings.enableSound) {
      playSound(fullCorrect ? 'correct' : 'incorrect');
    }
  };

  // Render regular question (ref/cloze)
  if (question.type === 'ref' || question.type === 'cloze') {
    return (
      <Card className="w-full max-w-lg mx-auto">
        <CardContent className="p-6 space-y-6">
          {/* Prompt */}
          <div className="text-center">
            <p className="text-lg leading-relaxed font-medium">
              {question.prompt}
            </p>
          </div>

          {/* Options */}
          <div className="grid gap-3">
            {question.options?.map((option, index) => (
              <motion.button
                key={index}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleOptionSelect(index)}
                disabled={isRevealed}
                className={cn(
                  'w-full p-4 rounded-2xl text-left font-medium transition-all tap-target border-2',
                  'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                  !isRevealed && 'bg-secondary hover:bg-secondary/80 border-transparent',
                  isRevealed && index === question.correctIndex && 'bg-success/20 border-success text-success',
                  isRevealed && selectedIndex === index && index !== question.correctIndex && 'bg-destructive/20 border-destructive text-destructive',
                  isRevealed && selectedIndex !== index && index !== question.correctIndex && 'opacity-50'
                )}
                aria-label={`${t('accessibility.selectOption')}: ${option}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="flex-1">{option}</span>
                  {isRevealed && index === question.correctIndex && (
                    <Check className="w-5 h-5 text-success flex-shrink-0" />
                  )}
                  {isRevealed && selectedIndex === index && index !== question.correctIndex && (
                    <X className="w-5 h-5 text-destructive flex-shrink-0" />
                  )}
                </div>
              </motion.button>
            ))}
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
                <div
                  className={cn(
                    'text-center py-3 rounded-xl font-bold text-lg',
                    isCorrect ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'
                  )}
                  role="alert"
                  aria-live="assertive"
                >
                  {isCorrect ? t('game.correct') : t('game.incorrect')}
                </div>

                {!isCorrect && (
                  <p className="text-center text-muted-foreground">
                    {question.meta.ref}
                  </p>
                )}

                <Button onClick={onNext} className="w-full" size="lg">
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
    <Card className="w-full max-w-lg mx-auto">
      <CardContent className="p-6 space-y-6">
        {/* Prompt */}
        <div className="text-center">
          <p className="text-lg leading-relaxed font-medium">
            {question.prompt}
          </p>
        </div>

        {/* ACE Selection */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">
            {t('game.chooseACE')}
          </p>
          <div className="grid gap-2">
            {question.optionsACE?.map((ace) => (
              <motion.button
                key={ace}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleACESelect(ace as ACE)}
                disabled={isRevealed}
                className={cn(
                  'w-full p-3 rounded-xl text-left font-medium transition-all tap-target border-2',
                  !isRevealed && selectedACE === ace && 'bg-primary/20 border-primary',
                  !isRevealed && selectedACE !== ace && 'bg-secondary border-transparent',
                  isRevealed && ace === question.correctACE && 'bg-success/20 border-success',
                  isRevealed && selectedACE === ace && ace !== question.correctACE && 'bg-destructive/20 border-destructive'
                )}
              >
                {ACE_NAMES[ace as ACE][language]}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Verse Selection */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">
            {t('game.chooseVerse')}
          </p>
          <div className="grid gap-2">
            {question.optionsVerse?.map((verse) => (
              <motion.button
                key={verse}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleVerseSelect(verse)}
                disabled={isRevealed}
                className={cn(
                  'w-full p-3 rounded-xl text-left font-medium transition-all tap-target border-2',
                  !isRevealed && selectedVerse === verse && 'bg-primary/20 border-primary',
                  !isRevealed && selectedVerse !== verse && 'bg-secondary border-transparent',
                  isRevealed && verse === question.correctVerse && 'bg-success/20 border-success',
                  isRevealed && selectedVerse === verse && verse !== question.correctVerse && 'bg-destructive/20 border-destructive'
                )}
              >
                {verse}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Submit Button (for ACE) */}
        {!isRevealed && (
          <Button
            onClick={handleACESubmit}
            disabled={!selectedACE || !selectedVerse}
            className="w-full"
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
              <div
                className={cn(
                  'text-center py-3 rounded-xl font-bold text-lg',
                  isCorrect ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'
                )}
                role="alert"
                aria-live="assertive"
              >
                {isCorrect ? t('game.correct') : t('game.incorrect')}
              </div>

              <Button onClick={onNext} className="w-full" size="lg">
                {t('game.next')}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
