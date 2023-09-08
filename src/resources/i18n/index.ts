import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

import homeEn from './locales/en/home.json';
import homeRu from './locales/ru/home.json';
import HeaderEn from './locales/en/header.json';
import HeaderRu from './locales/ru/header.json';
import FooterRu from './locales/ru/footer.json';
import FooterEn from './locales/en/footer.json';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    load: 'all',
    debug: true,
    keySeparator: '.',
    ns: ['common'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        home: homeEn,
        header: HeaderEn,
        footer: FooterEn,
      },
      ru: {
        home: homeRu,
        header: HeaderRu,
        footer: FooterRu,
      },
    },
    detection: {
      caches: ['cookie'],
    },
  });

export default i18n;
