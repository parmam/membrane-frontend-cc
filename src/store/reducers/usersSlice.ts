// src/store/reducers/usersSlice.ts
import { UserDetailsDto, UserListItemDto } from '@/services/users/Users.types';
import { UserListModel, UserModel } from '@/services/users/convertToUser';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// Or use DTOs directly

export interface UsersState {
  list: UserListModel[]; // For paginated lists
  selectedUser: UserModel | null; // For individual user details
  isLoading: boolean;
  error: string | null;
  totalUsers: number; // For pagination
  currentPage: number; // For pagination
  pageSize: number; // For pagination
}

const initialState: UsersState = {
  list: [],
  selectedUser: null,
  isLoading: false,
  error: null,
  totalUsers: 0,
  currentPage: 1,
  pageSize: 10, // Default page size
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersRequestStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    usersRequestFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    listUsersSuccess: (
      state,
      action: PayloadAction<{
        users: UserListModel[];
        total: number;
        page: number;
        pageSize: number;
      }>,
    ) => {
      state.isLoading = false;
      state.list = action.payload.users;
      state.totalUsers = action.payload.total;
      state.currentPage = action.payload.page;
      state.pageSize = action.payload.pageSize;
      state.error = null;
    },
    getUserSuccess: (state, action: PayloadAction<UserModel>) => {
      state.isLoading = false;
      state.selectedUser = action.payload;
      state.error = null;
    },
    createUserSuccess: (state, action: PayloadAction<UserModel>) => {
      state.isLoading = false;
      // Optionally add to list or refetch, for now, just clear error
      // state.list.unshift(action.payload); // Basic add to start
      state.selectedUser = action.payload; // Or set as selected
      state.error = null;
    },
    updateUserSuccess: (state, action: PayloadAction<UserModel>) => {
      state.isLoading = false;
      state.selectedUser = action.payload;
      state.list = state.list.map(
        (user) => (user.id === action.payload.id ? { ...user, ...action.payload } : user), // Update if in list
      );
      state.error = null;
    },
    deleteUserSuccess: (state, action: PayloadAction<string /* userId */>) => {
      state.isLoading = false;
      state.list = state.list.filter((user) => user.id !== action.payload);
      if (state.selectedUser?.id === action.payload) {
        state.selectedUser = null;
      }
      state.error = null;
    },
    // Add other specific actions like restoreUserSuccess if needed
  },
  // Consider using extraReducers for createAsyncThunk actions if preferred
});

export const {
  usersRequestStart,
  usersRequestFailure,
  listUsersSuccess,
  getUserSuccess,
  createUserSuccess,
  updateUserSuccess,
  deleteUserSuccess,
} = usersSlice.actions;

export default usersSlice.reducer;
