import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowLeft, Award, Camera, Check, Lock, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LanguagePicker } from '@/components/LanguagePicker';
import { AvatarRing, RankPill, XpBar } from '@/components/Progression';
import { useRankLabel } from '@/hooks/useProgressionLabels';
import { useProgressStore } from '@/store/useProgressStore';
import { useGameStore } from '@/store/useGameStore';
import { useThemeStore } from '@/store/useThemeStore';
import { THEMES, ThemeId } from '@/theme/themes';
import { rankFromPoints, rankPoints, BADGE_IDS, BadgeId } from '@/lib/progression';
import { cn } from '@/lib/utils';

const BADGE_LABEL_KEY: Record<BadgeId, string> = {
  first_round: 'badges.firstRound',
  perfect_round: 'badges.perfectRound',
  combo10: 'badges.combo10',
  streak7: 'badges.streak7',
  streak30: 'badges.streak30',
  level5: 'badges.level5',
  level10: 'badges.level10',
  work90: 'badges.work90',
};

// Mini-preview swatches per theme (fixed: a preview must show ITS theme's
// look regardless of the currently active one)
const PREVIEW: Record<ThemeId, { bg: string; card: string; accent: string; accent2: string; text: string }> = {
  neon: { bg: '#07090f', card: '#10141f', accent: '#22d3ee', accent2: '#a78bfa', text: '#eef2f8' },
  quest: { bg: '#fbf6ec', card: '#ffffff', accent: '#2ab3a6', accent2: '#f0705a', text: '#3b3230' },
  classic: { bg: '#0B132B', card: '#1C2541', accent: '#5BC0BE', accent2: '#FDC500', text: '#f8fafc' },
};

function ThemePreviewStrip({ id }: { id: ThemeId }) {
  const p = PREVIEW[id];
  return (
    <div
      className="rounded-xl p-3 flex items-center gap-2.5 border"
      style={{ backgroundColor: p.bg, borderColor: p.card }}
      aria-hidden="true"
    >
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
        style={{ backgroundColor: p.card, border: `2px solid ${p.accent}`, color: p.accent }}
      >
        L7
      </div>
      <div className="flex-1 space-y-1.5 min-w-0">
        <div className="h-1.5 rounded-full" style={{ backgroundColor: p.card }}>
          <div className="h-full w-2/3 rounded-full" style={{ background: `linear-gradient(90deg, ${p.accent}, ${p.accent2})` }} />
        </div>
        <div className="flex gap-1.5">
          <span className="h-3.5 w-10 rounded-md" style={{ backgroundColor: p.accent }} />
          <span className="h-3.5 w-10 rounded-md border" style={{ borderColor: p.accent2, backgroundColor: 'transparent' }} />
        </div>
      </div>
      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0" style={{ backgroundColor: p.card, color: p.text }}>
        Lv 7
      </span>
    </div>
  );
}

