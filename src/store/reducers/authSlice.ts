// src/store/reducers/authSlice.ts
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { getCurrentUserThunk, loginThunk, logoutThunk } from '../actions/authActions';
import type { LoginResponse, User } from '../types/ApiTypes';
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
  error: string | null;
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
  token: localStorage.getItem('authToken'),
  isAuthenticated: !!localStorage.getItem('authToken'),
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

    // Set token manually (for token refresh scenarios)
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
      if (action.payload) {
        localStorage.setItem('authToken', action.payload);
      } else {
        localStorage.removeItem('authToken');
      }
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
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;

        // Store token in localStorage
        localStorage.setItem('authToken', action.payload.token);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading.loginThunk = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = action.payload || 'Login failed';

        // Clear token from localStorage
        localStorage.removeItem('authToken');
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
        state.error = action.payload || 'Failed to get current user';

        // If getting current user fails, token might be invalid
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        localStorage.removeItem('authToken');
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

        // Clear token from localStorage
        localStorage.removeItem('authToken');
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.loading.logoutThunk = false;
        state.error = action.payload || 'Logout failed';

        // Even if logout fails, clear local state
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        localStorage.removeItem('authToken');
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
