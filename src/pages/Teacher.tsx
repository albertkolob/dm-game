import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Settings2, Play, Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SetBuilder } from '@/components/SetBuilder';
import { LanguagePicker } from '@/components/LanguagePicker';
import { useGameStore } from '@/store/useGameStore';
import { TEAM_COLORS } from '@/data/types';
import { cn } from '@/lib/utils';

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

  return (
    <div className="min-h-screen bg-background safe-area-padding">
      <div className="container max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <header className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-heading text-xl font-bold flex-1">{t('teacher.title')}</h1>
        </header>

        {/* Language Picker */}
        <LanguagePicker />

        {/* Tabs */}
        <div className="flex gap-2">
          <Button
            variant={activeTab === 'settings' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('settings')}
            className="flex-1"
          >
            <Settings2 className="w-4 h-4 mr-2" />
            {t('teacher.gameSettings')}
          </Button>
          <Button
            variant={activeTab === 'teams' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('teams')}
            className="flex-1"
          >
            <Users className="w-4 h-4 mr-2" />
            {t('team.teams')}
          </Button>
          <Button
            variant={activeTab === 'sets' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('sets')}
            className="flex-1"
          >
            {t('setBuilder.title')}
          </Button>
        </div>

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Time per question */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{t('teacher.timePerQuestion')}</span>
                  <Badge variant="secondary">{settings.timePerQuestion}s</Badge>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      updateSettings({
                        timePerQuestion: Math.max(10, settings.timePerQuestion - 5),
                      })
                    }
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <div className="flex-1 h-2 bg-secondary rounded-full">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${((settings.timePerQuestion - 10) / 20) * 100}%` }}
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      updateSettings({
                        timePerQuestion: Math.min(30, settings.timePerQuestion + 5),
                      })
                    }
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Questions per round */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{t('teacher.questionsPerRound')}</span>
                  <Badge variant="secondary">{settings.questionsPerRound}</Badge>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      updateSettings({
                        questionsPerRound: Math.max(5, settings.questionsPerRound - 5),
                      })
                    }
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <div className="flex-1 h-2 bg-secondary rounded-full">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{
                        width: `${((settings.questionsPerRound - 5) / 25) * 100}%`,
                      }}
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      updateSettings({
                        questionsPerRound: Math.min(30, settings.questionsPerRound + 5),
                      })
                    }
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Sound & Haptics */}
            <Card>
              <CardContent className="p-4 space-y-4">
                <button
                  onClick={() => updateSettings({ enableSound: !settings.enableSound })}
                  className="w-full flex items-center justify-between"
                >
                  <span className="font-medium">{t('settings.sound')}</span>
                  <div
                    className={cn(
                      'w-12 h-6 rounded-full transition-colors',
                      settings.enableSound ? 'bg-primary' : 'bg-secondary'
                    )}
                  >
                    <div
                      className={cn(
                        'w-5 h-5 rounded-full bg-white shadow transition-transform mt-0.5',
                        settings.enableSound ? 'translate-x-6' : 'translate-x-0.5'
                      )}
                    />
                  </div>
                </button>

                <button
                  onClick={() => updateSettings({ enableHaptics: !settings.enableHaptics })}
                  className="w-full flex items-center justify-between"
                >
                  <span className="font-medium">{t('settings.haptics')}</span>
                  <div
                    className={cn(
                      'w-12 h-6 rounded-full transition-colors',
                      settings.enableHaptics ? 'bg-primary' : 'bg-secondary'
                    )}
                  >
                    <div
                      className={cn(
                        'w-5 h-5 rounded-full bg-white shadow transition-transform mt-0.5',
                        settings.enableHaptics ? 'translate-x-6' : 'translate-x-0.5'
                      )}
                    />
                  </div>
                </button>
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
            {/* Enable team mode */}
            <Card>
              <CardContent className="p-4">
                <button
                  onClick={() => setIsTeamMode(!isTeamMode)}
                  className="w-full flex items-center justify-between"
                >
                  <span className="font-medium">{t('teacher.enableTeamMode')}</span>
                  <div
                    className={cn(
                      'w-12 h-6 rounded-full transition-colors',
                      isTeamMode ? 'bg-primary' : 'bg-secondary'
                    )}
                  >
                    <div
                      className={cn(
                        'w-5 h-5 rounded-full bg-white shadow transition-transform mt-0.5',
                        isTeamMode ? 'translate-x-6' : 'translate-x-0.5'
                      )}
                    />
                  </div>
                </button>
              </CardContent>
            </Card>

            {isTeamMode && (
              <>
                {/* Team list */}
                <div className="space-y-3">
                  {teams.map((team) => (
                    <Card key={team.id}>
                      <CardContent className="p-4 flex items-center gap-3">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: team.color }}
                        />
                        <input
                          type="text"
                          value={team.name}
                          onChange={(e) => handleTeamNameChange(team.id, e.target.value)}
                          className="flex-1 bg-transparent border-b border-border focus:border-primary outline-none py-1"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveTeam(team.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Add team button */}
                {teams.length < 6 && (
                  <Button
                    variant="outline"
                    onClick={handleAddTeam}
                    className="w-full"
                  >
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <SetBuilder />
          </motion.div>
        )}

        {/* Start Game Button */}
        <div className="pt-4">
          <Button
            onClick={handleStartGame}
            disabled={selectedIds.length < 4}
            size="xl"
            className="w-full"
          >
            <Play className="w-5 h-5 mr-2" />
            {t('teacher.startGame')}
          </Button>
          {selectedIds.length < 4 && (
            <p className="text-sm text-muted-foreground text-center mt-2">
              Select at least 4 verses to play
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
