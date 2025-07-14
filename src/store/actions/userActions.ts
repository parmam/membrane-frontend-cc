// src/store/actions/userActions.ts
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
import { parseError } from '../types/ErrorTypes';

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
    return rejectWithValue(parseError(error));
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
      return rejectWithValue(parseError(error));
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
      return rejectWithValue(parseError(error));
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
    return rejectWithValue(parseError(error));
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
      return rejectWithValue(parseError(error));
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
      return rejectWithValue(parseError(error));
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
    return rejectWithValue(parseError(error));
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
    return rejectWithValue(parseError(error));
  }
});
