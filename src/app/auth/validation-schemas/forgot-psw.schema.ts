import * as yup from 'yup';
import { emailRegex } from './regex';

import i18n from '../../../resources/i18n';

export const forgotPswSchema = yup.object({
  email: yup
    .string()
    .email(i18n.t('validation:Field-should-be-email'))
    .matches(emailRegex, i18n.t('validation:Invalid-email-format'))
    .required(i18n.t('validation:Required-field')),
});
