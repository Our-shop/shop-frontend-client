import * as yup from 'yup';
import { emailRegex, passwordRegex } from './regex';

import i18n from '../../../resources/i18n';

export const signInSchema = yup.object({
  email: yup
    .string()
    .email(i18n.t('validation:Field-should-be-email'))
    .matches(emailRegex, i18n.t('validation:Invalid-email-format'))
    .required(i18n.t('validation:Required-field')),
  password: yup
    .string()
    .required(i18n.t('validation:Required-field'))
    .test('password-validation', i18n.t('validation:Password-should-contain'), (value) => {
      const minLength = 6;
      const maxLength = 20;

      if (!value) {
        return false;
      }

      if (value.length < minLength || value.length > maxLength) {
        return false;
      }

      return passwordRegex.test(value);
    }),
});
