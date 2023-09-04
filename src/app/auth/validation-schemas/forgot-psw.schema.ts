import * as yup from 'yup';
import { emailRegex } from './regex';

export const forgotPswSchema = yup.object({
  email: yup
    .string()
    .email('Field-should-be-email')
    .matches(emailRegex, 'Invalid email format')
    .required('Required-field'),
});
