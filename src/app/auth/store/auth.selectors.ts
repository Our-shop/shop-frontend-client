import { RootState } from '../../../store';

export const getIsRegistered = (state: RootState) => state.auth.isRegistered;
export const getUserId = (state: RootState) => state.auth.userId;
export const getUserPermissions = (state: RootState) => state.auth.permissions;
