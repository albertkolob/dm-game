import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, Bookmark, Check, Tag } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DM_MASTER } from '@/data';
import { ACE_NAMES } from '@/data/types';
import { useGameStore } from '@/store/useGameStore';
import { cn } from '@/lib/utils';

export function Verse() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { language } = useGameStore();
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const item = DM_MASTER.find((i) => i.id === id);

  if (!item) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Verse not found</p>
      </div>
    );
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `${item.reference}\n${item.keyPhrase[language]}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('dm-bookmarks') || '[]');
    if (bookmarks.includes(id)) {
      localStorage.setItem(
        'dm-bookmarks',
        JSON.stringify(bookmarks.filter((b: string) => b !== id))
      );
      setBookmarked(false);
    } else {
      localStorage.setItem('dm-bookmarks', JSON.stringify([...bookmarks, id]));
      setBookmarked(true);
    }
  };

  return (
    <div className="min-h-screen bg-background safe-area-padding">
      <div className="container max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <header className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-heading text-xl font-bold flex-1">{item.reference}</h1>
        </header>

        {/* Key Phrase Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t('verse.keyPhrase')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed">{item.keyPhrase[language]}</p>

              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  className="flex-1"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2 text-success" />
                      {t('verse.copied')}
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      {t('verse.copy')}
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBookmark}
                  className={cn('flex-1', bookmarked && 'text-warning')}
                >
                  <Bookmark
                    className={cn('w-4 h-4 mr-2', bookmarked && 'fill-warning')}
                  />
                  {bookmarked ? t('verse.bookmarked') : t('verse.bookmark')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Cloze Version */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Fill the Verse</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {item.cloze[language]}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* ACE Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t('verse.aceLinks')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {item.aceLinks.map((ace) => (
                  <Badge key={ace} variant="teal">
                    {ACE_NAMES[ace][language]}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Tag className="w-4 h-4" />
                {t('verse.tags')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Reference Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">{t('verse.reference')}</p>
                  <p className="font-medium">{item.reference}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Book</p>
                  <p className="font-medium">{item.book}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Work</p>
                  <p className="font-medium">{item.work}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">ID</p>
                  <p className="font-medium font-mono text-xs">{item.id}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
