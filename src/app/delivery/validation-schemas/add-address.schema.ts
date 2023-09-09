import * as yup from 'yup';
import i18n from '../../../resources/i18n';

export const addAddressSchema = yup.object({
  city: yup.string().required(i18n.t('validation:Required-field')),
  address: yup.string().required(i18n.t('validation:Required-field')),
  phone: yup.string().required(i18n.t('validation:Required-field')),
});
