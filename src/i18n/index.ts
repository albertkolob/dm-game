import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import es from './es.json';
import pt from './pt.json';

const savedLanguage = localStorage.getItem('dm-game-language') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      pt: { translation: pt },
    },
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

export const changeLanguage = (lang: 'en' | 'es' | 'pt') => {
  localStorage.setItem('dm-game-language', lang);
  i18n.changeLanguage(lang);
};

export const getCurrentLanguage = (): 'en' | 'es' | 'pt' => {
  return (i18n.language as 'en' | 'es' | 'pt') || 'en';
};
