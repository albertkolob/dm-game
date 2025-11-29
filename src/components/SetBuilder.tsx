import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Check, ChevronDown, ChevronUp, Save, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { DM_MASTER, PRESETS, PresetKey } from '@/data';
import { Work, WORK_NAMES } from '@/data/types';
import { useGameStore } from '@/store/useGameStore';

const WORKS: Work[] = ['OT', 'NT', 'BOM', 'DC', 'PGP'];

export function SetBuilder() {
  const { t } = useTranslation();
  const { language, selectedIds, setSelectedIds, loadPreset } = useGameStore();
  const [selectedWorks, setSelectedWorks] = useState<Work[]>([]);
  const [expandedWork, setExpandedWork] = useState<Work | null>(null);
  const [expandedBook, setExpandedBook] = useState<string | null>(null);

  // Get items filtered by selected works
  const filteredItems = useMemo(() => {
    if (selectedWorks.length === 0) return DM_MASTER;
    return DM_MASTER.filter((item) => selectedWorks.includes(item.work));
  }, [selectedWorks]);

  // Group items by work and book
  const groupedItems = useMemo(() => {
    const groups: Record<Work, Record<string, typeof DM_MASTER>> = {
      OT: {},
      NT: {},
      BOM: {},
      DC: {},
      PGP: {},
    };

    filteredItems.forEach((item) => {
      if (!groups[item.work][item.book]) {
        groups[item.work][item.book] = [];
      }
      groups[item.work][item.book].push(item);
    });

    return groups;
  }, [filteredItems]);

  const toggleWork = (work: Work) => {
    setSelectedWorks((prev) =>
      prev.includes(work) ? prev.filter((w) => w !== work) : [...prev, work]
    );
  };

  const toggleItem = (id: string) => {
    setSelectedIds(
      selectedIds.includes(id)
        ? selectedIds.filter((i) => i !== id)
        : [...selectedIds, id]
    );
  };

  const selectAllInBook = (book: string) => {
    const bookItems = DM_MASTER.filter((item) => item.book === book);
    const bookIds = bookItems.map((item) => item.id);
    const allSelected = bookIds.every((id) => selectedIds.includes(id));

    if (allSelected) {
      setSelectedIds(selectedIds.filter((id) => !bookIds.includes(id)));
    } else {
      setSelectedIds([...new Set([...selectedIds, ...bookIds])]);
    }
  };

  const selectAllInWork = (work: Work) => {
    const workItems = DM_MASTER.filter((item) => item.work === work);
    const workIds = workItems.map((item) => item.id);
    const allSelected = workIds.every((id) => selectedIds.includes(id));

    if (allSelected) {
      setSelectedIds(selectedIds.filter((id) => !workIds.includes(id)));
    } else {
      setSelectedIds([...new Set([...selectedIds, ...workIds])]);
    }
  };

  const handlePreset = (key: PresetKey) => {
    loadPreset(key);
  };

  const saveToLocalStorage = () => {
    localStorage.setItem('dm-game-custom-set', JSON.stringify(selectedIds));
  };

  const loadFromLocalStorage = () => {
    const saved = localStorage.getItem('dm-game-custom-set');
    if (saved) {
      setSelectedIds(JSON.parse(saved));
    }
  };

  return (
    <div className="space-y-6">
      {/* Selected count */}
      <div className="flex items-center justify-between">
        <Badge variant="teal" className="text-lg px-4 py-2">
          {t('setBuilder.selectedCount')}: {selectedIds.length}
        </Badge>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={saveToLocalStorage}>
            <Save className="w-4 h-4 mr-2" />
            {t('setBuilder.saveSet')}
          </Button>
          <Button variant="outline" size="sm" onClick={loadFromLocalStorage}>
            <RotateCcw className="w-4 h-4 mr-2" />
            {t('setBuilder.loadSet')}
          </Button>
        </div>
      </div>

      {/* Presets */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>{t('teacher.presets')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedIds.length === PRESETS.all_dm.length ? 'default' : 'outline'}
              size="sm"
              onClick={() => handlePreset('all_dm')}
            >
              {t('teacher.allDM')}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePreset('bom_core')}
            >
              BoM Core
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePreset('dc_76_131')}
            >
              D&C 76-131
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePreset('faith_action')}
            >
              Act in Faith
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedIds([])}
            >
              {t('setBuilder.clearAll')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Works filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>{t('setBuilder.selectWorks')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {WORKS.map((work) => (
              <Button
                key={work}
                variant={selectedWorks.includes(work) ? 'default' : 'outline'}
                size="sm"
                onClick={() => toggleWork(work)}
              >
                {WORK_NAMES[work][language]}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Works accordion */}
      <div className="space-y-3">
        {WORKS.map((work) => {
          const books = Object.keys(groupedItems[work]);
          if (books.length === 0) return null;

          const workItems = DM_MASTER.filter((item) => item.work === work);
          const selectedInWork = workItems.filter((item) =>
            selectedIds.includes(item.id)
          ).length;
          const isWorkExpanded = expandedWork === work;

          return (
            <Card key={work}>
              <button
                className="w-full p-4 flex items-center justify-between text-left"
                onClick={() => setExpandedWork(isWorkExpanded ? null : work)}
              >
                <div className="flex items-center gap-3">
                  <span className="font-semibold">{WORK_NAMES[work][language]}</span>
                  <Badge variant="secondary">
                    {selectedInWork}/{workItems.length}
                  </Badge>
                </div>
                {isWorkExpanded ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>

              {isWorkExpanded && (
                <CardContent className="pt-0 space-y-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => selectAllInWork(work)}
                    className="w-full"
                  >
                    {selectedInWork === workItems.length
                      ? t('setBuilder.clearAll')
                      : t('setBuilder.selectAll')}
                  </Button>

                  {books.map((book) => {
                    const bookItems = groupedItems[work][book];
                    const selectedInBook = bookItems.filter((item) =>
                      selectedIds.includes(item.id)
                    ).length;
                    const isBookExpanded = expandedBook === book;

                    return (
                      <div key={book} className="border rounded-xl overflow-hidden">
                        <button
                          className="w-full p-3 flex items-center justify-between text-left bg-secondary/30"
                          onClick={() => setExpandedBook(isBookExpanded ? null : book)}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{book}</span>
                            <Badge variant="outline" className="text-xs">
                              {selectedInBook}/{bookItems.length}
                            </Badge>
                          </div>
                          {isBookExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>

                        {isBookExpanded && (
                          <div className="p-3 space-y-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => selectAllInBook(book)}
                              className="w-full mb-2"
                            >
                              {selectedInBook === bookItems.length
                                ? t('setBuilder.clearAll')
                                : t('setBuilder.selectAll')}
                            </Button>

                            {bookItems.map((item) => (
                              <motion.button
                                key={item.id}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => toggleItem(item.id)}
                                className={cn(
                                  'w-full p-3 rounded-lg text-left transition-all flex items-center gap-3',
                                  selectedIds.includes(item.id)
                                    ? 'bg-primary/20 border border-primary'
                                    : 'bg-secondary/50 hover:bg-secondary'
                                )}
                              >
                                <div
                                  className={cn(
                                    'w-5 h-5 rounded border-2 flex items-center justify-center',
                                    selectedIds.includes(item.id)
                                      ? 'bg-primary border-primary'
                                      : 'border-muted-foreground'
                                  )}
                                >
                                  {selectedIds.includes(item.id) && (
                                    <Check className="w-3 h-3 text-primary-foreground" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium text-sm">{item.reference}</p>
                                  <p className="text-xs text-muted-foreground line-clamp-1">
                                    {item.keyPhrase[language]}
                                  </p>
                                </div>
                              </motion.button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
