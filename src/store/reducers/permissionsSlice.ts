// src/store/reducers/permissionsSlice.ts
import { PermissionDto } from '@/services/permissions/Permissions.types';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// Assuming no specific frontend model transformation is strictly needed for permissions list,
// DTO can be used directly or a simple model can be created if desired.
// For simplicity, using PermissionDto directly in state.

export interface PermissionsState {
  list: PermissionDto[];
  isLoading: boolean;
  error: string | null;
}

const initialState: PermissionsState = {
  list: [],
  isLoading: false,
  error: null,
};

const permissionsSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    permissionsRequestStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    permissionsRequestFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    listPermissionsSuccess: (state, action: PayloadAction<PermissionDto[]>) => {
      state.isLoading = false;
      state.list = action.payload;
      state.error = null;
    },
  },
});

export const { permissionsRequestStart, permissionsRequestFailure, listPermissionsSuccess } =
  permissionsSlice.actions;

export default permissionsSlice.reducer;