function AppearancePicker() {
  const { t } = useTranslation();
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="space-y-3">
      {THEMES.map((meta) => {
        const equipped = theme === meta.id;
        return (
          <Card key={meta.id} className={cn('raised-card transition-colors', equipped && 'border-primary')}>
            <CardContent className="p-3.5 space-y-3">
              <ThemePreviewStrip id={meta.id} />
              <div className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-heading font-bold">{t(meta.nameKey)}</p>
                  <p className="text-xs text-muted-foreground">{t(meta.descKey)}</p>
                </div>
                {equipped ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-bold theme-label shrink-0">
                    <Check className="w-3.5 h-3.5" />
                    {t('themes.equipped')}
                  </span>
                ) : (
                  <Button size="sm" variant="outline" className="pressable theme-label shrink-0" onClick={() => setTheme(meta.id)}>
                    {t('themes.equip')}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
      <p className="text-xs text-muted-foreground text-center">{t('themes.note')}</p>
    </div>
  );
}

function Toggle({ on, onChange, label, sublabel }: { on: boolean; onChange: (v: boolean) => void; label: string; sublabel?: string }) {
  return (
    <button onClick={() => onChange(!on)} className="w-full flex items-center justify-between gap-3 text-left" role="switch" aria-checked={on}>
      <span>
        <span className="font-semibold block">{label}</span>
        {sublabel && <span className="text-xs text-muted-foreground">{sublabel}</span>}
      </span>
      <span className={cn('w-12 h-7 rounded-full transition-colors shrink-0 relative', on ? 'bg-primary' : 'bg-secondary')}>
        <span
          className={cn(
            'absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform',
            on ? 'translate-x-6' : 'translate-x-1'
          )}
        />
      </span>
    </button>
  );
}

export function Profile() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { name, setName, setAvatarDataUrl, bests, badges, saveEnabled, setSaveEnabled, eraseAll } = useProgressStore();
  const resetLocalStats = useGameStore((s) => s.resetLocalStats);
  const rank = rankFromPoints(rankPoints(bests));
  const rankLabel = useRankLabel(rank);

  const handleAvatarFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        // Downscale to keep the data-URL small in localStorage
        const size = 128;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d')!;
        const min = Math.min(img.width, img.height);
        ctx.drawImage(img, (img.width - min) / 2, (img.height - min) / 2, min, min, 0, 0, size, size);
        setAvatarDataUrl(canvas.toDataURL('image/jpeg', 0.82));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleErase = () => {
    if (window.confirm(t('profile.eraseConfirm'))) {
      eraseAll();
      resetLocalStats();
    }
  };

  return (
    <div className="min-h-screen bg-background safe-area-padding">
      <div className="container max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <header className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')} aria-label={t('common.back')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-heading text-xl font-bold flex-1">{t('profile.title')}</h1>
        </header>

        {/* Identity card */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="raised-card">
            <CardContent className="p-5 flex flex-col items-center gap-4 text-center">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="relative rounded-full focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={t('profile.changePhoto')}
              >
                <AvatarRing size={84} showLevelPill />
                <span className="absolute -top-1 -right-1 p-1.5 rounded-full bg-secondary text-muted-foreground">
                  <Camera className="w-3.5 h-3.5" />
                </span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleAvatarFile(e.target.files[0])}
              />

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('profile.namePlaceholder')}
                className="bg-transparent border-b border-border focus:border-primary outline-none py-1 text-center font-heading font-bold text-xl w-48"
                aria-label={t('profile.namePlaceholder')}
              />

              <RankPill tier={rank} aria-label={rankLabel} />
              <XpBar className="w-full" />
            </CardContent>
          </Card>
        </motion.div>

        {/* Badge shelf */}
        <section className="space-y-2">
          <h2 className="text-[11px] font-bold theme-label text-muted-foreground">{t('profile.badges')}</h2>
          <div className="grid grid-cols-4 gap-2">
            {BADGE_IDS.map((id) => {
              const earned = badges.includes(id);
              return (
                <div
                  key={id}
                  className={cn(
                    'aspect-square rounded-xl flex flex-col items-center justify-center gap-1 p-1.5 text-center',
                    earned
                      ? 'bg-gold-soft border border-gold-border text-gold raised-card'
                      : 'border-2 border-dashed border-border text-muted-foreground/50'
                  )}
                  title={t(BADGE_LABEL_KEY[id])}
                >
                  {earned ? (
                    <>
                      <Award className="w-5 h-5" aria-hidden="true" />
                      <span className="text-[9px] font-bold leading-tight theme-label">{t(BADGE_LABEL_KEY[id])}</span>
                    </>
                  ) : (
                    <span className="text-lg font-bold" aria-label={t('profile.lockedBadge')}>?</span>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Settings */}
        <section className="space-y-3">
          <h2 className="text-[11px] font-bold theme-label text-muted-foreground">{t('nav.settings')}</h2>

          <Card className="raised-card">
            <CardContent className="p-4">
              <Toggle
                on={saveEnabled}
                onChange={setSaveEnabled}
                label={t('profile.saveProgress')}
                sublabel={t('profile.saveProgressHint')}
              />
            </CardContent>
          </Card>

          <Card className="raised-card">
            <CardContent className="p-4 space-y-3">
              <p className="font-semibold">{t('themes.appearance')}</p>
              <AppearancePicker />
            </CardContent>
          </Card>

          <Card className="raised-card">
            <CardContent className="p-4 space-y-3">
              <p className="font-semibold">{t('settings.language')}</p>
              <LanguagePicker />
            </CardContent>
          </Card>

          <Button variant="outline" onClick={handleErase} className="w-full border-destructive/50 text-destructive hover:bg-destructive/10 pressable theme-label">
            <Trash2 className="w-4 h-4 mr-2" />
            {t('profile.eraseData')}
          </Button>
        </section>

        {/* Privacy footer */}
        <footer className="flex items-center justify-center gap-2 text-xs text-muted-foreground pb-4">
          <Lock className="w-3.5 h-3.5" aria-hidden="true" />
          {t('profile.privacyNote')}
        </footer>
      </div>
    </div>
  );
}
