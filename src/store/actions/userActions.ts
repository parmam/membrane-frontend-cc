// src/store/actions/newUserActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';

import { UserService } from '../../api/services';
import type {
  CreateUserRequest,
  HasPermissionRequest,
  PaginatedResponse,
  SearchUserByCredentialsRequest,
  ThunkApiConfig,
  UpdateUserRequest,
  User,
  UserQueryParams,
} from '../types/ApiTypes';

// ========================
// GET USERS (PAGINATED)
// ========================

export const getUsersThunk = createAsyncThunk<
  PaginatedResponse<User>,
  UserQueryParams | undefined,
  ThunkApiConfig
>('users/getUsersThunk', async (params, { rejectWithValue }) => {
  try {
    const response = await UserService.getUsers(params);
    return response as unknown as PaginatedResponse<User>;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch users';
    return rejectWithValue(message);
  }
});

// ========================
// GET USER BY ID
// ========================

export const getUserByIdThunk = createAsyncThunk<User, string, ThunkApiConfig>(
  'users/getUserByIdThunk',
  async (id, { rejectWithValue }) => {
    try {
      const response = await UserService.getUserById(id);
      return response as unknown as User;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch user';
      return rejectWithValue(message);
    }
  },
);

// ========================
// CREATE USER
// ========================

export const createUserThunk = createAsyncThunk<User, CreateUserRequest, ThunkApiConfig>(
  'users/createUserThunk',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await UserService.createUser(userData);
      return response as unknown as User;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create user';
      return rejectWithValue(message);
    }
  },
);

// ========================
// UPDATE USER
// ========================

export const updateUserThunk = createAsyncThunk<
  User,
  { id: string; userData: UpdateUserRequest },
  ThunkApiConfig
>('users/updateUserThunk', async ({ id, userData }, { rejectWithValue }) => {
  try {
    const response = await UserService.updateUser(id, userData);
    return response as unknown as User;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update user';
    return rejectWithValue(message);
  }
});

// ========================
// DELETE USER
// ========================

export const deleteUserThunk = createAsyncThunk<string, string, ThunkApiConfig>(
  'users/deleteUserThunk',
  async (id, { rejectWithValue }) => {
    try {
      await UserService.deleteUser(id);
      return id;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete user';
      return rejectWithValue(message);
    }
  },
);

// ========================
// RESTORE USER
// ========================

export const restoreUserThunk = createAsyncThunk<User, string, ThunkApiConfig>(
  'users/restoreUserThunk',
  async (id, { rejectWithValue }) => {
    try {
      const response = await UserService.restoreUser(id);
      return response as unknown as User;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to restore user';
      return rejectWithValue(message);
    }
  },
);

// ========================
// CHECK USER PERMISSION
// ========================

export const hasPermissionToThunk = createAsyncThunk<
  boolean,
  { id: string; permissionData: HasPermissionRequest },
  ThunkApiConfig
>('users/hasPermissionToThunk', async ({ id, permissionData }, { rejectWithValue }) => {
  try {
    const response = await UserService.hasPermissionTo(id, permissionData);
    return response as unknown as boolean;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to check user permission';
    return rejectWithValue(message);
  }
});

// ========================
// SEARCH USER BY CREDENTIALS
// ========================

export const searchUserByCredentialsThunk = createAsyncThunk<
  User,
  SearchUserByCredentialsRequest,
  ThunkApiConfig
>('users/searchUserByCredentialsThunk', async (credentials, { rejectWithValue }) => {
  try {
    const response = await UserService.searchUserByCredentials(credentials);
    return response as unknown as User;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to search user by credentials';
    return rejectWithValue(message);
  }
});
