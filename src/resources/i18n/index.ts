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
import ErrorBoundaryEn from './locales/en/errorBoundary.json';
import ErrorBoundaryRu from './locales/ru/errorBoundary.json';
import ProductsEn from './locales/en/products.json';
import ProductsRu from './locales/ru/products.json';
import ProductDetailsEn from './locales/en/productDetails.json';
import ProductDetailsRu from './locales/ru/productDetails.json';
import CartItemRu from './locales/ru/cartItem.json';
import CartItemEn from './locales/en/cartItem.json';
import MakeOrderEn from './locales/en/makeOrder.json';
import MakeOrderRu from './locales/ru/makeOrder.json';
import UserProfileEn from './locales/en/userProfile.json';
import UserProfileRu from './locales/ru/userProfile.json';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    load: 'all',
    debug: true,
    keySeparator: '.',
    ns: ['home'],
    defaultNS: 'home',
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
        errorBoundary: ErrorBoundaryEn,
        products: ProductsEn,
        productDetails: ProductDetailsEn,
        cartItem: CartItemEn,
        makeOrder: MakeOrderEn,
        userProfile: UserProfileEn,
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
        errorBoundary: ErrorBoundaryRu,
        products: ProductsRu,
        productDetails: ProductDetailsRu,
        cartItem: CartItemRu,
        makeOrder: MakeOrderRu,
        userProfile: UserProfileRu,
      },
    },
    detection: {
      caches: ['cookie'],
      order: ['cookie', 'navigator'],
    },
  });

export default i18n;
