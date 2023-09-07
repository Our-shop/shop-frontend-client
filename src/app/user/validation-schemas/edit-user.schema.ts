import * as yup from 'yup';
import { emailRegex } from '../../auth/validation-schemas/regex';

export const editUserSchema = yup.object({
  userName: yup.string().min(3, "It's too short").required('Required-field'),
  email: yup
    .string()
    .email('Field-should-be-email')
    .matches(emailRegex, 'Invalid email format')
    .required('Required-field'),
});
