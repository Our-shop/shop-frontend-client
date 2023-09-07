import { createAsyncThunk } from '@reduxjs/toolkit';
import repository from '../../../repository';
import { UserDto } from '../types/user-dto.type';

export const deleteUser = createAsyncThunk<UserDto, { userId: string }>(
  'DELETE/users/:userId',
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await repository.delete('users/' + userId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

export const editUser = createAsyncThunk<
  UserDto,
  { userId: string; updatedUser: Partial<UserDto> }
>('PUT/users/:userId', async ({ userId, updatedUser }, { rejectWithValue }) => {
  try {
    const response = await repository.put<UserDto>(`/users/${userId}`, updatedUser);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
