import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Settings2, Play, Plus, Trash2, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SetBuilder } from '@/components/SetBuilder';
import { useGameStore } from '@/store/useGameStore';
import { TEAM_COLORS } from '@/data/types';
import { cn } from '@/lib/utils';

function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button onClick={() => onChange(!on)} className="w-full flex items-center justify-between gap-3 min-h-[46px]" role="switch" aria-checked={on}>
      <span className="font-semibold text-left">{label}</span>
      <span className={cn('w-12 h-7 rounded-full transition-colors shrink-0 relative', on ? 'bg-primary' : 'bg-secondary')}>
        <span className={cn('absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform', on ? 'translate-x-6' : 'translate-x-1')} />
      </span>
    </button>
  );
}

export function Teacher() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'settings' | 'teams' | 'sets'>('settings');

  const {
    settings,
    updateSettings,
    isTeamMode,
    setIsTeamMode,
    teams,
    setTeams,
    selectedIds,
  } = useGameStore();

  const handleAddTeam = () => {
    if (teams.length >= 6) return;

    const newTeam = {
      id: `team-${Date.now()}`,
      name: `${t('team.team')} ${teams.length + 1}`,
      score: 0,
      color: TEAM_COLORS[teams.length % TEAM_COLORS.length],
    };

    setTeams([...teams, newTeam]);
  };

  const handleRemoveTeam = (id: string) => {
    setTeams(teams.filter((t) => t.id !== id));
  };

  const handleTeamNameChange = (id: string, name: string) => {
    setTeams(teams.map((t) => (t.id === id ? { ...t, name } : t)));
  };

  const handleStartGame = () => {
    if (selectedIds.length < 4) return;

    // Reset team scores
    setTeams(teams.map((t) => ({ ...t, score: 0 })));

    if (isTeamMode && teams.length > 1) {
      navigate('/play/team_mode');
    } else {
      navigate('/play/lightning_ladder');
    }
  };

  const tabs = [
    { id: 'settings' as const, icon: Settings2, label: t('teacher.gameSettings') },
    { id: 'teams' as const, icon: Users, label: t('team.teams') },
    { id: 'sets' as const, icon: BookOpen, label: t('nav.setBuilder') },
  ];

  return (
    <div className="min-h-screen bg-background safe-area-padding">
      <div className="container max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <header className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')} aria-label={t('common.back')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="font-heading text-xl font-bold leading-tight">{t('teacher.gameSetup')}</h1>
            <p className="text-xs text-muted-foreground">{t('teacher.console')}</p>
          </div>
        </header>

        {/* Tabs */}
        <div className="flex gap-2" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex-1 flex items-center justify-center gap-1.5 px-1.5 py-2.5 rounded-xl text-xs font-bold transition-colors theme-label pressable',
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground raised-primary'
                  : 'bg-secondary text-muted-foreground'
              )}
            >
              <tab.icon className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span className="truncate">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Time per question */}
            <Card className="raised-card">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{t('teacher.timePerQuestion')}</span>
                  <span className="font-bold text-primary tabular-nums">{settings.timePerQuestion}s</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={60}
                  step={5}
                  value={settings.timePerQuestion}
                  onChange={(e) => updateSettings({ timePerQuestion: Number(e.target.value) })}
                  className="slider"
                  aria-label={t('teacher.timePerQuestion')}
                />
              </CardContent>
            </Card>

            {/* Questions per round */}
            <Card className="raised-card">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{t('teacher.questionsPerRound')}</span>
                  <span className="font-bold text-primary tabular-nums">{settings.questionsPerRound}</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={25}
                  step={5}
                  value={settings.questionsPerRound}
                  onChange={(e) => updateSettings({ questionsPerRound: Number(e.target.value) })}
                  className="slider"
                  aria-label={t('teacher.questionsPerRound')}
                />
              </CardContent>
            </Card>

            {/* Toggles */}
            <Card className="raised-card">
              <CardContent className="p-4 space-y-1">
                <Toggle
                  on={settings.enableCombos}
                  onChange={(v) => updateSettings({ enableCombos: v })}
                  label={t('teacher.combos')}
                />
                <Toggle
                  on={settings.enableSound}
                  onChange={(v) => updateSettings({ enableSound: v })}
                  label={t('settings.sound')}
                />
                <Toggle
                  on={settings.enableHaptics}
                  onChange={(v) => updateSettings({ enableHaptics: v })}
                  label={t('settings.haptics')}
                />
              </CardContent>
            </Card>

            {/* Verse set row */}
            <Card className="raised-card">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="flex-1">
                  <p className="font-semibold">{t('teacher.verseSet')}</p>
                  <p className="text-xs text-muted-foreground">
                    {selectedIds.length} {t('home.versesInSet')}
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setActiveTab('sets')} className="pressable theme-label">
                  {t('teacher.change')} →
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Teams Tab */}
        {activeTab === 'teams' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <Card className="raised-card">
              <CardContent className="p-4">
                <Toggle on={isTeamMode} onChange={setIsTeamMode} label={t('teacher.enableTeamMode')} />
              </CardContent>
            </Card>

            {isTeamMode && (
              <>
                <div className="space-y-3">
                  {teams.map((team) => (
                    <Card key={team.id} className="raised-card">
                      <CardContent className="p-4 flex items-center gap-3">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: team.color }} />
                        <input
                          type="text"
                          value={team.name}
                          onChange={(e) => handleTeamNameChange(team.id, e.target.value)}
                          className="flex-1 bg-transparent border-b border-border focus:border-primary outline-none py-1 font-semibold"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveTeam(team.id)}
                          className="text-destructive"
                          aria-label={t('team.removeTeam')}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {teams.length < 6 && (
                  <Button variant="outline" onClick={handleAddTeam} className="w-full pressable">
                    <Plus className="w-4 h-4 mr-2" />
                    {t('team.addTeam')}
                  </Button>
                )}
              </>
            )}
          </motion.div>
        )}

        {/* Sets Tab */}
        {activeTab === 'sets' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <SetBuilder />
          </motion.div>
        )}

        {/* Start Game Button */}
        <div className="pt-2">
          <Button
            onClick={handleStartGame}
            disabled={selectedIds.length < 4}
            size="xl"
            className="w-full raised-primary-strong pressable theme-label"
          >
            <Play className="w-5 h-5 mr-2" />
            {t('teacher.startGame')}
          </Button>
          {selectedIds.length < 4 && (
            <p className="text-sm text-muted-foreground text-center mt-2">{t('home.needVerses')}</p>
          )}
        </div>
      </div>
    </div>
  );
}
