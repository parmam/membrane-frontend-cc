// src/store/reducers/userSlice.ts
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  createUserThunk,
  deleteUserThunk,
  getUserByIdThunk,
  getUsersThunk,
  hasPermissionToThunk,
  restoreUserThunk,
  searchUserByCredentialsThunk,
  updateUserThunk,
} from '../actions/userActions';
import type { PaginatedResponse, User } from '../types/ApiTypes';
import type { UserLoadingState } from '../types/LoadingTypes';

// ========================
// STATE INTERFACE
// ========================

export interface UserState {
  // Data
  users: User[];
  selectedUser: User | null;
  searchedUser: User | null;

  // Pagination
  total: number;
  currentPage: number;
  pageSize: number;

  // Loading states
  loading: UserLoadingState;

  // Error state
  error: string | null;

  // Additional states
  hasPermission: boolean | null;
}

// ========================
// INITIAL STATE
// ========================

const initialLoadingState: UserLoadingState = {
  getUsersThunk: false,
  getUserByIdThunk: false,
  createUserThunk: false,
  updateUserThunk: false,
  deleteUserThunk: false,
  restoreUserThunk: false,
  hasPermissionToThunk: false,
  searchUserByCredentialsThunk: false,
};

const initialState: UserState = {
  users: [],
  selectedUser: null,
  searchedUser: null,
  total: 0,
  currentPage: 1,
  pageSize: 10,
  loading: initialLoadingState,
  error: null,
  hasPermission: null,
};

// ========================
// SLICE
// ========================

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Clear selected user
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },

    // Clear searched user
    clearSearchedUser: (state) => {
      state.searchedUser = null;
    },

    // Clear permission result
    clearPermissionResult: (state) => {
      state.hasPermission = null;
    },

    // Reset state
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    // ========================
    // GET USERS
    // ========================
    builder
      .addCase(getUsersThunk.pending, (state) => {
        state.loading.getUsersThunk = true;
        state.error = null;
      })
      .addCase(getUsersThunk.fulfilled, (state, action: PayloadAction<PaginatedResponse<User>>) => {
        state.loading.getUsersThunk = false;
        state.users = action.payload.data;
        state.total = action.payload.total;
        state.currentPage = Math.floor(action.payload.offset / action.payload.limit) + 1;
        state.pageSize = action.payload.limit;
        state.error = null;
      })
      .addCase(getUsersThunk.rejected, (state, action) => {
        state.loading.getUsersThunk = false;
        state.error = action.payload || 'Failed to fetch users';
      })

      // ========================
      // GET USER BY ID
      // ========================
      .addCase(getUserByIdThunk.pending, (state) => {
        state.loading.getUserByIdThunk = true;
        state.error = null;
      })
      .addCase(getUserByIdThunk.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading.getUserByIdThunk = false;
        state.selectedUser = action.payload;
        state.error = null;
      })
      .addCase(getUserByIdThunk.rejected, (state, action) => {
        state.loading.getUserByIdThunk = false;
        state.error = action.payload || 'Failed to fetch user';
      })

      // ========================
      // CREATE USER
      // ========================
      .addCase(createUserThunk.pending, (state) => {
        state.loading.createUserThunk = true;
        state.error = null;
      })
      .addCase(createUserThunk.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading.createUserThunk = false;
        state.users.unshift(action.payload);
        state.selectedUser = action.payload;
        state.total += 1;
        state.error = null;
      })
      .addCase(createUserThunk.rejected, (state, action) => {
        state.loading.createUserThunk = false;
        state.error = action.payload || 'Failed to create user';
      })

      // ========================
      // UPDATE USER
      // ========================
      .addCase(updateUserThunk.pending, (state) => {
        state.loading.updateUserThunk = true;
        state.error = null;
      })
      .addCase(updateUserThunk.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading.updateUserThunk = false;
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
        if (state.selectedUser?.id === action.payload.id) {
          state.selectedUser = action.payload;
        }
        state.error = null;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.loading.updateUserThunk = false;
        state.error = action.payload || 'Failed to update user';
      })

      // ========================
      // DELETE USER
      // ========================
      .addCase(deleteUserThunk.pending, (state) => {
        state.loading.deleteUserThunk = true;
        state.error = null;
      })
      .addCase(deleteUserThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading.deleteUserThunk = false;
        state.users = state.users.filter((user) => user.id !== action.payload);
        if (state.selectedUser?.id === action.payload) {
          state.selectedUser = null;
        }
        state.total -= 1;
        state.error = null;
      })
      .addCase(deleteUserThunk.rejected, (state, action) => {
        state.loading.deleteUserThunk = false;
        state.error = action.payload || 'Failed to delete user';
      })

      // ========================
      // RESTORE USER
      // ========================
      .addCase(restoreUserThunk.pending, (state) => {
        state.loading.restoreUserThunk = true;
        state.error = null;
      })
      .addCase(restoreUserThunk.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading.restoreUserThunk = false;
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        } else {
          state.users.unshift(action.payload);
          state.total += 1;
        }
        state.selectedUser = action.payload;
        state.error = null;
      })
      .addCase(restoreUserThunk.rejected, (state, action) => {
        state.loading.restoreUserThunk = false;
        state.error = action.payload || 'Failed to restore user';
      })

      // ========================
      // HAS PERMISSION TO
      // ========================
      .addCase(hasPermissionToThunk.pending, (state) => {
        state.loading.hasPermissionToThunk = true;
        state.error = null;
      })
      .addCase(hasPermissionToThunk.fulfilled, (state, action: PayloadAction<boolean>) => {
        state.loading.hasPermissionToThunk = false;
        state.hasPermission = action.payload;
        state.error = null;
      })
      .addCase(hasPermissionToThunk.rejected, (state, action) => {
        state.loading.hasPermissionToThunk = false;
        state.error = action.payload || 'Failed to check user permission';
      })

      // ========================
      // SEARCH USER BY CREDENTIALS
      // ========================
      .addCase(searchUserByCredentialsThunk.pending, (state) => {
        state.loading.searchUserByCredentialsThunk = true;
        state.error = null;
      })
      .addCase(searchUserByCredentialsThunk.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading.searchUserByCredentialsThunk = false;
        state.searchedUser = action.payload;
        state.error = null;
      })
      .addCase(searchUserByCredentialsThunk.rejected, (state, action) => {
        state.loading.searchUserByCredentialsThunk = false;
        state.error = action.payload || 'Failed to search user by credentials';
      });
  },
});

// ========================
// ACTIONS & SELECTORS
// ========================

export const {
  clearError,
  clearSelectedUser,
  clearSearchedUser,
  clearPermissionResult,
  resetState,
} = userSlice.actions;

// Selectors
export const selectUsers = (state: { users: UserState }) => state.users.users;
export const selectSelectedUser = (state: { users: UserState }) => state.users.selectedUser;
export const selectSearchedUser = (state: { users: UserState }) => state.users.searchedUser;
export const selectUserLoading = (state: { users: UserState }) => state.users.loading;
export const selectUserError = (state: { users: UserState }) => state.users.error;
export const selectHasPermission = (state: { users: UserState }) => state.users.hasPermission;
export const selectUserPagination = (state: { users: UserState }) => ({
  total: state.users.total,
  currentPage: state.users.currentPage,
  pageSize: state.users.pageSize,
});

export default userSlice.reducer;
