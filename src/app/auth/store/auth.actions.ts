import { createAsyncThunk } from '@reduxjs/toolkit';
import repository from '../../../repository';
import { TokensDto } from '../types/tokens-dto.type';
import { Tokens } from '../types/tokens.type';
import { UserSignUpForm } from '../types/sign-up-dto.type';
import { UserSignInForm } from '../types/sign-in.dto.type';

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

export const signUp = createAsyncThunk(
  'POST/auth/sign-up',
  async (userSignUpForm: UserSignUpForm, { rejectWithValue }) => {
    try {
      const response = await repository.post<Tokens>('/auth/sign-up', userSignUpForm);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const signIn = createAsyncThunk(
  'POST/auth/sign-in',
  async (userSignInForm: UserSignInForm, { rejectWithValue }) => {
    try {
      const response = await repository.post<Tokens>('/auth/sign-in', userSignInForm);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
