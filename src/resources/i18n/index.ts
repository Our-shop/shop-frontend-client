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
import SingInEn from './locales/en/signIn.json';
import SingInRu from './locales/ru/signIn.json';
import ValidationRu from './locales/ru/validation.json';
import ValidationEn from './locales/en/validation.json';
import ForgotPasswordEn from './locales/en/forgotPassword.json';
import ForgotPasswordRu from './locales/ru/forgotPassword.json';
import SignUpRu from './locales/ru/signUp.json';
import SignUpEn from './locales/en/signUp.json';
import ResetPasswordEn from './locales/en/resetPassword.json';
import ResetPasswordRu from './locales/ru/resetPassword.json';

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
        signIn: SingInEn,
        validation: ValidationEn,
        forgotPassword: ForgotPasswordEn,
        signUp: SignUpEn,
        resetPassword: ResetPasswordEn,
      },
      ru: {
        home: homeRu,
        header: HeaderRu,
        footer: FooterRu,
        signIn: SingInRu,
        validation: ValidationRu,
        forgotPassword: ForgotPasswordRu,
        signUp: SignUpRu,
        resetPassword: ResetPasswordRu,
      },
    },
    detection: {
      caches: ['cookie'],
    },
  });

export default i18n;
