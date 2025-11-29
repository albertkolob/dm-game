import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useGameStore } from '@/store/useGameStore';
import { changeLanguage } from '@/i18n';
import { Language } from '@/data/types';

const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
];

export function LanguagePicker() {
  const { i18n } = useTranslation();
  const { setLanguage } = useGameStore();

  const handleLanguageChange = (code: Language) => {
    changeLanguage(code);
    setLanguage(code);
  };

  return (
    <div className="flex gap-2" role="group" aria-label="Language selection">
      {languages.map((lang) => (
        <motion.button
          key={lang.code}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleLanguageChange(lang.code)}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all tap-target',
            i18n.language === lang.code
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          )}
          aria-pressed={i18n.language === lang.code}
          aria-label={`Switch to ${lang.label}`}
        >
          <span aria-hidden="true">{lang.flag}</span>
          <span className="hidden sm:inline">{lang.label}</span>
          <span className="sm:hidden">{lang.code.toUpperCase()}</span>
        </motion.button>
      ))}
    </div>
  );
}
