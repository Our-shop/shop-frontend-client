import { UserState } from '../types/user-state.type';
import { createSlice } from '@reduxjs/toolkit';
import { deleteUser, editUser } from './user.actions';

const initialState: UserState = {
  user: null,
  pending: {
    user: true,
  },
  errors: {
    user: null,
  },
};

export const userSlice = createSlice({
  name: 'user-settings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // ============ EDIT USER ============ //
      .addCase(editUser.pending, (state) => {
        state.pending.user = true;
        state.errors.user = null;
      })
      .addCase(editUser.fulfilled, (state, { payload }) => {
        state.pending.user = false;
        state.user = payload;
      })
      .addCase(editUser.rejected, (state, action: any & { payload: any }) => {
        state.errors.user = action.payload.message;
      })

      // ============ DELETE USER ============ //
      .addCase(deleteUser.pending, (state) => {
        state.pending.user = true;
        state.errors.user = null;
      })
      .addCase(deleteUser.fulfilled, (state, { payload }) => {
        state.pending.user = false;
        state.user = payload;
      })
      .addCase(deleteUser.rejected, (state, action: any & { payload: any }) => {
        state.errors.user = action.payload.message;
      });
  },
});
