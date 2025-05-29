// src/store/actions/authActions.ts
import {
  LoginRequestDto,
  UpdateCurrentUserRequestDto,
  // UserDto // Not directly used in this file after conversion
} from '@/services/auth/Auth.types';
import { AuthService } from '@/services/auth/AuthService';
import { UserModel, convertUserDtoToModel } from '@/services/auth/convertToAuth';

import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  authRequestFailure,
  authRequestStart,
  loginSuccess,
  logoutSuccess,
  setCurrentUser,
  updateCurrentUserSuccess,
} from '../reducers/authSlice';

// import { AppDispatch } from '../index'; // Not strictly needed for createAsyncThunk's dispatch typing here

// Login User Thunk
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (loginData: LoginRequestDto, { dispatch }) => {
    dispatch(authRequestStart());
    try {
      const loginResponse = await AuthService.login(loginData);
      const userModel = convertUserDtoToModel(loginResponse.user);
      dispatch(loginSuccess({ token: loginResponse.accessToken, user: userModel }));
      return userModel;
    } catch (error: unknown) {
      // Changed from any to unknown
      let errorMessage = 'Login failed';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(authRequestFailure(errorMessage));
      throw error;
    }
  },
);

// Logout User Thunk
export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { dispatch }) => {
  dispatch(authRequestStart());
  try {
    await AuthService.logout();
    dispatch(logoutSuccess());
  } catch (error: unknown) {
    // Changed from any to unknown
    let errorMessage = 'Logout failed';
    if (typeof error === 'object' && error !== null && 'response' in error) {
      const axiosError = error as { response?: { data?: { message?: string } }; message?: string };
      errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    dispatch(authRequestFailure(errorMessage));
    throw error;
  }
});

// Get Current User Thunk
export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { dispatch }) => {
    dispatch(authRequestStart());
    try {
      const userDto = await AuthService.getCurrentUser();
      const userModel = convertUserDtoToModel(userDto);
      dispatch(setCurrentUser(userModel));
      return userModel;
    } catch (error: unknown) {
      // Changed from any to unknown
      let errorMessage = 'Failed to fetch user';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(authRequestFailure(errorMessage));
      throw error;
    }
  },
);

// Update Current User Thunk
export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (updateData: UpdateCurrentUserRequestDto, { dispatch }) => {
    dispatch(authRequestStart());
    try {
      const updatedUserDto = await AuthService.updateCurrentUser(updateData);
      const updatedUserModel = convertUserDtoToModel(updatedUserDto);
      dispatch(updateCurrentUserSuccess(updatedUserModel));
      return updatedUserModel;
    } catch (error: unknown) {
      // Changed from any to unknown
      let errorMessage = 'Failed to update profile';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(authRequestFailure(errorMessage));
      throw error;
    }
  },
);

// A version of login that does not use createAsyncThunk, for more control (alternative example)
// import { AppDispatch } from '../index';
// export const loginUserManual = (loginData: LoginRequestDto) => async (dispatch: AppDispatch) => {
//   dispatch(authRequestStart());
//   try {
//     const loginResponse = await AuthService.login(loginData);
//     const userModel = convertUserDtoToModel(loginResponse.user);
//     dispatch(loginSuccess({ token: loginResponse.accessToken, user: userModel }));
//   } catch (error: unknown) { // Changed from any to unknown
//     let errorMessage = 'Login failed';
//       if (typeof error === 'object' && error !== null && 'response' in error) {
//         const axiosError = error as { response?: { data?: { message?: string } }, message?: string };
//         errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
//       } else if (error instanceof Error) {
//         errorMessage = error.message;
//       }
//     dispatch(authRequestFailure(errorMessage));
//   }
// };
