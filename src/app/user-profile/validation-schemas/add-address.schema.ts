import * as yup from 'yup';

export const addAddressSchema = yup.object({
  city: yup.string().required('Required-field'),
  address: yup.string().required('Required-field'),
  phone: yup.string().required('Required-field'),
});
