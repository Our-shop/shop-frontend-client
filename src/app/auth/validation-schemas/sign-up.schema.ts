import * as yup from 'yup';
import { emailRegex, passwordRegex } from './regex';

import i18n from '../../../resources/i18n';

export const signUpSchema = yup.object({
  userName: yup
    .string()
    .min(3, `${i18n.t('validation:It-is-too-short')}`)
    .required(i18n.t('validation:Required-field')),
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

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], `${i18n.t('validation:Password-not-match')}`)
    .required(i18n.t('validation:Required-field')),

  role: yup
    .string()
    .oneOf(['user', 'admin'], `${i18n.t('validation:Please-select-role')}`)
    .required(i18n.t('validation:Required-field')),

  acceptTerms: yup
    .boolean()
    .oneOf([true], `${i18n.t('validation:I-accept')}`)
    .required(i18n.t('validation:Required-field')),
});
