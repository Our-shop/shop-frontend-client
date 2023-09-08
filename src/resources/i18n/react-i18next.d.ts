import 'react-i18next';
import home from './locales/en/home.json';

declare module 'react-i18next' {
  interface Resources {
    home: typeof home;
  }
}
