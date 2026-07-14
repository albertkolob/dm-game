export type ThemeId = 'neon' | 'quest' | 'classic';

export const THEME_STORAGE_KEY = 'dm.theme';
export const DEFAULT_THEME: ThemeId = 'neon';

export const THEME_IDS: ThemeId[] = ['neon', 'quest', 'classic'];

export interface ThemeMeta {
  id: ThemeId;
  nameKey: string;
  descKey: string;
}

export const THEMES: ThemeMeta[] = [
  { id: 'neon', nameKey: 'themes.neonName', descKey: 'themes.neonDesc' },
  { id: 'quest', nameKey: 'themes.questName', descKey: 'themes.questDesc' },
  { id: 'classic', nameKey: 'themes.classicName', descKey: 'themes.classicDesc' },
];

export function readStoredTheme(): ThemeId {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'neon' || stored === 'quest' || stored === 'classic') return stored;
  } catch {
    // localStorage unavailable (private mode etc.)
  }
  return DEFAULT_THEME;
}

export function applyTheme(theme: ThemeId): void {
  document.documentElement.dataset.theme = theme;
  // Keep the browser UI (address bar) color in sync
  const meta = document.querySelector('meta[name="theme-color"]');
  const colors: Record<ThemeId, string> = {
    neon: '#07090f',
    quest: '#fbf6ec',
    classic: '#0B132B',
  };
  if (meta) meta.setAttribute('content', colors[theme]);
}

export function persistTheme(theme: ThemeId): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // best effort
  }
}
