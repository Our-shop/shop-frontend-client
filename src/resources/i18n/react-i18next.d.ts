import 'react-i18next';
import home from './locales/en/home.json';
import header from './locales/en/header.json';
import footer from './locales/en/footer.json';
import signIn from './locales/en/signIn.json';
import validation from './locales/en/validation.json';
import forgotPassword from './locales/en/forgotPassword.json';
import signUp from './locales/en/signUp.json';

declare module 'react-i18next' {
  interface Resources {
    home: typeof home;
    header: typeof header;
    footer: typeof footer;
    signIn: typeof signIn;
    validation: typeof validation;
    forgotPassword: typeof forgotPassword;
    signUp: typeof signUp;
  }
}
