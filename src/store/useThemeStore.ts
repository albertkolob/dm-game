import { create } from 'zustand';
import { ThemeId, readStoredTheme, applyTheme, persistTheme } from '@/theme/themes';

interface ThemeState {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
}

// data-theme is already set pre-paint by the inline script in index.html;
// this store keeps React state in sync and handles live switching.
export const useThemeStore = create<ThemeState>((set) => ({
  theme: readStoredTheme(),
  setTheme: (theme) => {
    applyTheme(theme);
    persistTheme(theme);
    set({ theme });
  },
}));
