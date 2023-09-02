import * as yup from 'yup';

export const signInSchema = yup.object({
  email: yup.string().email('Field-should-be-email').required('Required-field'),

  password: yup
    .string()
    .required('Required-field')
    .test(
      'password-validation',
      'Password should contain at least 6 characters including: 1 uppercase letter, 1 lowercase letter, 1 number or special character',
      (value) => {
        const passwordRegex =
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]+$/;
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
