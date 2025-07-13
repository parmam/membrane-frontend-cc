// src/store/reducers/roleSlice.ts
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  createRoleThunk,
  deleteRoleThunk,
  getRoleByIdThunk,
  getRolesThunk,
  restoreRoleThunk,
  updateRoleThunk,
} from '../actions/roleActions';
import type { PaginatedResponse, Role } from '../types/ApiTypes';
import type { RoleLoadingState } from '../types/LoadingTypes';

// ========================
// STATE INTERFACE
// ========================

export interface RoleState {
  // Data
  roles: Role[];
  selectedRole: Role | null;

  // Pagination
  total: number;
  currentPage: number;
  pageSize: number;

  // Loading states
  loading: RoleLoadingState;

  // Error state
  error: string | null;
}

// ========================
// INITIAL STATE
// ========================

const initialLoadingState: RoleLoadingState = {
  getRolesThunk: false,
  getRoleByIdThunk: false,
  createRoleThunk: false,
  updateRoleThunk: false,
  deleteRoleThunk: false,
  restoreRoleThunk: false,
};

const initialState: RoleState = {
  roles: [],
  selectedRole: null,
  total: 0,
  currentPage: 1,
  pageSize: 10,
  loading: initialLoadingState,
  error: null,
};

// ========================
// SLICE
// ========================

const roleSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Clear selected role
    clearSelectedRole: (state) => {
      state.selectedRole = null;
    },

    // Reset state
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    // ========================
    // GET ROLES
    // ========================
    builder
      .addCase(getRolesThunk.pending, (state) => {
        state.loading.getRolesThunk = true;
        state.error = null;
      })
      .addCase(getRolesThunk.fulfilled, (state, action: PayloadAction<PaginatedResponse<Role>>) => {
        state.loading.getRolesThunk = false;
        state.roles = action.payload.data;
        state.total = action.payload.total;
        state.currentPage = Math.floor(action.payload.offset / action.payload.limit) + 1;
        state.pageSize = action.payload.limit;
        state.error = null;
      })
      .addCase(getRolesThunk.rejected, (state, action) => {
        state.loading.getRolesThunk = false;
        state.error = action.payload || 'Failed to fetch roles';
      })

      // ========================
      // GET ROLE BY ID
      // ========================
      .addCase(getRoleByIdThunk.pending, (state) => {
        state.loading.getRoleByIdThunk = true;
        state.error = null;
      })
      .addCase(getRoleByIdThunk.fulfilled, (state, action: PayloadAction<Role>) => {
        state.loading.getRoleByIdThunk = false;
        state.selectedRole = action.payload;
        state.error = null;
      })
      .addCase(getRoleByIdThunk.rejected, (state, action) => {
        state.loading.getRoleByIdThunk = false;
        state.error = action.payload || 'Failed to fetch role';
      })

      // ========================
      // CREATE ROLE
      // ========================
      .addCase(createRoleThunk.pending, (state) => {
        state.loading.createRoleThunk = true;
        state.error = null;
      })
      .addCase(createRoleThunk.fulfilled, (state, action: PayloadAction<Role>) => {
        state.loading.createRoleThunk = false;
        state.roles.unshift(action.payload);
        state.selectedRole = action.payload;
        state.total += 1;
        state.error = null;
      })
      .addCase(createRoleThunk.rejected, (state, action) => {
        state.loading.createRoleThunk = false;
        state.error = action.payload || 'Failed to create role';
      })

      // ========================
      // UPDATE ROLE
      // ========================
      .addCase(updateRoleThunk.pending, (state) => {
        state.loading.updateRoleThunk = true;
        state.error = null;
      })
      .addCase(updateRoleThunk.fulfilled, (state, action: PayloadAction<Role>) => {
        state.loading.updateRoleThunk = false;
        const index = state.roles.findIndex((role) => role.id === action.payload.id);
        if (index !== -1) {
          state.roles[index] = action.payload;
        }
        if (state.selectedRole?.id === action.payload.id) {
          state.selectedRole = action.payload;
        }
        state.error = null;
      })
      .addCase(updateRoleThunk.rejected, (state, action) => {
        state.loading.updateRoleThunk = false;
        state.error = action.payload || 'Failed to update role';
      })

      // ========================
      // DELETE ROLE
      // ========================
      .addCase(deleteRoleThunk.pending, (state) => {
        state.loading.deleteRoleThunk = true;
        state.error = null;
      })
      .addCase(deleteRoleThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading.deleteRoleThunk = false;
        state.roles = state.roles.filter((role) => role.id !== action.payload);
        if (state.selectedRole?.id === action.payload) {
          state.selectedRole = null;
        }
        state.total -= 1;
        state.error = null;
      })
      .addCase(deleteRoleThunk.rejected, (state, action) => {
        state.loading.deleteRoleThunk = false;
        state.error = action.payload || 'Failed to delete role';
      })

      // ========================
      // RESTORE ROLE
      // ========================
      .addCase(restoreRoleThunk.pending, (state) => {
        state.loading.restoreRoleThunk = true;
        state.error = null;
      })
      .addCase(restoreRoleThunk.fulfilled, (state, action: PayloadAction<Role>) => {
        state.loading.restoreRoleThunk = false;
        const index = state.roles.findIndex((role) => role.id === action.payload.id);
        if (index !== -1) {
          state.roles[index] = action.payload;
        } else {
          state.roles.unshift(action.payload);
          state.total += 1;
        }
        state.selectedRole = action.payload;
        state.error = null;
      })
      .addCase(restoreRoleThunk.rejected, (state, action) => {
        state.loading.restoreRoleThunk = false;
        state.error = action.payload || 'Failed to restore role';
      });
  },
});

// ========================
// ACTIONS & SELECTORS
// ========================

export const { clearError, clearSelectedRole, resetState } = roleSlice.actions;

// Selectors
export const selectRoles = (state: { roles: RoleState }) => state.roles.roles;
export const selectSelectedRole = (state: { roles: RoleState }) => state.roles.selectedRole;
export const selectRoleLoading = (state: { roles: RoleState }) => state.roles.loading;
export const selectRoleError = (state: { roles: RoleState }) => state.roles.error;
export const selectRolePagination = (state: { roles: RoleState }) => ({
  total: state.roles.total,
  currentPage: state.roles.currentPage,
  pageSize: state.roles.pageSize,
});

export default roleSlice.reducer;
