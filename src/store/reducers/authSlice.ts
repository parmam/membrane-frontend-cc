// src/store/reducers/authSlice.ts
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { getCurrentUserThunk, loginThunk, logoutThunk } from '../actions/authActions';
import type { LoginResponse, User } from '../types/ApiTypes';
import { AppErrorDto } from '../types/ErrorTypes';
import type { AuthLoadingState } from '../types/LoadingTypes';

// ========================
// STATE INTERFACE
// ========================

export interface AuthState {
  // Data
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;

  // Loading states
  loading: AuthLoadingState;

  // Error state
  error: AppErrorDto | null;
}

// ========================
// INITIAL STATE
// ========================

const initialLoadingState: AuthLoadingState = {
  loginThunk: false,
  getCurrentUserThunk: false,
  logoutThunk: false,
};

const initialState: AuthState = {
  user: null,
  token: null, // Token will be loaded from localStorage via an action
  isAuthenticated: false,
  loading: initialLoadingState,
  error: null,
};

// ========================
// SLICE
// ========================

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Clear user data
    clearUser: (state) => {
      state.user = null;
    },

    // Set token manually (for loading from storage or refresh scenarios)
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
    },

    // Reset state (for logout)
    resetState: () => ({
      ...initialState,
      token: null,
      isAuthenticated: false,
    }),
  },
  extraReducers: (builder) => {
    // ========================
    // LOGIN
    // ========================
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading.loginThunk = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.loading.loginThunk = false;
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading.loginThunk = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = action.payload ?? null;
      })

      // ========================
      // GET CURRENT USER
      // ========================
      .addCase(getCurrentUserThunk.pending, (state) => {
        state.loading.getCurrentUserThunk = true;
        state.error = null;
      })
      .addCase(getCurrentUserThunk.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading.getCurrentUserThunk = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getCurrentUserThunk.rejected, (state, action) => {
        state.loading.getCurrentUserThunk = false;
        state.error = action.payload ?? null;

        // If getting current user fails, token might be invalid
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })

      // ========================
      // LOGOUT
      // ========================
      .addCase(logoutThunk.pending, (state) => {
        state.loading.logoutThunk = true;
        state.error = null;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.loading.logoutThunk = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.loading.logoutThunk = false;
        state.error = action.payload ?? null;

        // Even if logout fails, clear local state
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

// ========================
// ACTIONS & SELECTORS
// ========================

export const { clearError, clearUser, setToken, resetState } = authSlice.actions;

// Selectors
export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;
export const selectAuthToken = (state: { auth: AuthState }) => state.auth.token;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectAuthLoading = (state: { auth: AuthState }) => state.auth.loading;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;

export default authSlice.reducer;
