import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../types/auth-state.type';
import { UserSession } from '../types/user-session.type';

const initialState: AuthState = {
  isRegistered: true,
  userId: '',
  email: '',
  roleId: '',
  permissions: [],
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register: (state: AuthState, action: PayloadAction<UserSession>) => {
      state.isRegistered = true;
      state.userId = action.payload.id;
      state.permissions = action.payload.permissions;
      state.roleId = action.payload.role_id;
      state.email = action.payload.email;
    },

    logout: (state) => {
      state.isRegistered = false;
      state.userId = '';
      state.permissions = [];
      state.roleId = '';
      state.email = '';
    },
  },
});

export const { register, logout } = authSlice.actions;