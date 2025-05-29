// src/store/reducers/authSlice.ts
import { UserDto } from '@/services/auth/Auth.types';
// Assuming path alias '@/' for src
import { UserModel } from '@/services/auth/convertToAuth';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// Or use UserDto directly if no transformation

export interface AuthState {
  user: UserModel | null; // Or UserDto | null
  token: string | null;
  isLoading: boolean;
  error: string | null;
  // isAuthenticated: boolean; // Can be derived from token != null
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('authToken'), // Initialize token from localStorage
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authRequestStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ token: string; user: UserModel }>) => {
      // Or user: UserDto
      state.isLoading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem('authToken', action.payload.token);
      state.error = null;
    },
    authRequestFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.user = null;
      state.token = null;
      localStorage.removeItem('authToken');
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.error = null;
      localStorage.removeItem('authToken');
    },
    setCurrentUser: (state, action: PayloadAction<UserModel>) => {
      // Or UserDto
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    updateCurrentUserSuccess: (state, action: PayloadAction<UserModel>) => {
      // Or UserDto
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    },
  },
  // extraReducers will be added here later to handle async thunks if not using these manual reducers
});

export const {
  authRequestStart,
  loginSuccess,
  authRequestFailure,
  logoutSuccess,
  setCurrentUser,
  updateCurrentUserSuccess,
} = authSlice.actions;

export default authSlice.reducer;
