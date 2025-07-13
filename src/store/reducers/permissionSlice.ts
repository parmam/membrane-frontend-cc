// src/store/reducers/permissionSlice.ts
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { getPermissionsThunk } from '../actions/permissionActions';
import type { Permission } from '../types/ApiTypes';
import type { PermissionLoadingState } from '../types/LoadingTypes';

// ========================
// STATE INTERFACE
// ========================

export interface PermissionState {
  // Data
  permissions: Permission[];

  // Loading states
  loading: PermissionLoadingState;

  // Error state
  error: string | null;
}

// ========================
// INITIAL STATE
// ========================

const initialLoadingState: PermissionLoadingState = {
  getPermissionsThunk: false,
};

const initialState: PermissionState = {
  permissions: [],
  loading: initialLoadingState,
  error: null,
};

// ========================
// SLICE
// ========================

const permissionSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Reset state
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    // ========================
    // GET PERMISSIONS
    // ========================
    builder
      .addCase(getPermissionsThunk.pending, (state) => {
        state.loading.getPermissionsThunk = true;
        state.error = null;
      })
      .addCase(getPermissionsThunk.fulfilled, (state, action: PayloadAction<Permission[]>) => {
        state.loading.getPermissionsThunk = false;
        state.permissions = action.payload;
        state.error = null;
      })
      .addCase(getPermissionsThunk.rejected, (state, action) => {
        state.loading.getPermissionsThunk = false;
        state.error = action.payload || 'Failed to fetch permissions';
      });
  },
});

// ========================
// ACTIONS & SELECTORS
// ========================

export const { clearError, resetState } = permissionSlice.actions;

// Selectors
export const selectPermissions = (state: { permissions: PermissionState }) =>
  state.permissions.permissions;
export const selectPermissionLoading = (state: { permissions: PermissionState }) =>
  state.permissions.loading;
export const selectPermissionError = (state: { permissions: PermissionState }) =>
  state.permissions.error;

export default permissionSlice.reducer;
