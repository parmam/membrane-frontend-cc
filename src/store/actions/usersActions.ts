// src/store/actions/usersActions.ts
import {
  GetUsersQueryParams,
  // UserListItemDto, // Not directly used
  PaginatedUsersResponseDto,
  StoreUserRequestDto,
  UpdateUserRequestDto,
  UserDetailsDto,
} from '@/services/users/Users.types';
import { UsersService } from '@/services/users/UsersService';
import {
  UserListModel,
  UserModel,
  convertUserDetailDtoToModel,
  convertUserListItemDtoToModel,
} from '@/services/users/convertToUser';

import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  createUserSuccess,
  deleteUserSuccess,
  getUserSuccess,
  listUsersSuccess,
  updateUserSuccess,
  usersRequestFailure,
  usersRequestStart,
} from '../reducers/usersSlice';

// Thunk to fetch a list of users (paginated)
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (params: GetUsersQueryParams = {}, { dispatch }) => {
    dispatch(usersRequestStart());
    try {
      const response: PaginatedUsersResponseDto = await UsersService.listUsers(params);
      const userListModels: UserListModel[] = response.data.map(convertUserListItemDtoToModel);
      dispatch(
        listUsersSuccess({
          users: userListModels,
          total: response.total,
          page: (params.offset || 0) / (params.limit || 10) + 1, // Calculate current page
          pageSize: params.limit || 10,
        }),
      );
      return { users: userListModels, total: response.total };
    } catch (error: unknown) {
      // Changed from any to unknown
      let errorMessage = 'Failed to fetch users';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(usersRequestFailure(errorMessage));
      throw error;
    }
  },
);

// Thunk to fetch a single user's details
export const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async (userId: string, { dispatch }) => {
    dispatch(usersRequestStart());
    try {
      const userDto: UserDetailsDto = await UsersService.findUserById(userId);
      const userModel: UserModel = convertUserDetailDtoToModel(userDto);
      dispatch(getUserSuccess(userModel));
      return userModel;
    } catch (error: unknown) {
      // Changed from any to unknown
      let errorMessage = 'Failed to fetch user details';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(usersRequestFailure(errorMessage));
      throw error;
    }
  },
);

// Thunk to create a new user
export const createUser = createAsyncThunk(
  'users/createUser',
  async (userData: StoreUserRequestDto, { dispatch }) => {
    dispatch(usersRequestStart());
    try {
      const createdUserDto: UserDetailsDto = await UsersService.createUser(userData);
      const createdUserModel: UserModel = convertUserDetailDtoToModel(createdUserDto);
      dispatch(createUserSuccess(createdUserModel));
      // Optionally, dispatch fetchUsers or another action to update the list
      return createdUserModel;
    } catch (error: unknown) {
      // Changed from any to unknown
      let errorMessage = 'Failed to create user';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(usersRequestFailure(errorMessage));
      throw error;
    }
  },
);

// Thunk to update an existing user
export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (
    { userId, userData }: { userId: string; userData: UpdateUserRequestDto },
    { dispatch },
  ) => {
    dispatch(usersRequestStart());
    try {
      const updatedUserDto: UserDetailsDto = await UsersService.updateUser(userId, userData);
      const updatedUserModel: UserModel = convertUserDetailDtoToModel(updatedUserDto);
      dispatch(updateUserSuccess(updatedUserModel));
      return updatedUserModel;
    } catch (error: unknown) {
      // Changed from any to unknown
      let errorMessage = 'Failed to update user';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(usersRequestFailure(errorMessage));
      throw error;
    }
  },
);

// Thunk to delete a user
export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId: string, { dispatch }) => {
    dispatch(usersRequestStart());
    try {
      await UsersService.deleteUser(userId);
      dispatch(deleteUserSuccess(userId));
      return userId; // Return the ID of the deleted user
    } catch (error: unknown) {
      // Changed from any to unknown
      let errorMessage = 'Failed to delete user';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(usersRequestFailure(errorMessage));
      throw error;
    }
  },
);

// TODO: Add thunks for restoreUser, userHasPermissionTo, searchUserByCredentials if needed for UI state
// For example, userHasPermissionTo might not need global state, or could update a specific part of user state.
// searchUserByCredentials might be a one-off call or could populate a search results list.
