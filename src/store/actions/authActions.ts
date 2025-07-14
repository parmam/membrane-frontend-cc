// src/store/actions/authActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';

import { setAuthToken } from '../../api/client';
import { AuthService } from '../../api/services';
import type { LoginRequest, LoginResponse, ThunkApiConfig, User } from '../types/ApiTypes';
import { parseError } from '../types/ErrorTypes';

// ========================
// LOGIN
// ========================

export const loginThunk = createAsyncThunk<LoginResponse, LoginRequest, ThunkApiConfig>(
  'auth/loginThunk',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AuthService.login(credentials);
      // On successful login, set token for API client and store it
      setAuthToken(response.accessToken);
      localStorage.setItem('authToken', response.accessToken);
      return response;
    } catch (error) {
      // Ensure token is cleared on failure
      setAuthToken(null);
      localStorage.removeItem('authToken');
      return rejectWithValue(parseError(error));
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
      return response;
    } catch (error) {
      // If we can't get user, the token is likely invalid.
      // The slice reducer will handle clearing the state.
      // We also clear it from storage here.
      setAuthToken(null);
      localStorage.removeItem('authToken');
      return rejectWithValue(parseError(error));
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
      // Always clear local token first
      localStorage.removeItem('authToken');
      setAuthToken(null);
      await AuthService.logout();
    } catch (error) {
      // The local state is already cleared, just report the error
      return rejectWithValue(parseError(error));
    }
  },
);
