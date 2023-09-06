export interface AuthState {
  isRegistered: boolean;
  userId: string;
  email: string;
  roleId: string;
  permissions: string[];
}
