import repository from '../../../repository';
import { ResetPasswordDto } from '../types/reset-password-dto.type';

export const resetPassword = (resetPasswordDto: ResetPasswordDto, token: string) => {
  return repository.post<string>(`/auth/reset-password/${token}`, resetPasswordDto);
};
