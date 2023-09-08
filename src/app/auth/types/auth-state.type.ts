import { TokensDto } from './tokens-dto.type';

export interface AuthState {
  isRegistered: boolean;
  userId: string;
  email: string;
  roleId: string;
  permissions: string[];
  tokens: {
    tokens: TokensDto;
    pending: {
      tokens: boolean;
    };
    errors: {
      tokens: string | undefined;
    };
  };
}
