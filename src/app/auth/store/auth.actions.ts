import { createAsyncThunk } from '@reduxjs/toolkit';
import repository from '../../../repository';
import { TokensDto } from '../types/tokens-dto.type';
import { Tokens } from '../types/tokens.type';

export const refreshTokens = createAsyncThunk<Tokens, TokensDto>(
  'POST/auth/refresh',
  async (tokensDto, { rejectWithValue }) => {
    try {
      const response = await repository.post<Tokens>('/auth/refresh', tokensDto);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);
