import 'react-i18next';
import home from './locales/en/home.json';
import header from './locales/en/header.json';
import footer from './locales/en/footer.json';

declare module 'react-i18next' {
  interface Resources {
    home: typeof home;
    header: typeof header;
    footer: typeof footer;
  }
}
