import repository from '../../../repository';
import { UserSignUpForm } from '../types/sign-up-dto.type';
import { Tokens } from '../types/tokens.type';

export const signUp = (form: UserSignUpForm) => {
  return repository.post<Tokens>('/auth/sign-up', form);
};
