// src/store/actions/newAuthActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';

import { setAuthToken } from '../../api/client';
import { AuthService } from '../../api/services';
import type { LoginRequest, LoginResponse, ThunkApiConfig, User } from '../types/ApiTypes';

// ========================
// LOGIN
// ========================

export const loginThunk = createAsyncThunk<LoginResponse, LoginRequest, ThunkApiConfig>(
  'auth/loginThunk',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AuthService.login(credentials);
      return response as LoginResponse;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      return rejectWithValue(message);
    }
  },
);

// ========================
// GET CURRENT USER
// ========================

export const getCurrentUserThunk = createAsyncThunk<User, void, ThunkApiConfig>(
  'auth/getCurrentUserThunk',
  async (_, { rejectWithValue }) => {
    try {
      const response = await AuthService.getCurrentUser();
      return response as User;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to get current user';
      return rejectWithValue(message);
    }
  },
);

// ========================
// LOGOUT
// ========================

export const logoutThunk = createAsyncThunk<void, void, ThunkApiConfig>(
  'auth/logoutThunk',
  async (_, { rejectWithValue }) => {
    try {
      await AuthService.logout();
      // Clear token from client
      setAuthToken(null);
    } catch (error) {
      // Even if logout fails on server, we should clear local token
      setAuthToken(null);
      const message = error instanceof Error ? error.message : 'Logout failed';
      return rejectWithValue(message);
    }
  },
);
