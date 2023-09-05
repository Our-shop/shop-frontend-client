export interface AuthState {
  isAuthenticated: boolean;
  userId: string;
  email: string;
  roleId: string;
  permissions: string[];
}
