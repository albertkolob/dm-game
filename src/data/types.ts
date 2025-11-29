export type Work = 'OT' | 'NT' | 'BOM' | 'DC' | 'PGP';
export type ACE = 'act_in_faith' | 'eternal_perspective' | 'divinely_appointed_sources';
export type Language = 'en' | 'es' | 'pt';

export interface LocalizedText {
  en: string;
  es: string;
  pt: string;
}

export interface DMItem {
  id: string;
  work: Work;
  book: string;
  reference: string;
  keyPhrase: LocalizedText;
  cloze: LocalizedText;
  tags: string[];
  aceLinks: ACE[];
}

export type GameMode = 'reference_rush' | 'fill_verse' | 'ace_match' | 'lightning_ladder' | 'team_mode';

export interface Question {
  type: 'ref' | 'cloze' | 'ace';
  prompt: string;
  options?: string[];
  correctIndex?: number;
  optionsACE?: string[];
  correctACE?: string;
  optionsVerse?: string[];
  correctVerse?: string;
  meta: {
    id: string;
    ref?: string;
  };
}

export interface Team {
  id: string;
  name: string;
  score: number;
  color: string;
}

export interface GameResult {
  questionId: string;
  reference: string;
  correct: boolean;
  timeSpent: number;
  mode: GameMode;
}

export interface GameSettings {
  timePerQuestion: number;
  questionsPerRound: number;
  enableSound: boolean;
  enableHaptics: boolean;
  showHints: boolean;
}

export const WORK_NAMES: Record<Work, LocalizedText> = {
  OT: { en: 'Old Testament', es: 'Antiguo Testamento', pt: 'Antigo Testamento' },
  NT: { en: 'New Testament', es: 'Nuevo Testamento', pt: 'Novo Testamento' },
  BOM: { en: 'Book of Mormon', es: 'Libro de Mormón', pt: 'Livro de Mórmon' },
  DC: { en: 'Doctrine & Covenants', es: 'Doctrina y Convenios', pt: 'Doutrina e Convênios' },
  PGP: { en: 'Pearl of Great Price', es: 'Perla de Gran Precio', pt: 'Pérola de Grande Valor' },
};

export const ACE_NAMES: Record<ACE, LocalizedText> = {
  act_in_faith: {
    en: 'Act in Faith',
    es: 'Actuar con Fe',
    pt: 'Agir com Fé'
  },
  eternal_perspective: {
    en: 'Eternal Perspective',
    es: 'Perspectiva Eterna',
    pt: 'Perspectiva Eterna'
  },
  divinely_appointed_sources: {
    en: 'Divinely Appointed Sources',
    es: 'Fuentes Divinamente Señaladas',
    pt: 'Fontes Divinamente Designadas'
  },
};

export const TEAM_COLORS = [
  '#5BC0BE', // Teal
  '#FDC500', // Yellow
  '#9B5DE5', // Purple
  '#F15BB5', // Pink
  '#00BBF9', // Blue
  '#00F5D4', // Mint
];
