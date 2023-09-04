import * as yup from 'yup';
import { emailRegex, passwordRegex } from './regex';

export const signInSchema = yup.object({
  email: yup
    .string()
    .email('Field-should-be-email')
    .matches(emailRegex, 'Invalid email format')
    .required('Required-field'),
  password: yup
    .string()
    .required('Required-field')
    .test(
      'password-validation',
      'Password should contain at least 6 characters including: 1 uppercase letter, 1 lowercase letter, 1 number or special character',
      (value) => {
        const minLength = 6;
        const maxLength = 20;

        if (!value) {
          return false;
        }

        if (value.length < minLength || value.length > maxLength) {
          return false;
        }

        return passwordRegex.test(value);
      },
    ),
});
