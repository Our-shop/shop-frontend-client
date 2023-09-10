import repository from '../../../repository';
import { ForgotPasswordDto } from '../types/forgot-password-dto.type';

export const forgotPassword = (email: ForgotPasswordDto) => {
  return repository.post<string>('/auth/forgot-password', email);
};
