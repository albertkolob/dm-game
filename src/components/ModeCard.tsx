import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { LucideIcon, Zap, PenLine, Shapes, Flame, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from './ui/card';
import { GameMode } from '@/data/types';

interface ModeCardProps {
  mode: GameMode;
  onClick: () => void;
  disabled?: boolean;
}

const modeConfig: Record<GameMode, { icon: LucideIcon; color: string }> = {
  reference_rush: { icon: Zap, color: 'text-warning' },
  fill_verse: { icon: PenLine, color: 'text-primary' },
  ace_match: { icon: Shapes, color: 'text-purple-500' },
  lightning_ladder: { icon: Flame, color: 'text-orange-500' },
  team_mode: { icon: Users, color: 'text-teal' },
};

const modeTranslationKeys: Record<GameMode, { title: string; desc: string }> = {
  reference_rush: { title: 'modes.referenceRush', desc: 'modes.referenceRushDesc' },
  fill_verse: { title: 'modes.fillVerse', desc: 'modes.fillVerseDesc' },
  ace_match: { title: 'modes.aceMatch', desc: 'modes.aceMatchDesc' },
  lightning_ladder: { title: 'modes.lightningLadder', desc: 'modes.lightningLadderDesc' },
  team_mode: { title: 'modes.teamMode', desc: 'modes.teamModeDesc' },
};

export function ModeCard({ mode, onClick, disabled }: ModeCardProps) {
  const { t } = useTranslation();
  const config = modeConfig[mode];
  const translations = modeTranslationKeys[mode];
  const Icon = config.icon;

  return (
    <motion.div
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      <Card
        className={cn(
          'cursor-pointer transition-all hover:shadow-xl',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
        onClick={disabled ? undefined : onClick}
      >
        <CardContent className="flex items-center gap-4 p-5">
          <div className={cn('p-3 rounded-xl bg-secondary', config.color)}>
            <Icon className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{t(translations.title)}</h3>
            <p className="text-sm text-muted-foreground">{t(translations.desc)}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
