import * as yup from 'yup';
import { emailRegex } from '../../auth/validation-schemas/regex';
import i18n from '../../../resources/i18n';

export const editUserSchema = yup.object({
  userName: yup
    .string()
    .min(3, `${i18n.t('validation:It-is-too-short')}`)
    .required(i18n.t('validation:Required-field')),
  email: yup
    .string()
    .email(i18n.t('validation:Field-should-be-email'))
    .matches(emailRegex, i18n.t('validation:Invalid-email-format'))
    .required(i18n.t('validation:Required-field')),
});
