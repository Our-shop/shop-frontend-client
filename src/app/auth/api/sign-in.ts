import repository from '../../../repository';
import { Tokens } from '../types/tokens.type';
import { UserSignInForm } from '../types/sign-in.dto.type';

export const signIn = (form: UserSignInForm) => {
  return repository.post<Tokens>('/auth/sign-in', form);
};
