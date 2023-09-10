import { BaseState } from '../../../types/base-state.type';
import { UserFormValues } from './user-form-values.type';

export interface UserState extends BaseState {
  user: UserFormValues | null;
  pending: {
    user: boolean;
  };
  errors: {
    user: string | null;
  };
}
