export interface UserSession {
  id: string;
  email: string;
  role_id: string;
  permissions: string[];
  isRegistered?: boolean;
}
