import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../types/auth-state.type';
import { UserSession } from '../types/user-session.type';
import { refreshTokens } from './auth.actions';

const initialState: AuthState = {
  isRegistered: true,
  userId: '',
  email: '',
  roleId: '',
  permissions: [],
  tokens: {
    tokens: {
      access_token: '',
      refresh_token: '',
    },
    pending: {
      tokens: true,
    },
    errors: {
      tokens: null,
    },
  },
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

  extraReducers: (builder) => {
    builder

      // ============ REFRESH TOKENS ============ //
      .addCase(refreshTokens.pending, (state) => {
        state.tokens.pending.tokens = true;
        state.tokens.errors.tokens = null;
      })
      .addCase(refreshTokens.fulfilled, (state, { payload }) => {
        state.tokens.pending.tokens = false;
        state.tokens.tokens = payload;
      })
      .addCase(refreshTokens.rejected, (state, action: any & { payload: any }) => {
        state.tokens.errors.tokens = action.payload.message;
      });
  },
});

export const { register, logout } = authSlice.actions;
