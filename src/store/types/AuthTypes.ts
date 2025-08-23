// src/store/types/AuthTypes.ts
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { LoginRequest, LoginResponse, User } from '../../api/services/authService';
import { RootState } from '../index';
import { AppErrorDto } from './ErrorTypes';

export enum AuthStatus {
  Initial = 'INITIAL',
  LoggingIn = 'LOGGING_IN',
  FetchingUser = 'FETCHING_USER',
  LoggingOut = 'LOGGING_OUT',
  Success = 'SUCCESS',
  Failed = 'FAILED',
}

export interface AuthState {
  token: string | null;
  user: User | null;
  status: AuthStatus;
  error: AppErrorDto | null;
}

export const initialAuthState: AuthState = {
  token: null,
  user: null,
  status: AuthStatus.Initial,
  error: null,
};

export const AUTH_LOGIN_START = 'auth/login/start';
export const AUTH_LOGIN_SUCCESS = 'auth/login/success';
export const AUTH_LOGIN_FAILED = 'auth/login/failed';

export const AUTH_GET_USER_START = 'auth/getUser/start';
export const AUTH_GET_USER_SUCCESS = 'auth/getUser/success';
export const AUTH_GET_USER_FAILED = 'auth/getUser/failed';

export const AUTH_LOGOUT_START = 'auth/logout/start';
export const AUTH_LOGOUT_SUCCESS = 'auth/logout/success';
export const AUTH_LOGOUT_FAILED = 'auth/logout/failed';

export const AUTH_CLEAR_ERROR = 'auth/clearError';

export type AuthAction =
  | Action<typeof AUTH_LOGIN_START>
  | { type: typeof AUTH_LOGIN_SUCCESS; payload: { token: string; user: User } }
  | { type: typeof AUTH_LOGIN_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof AUTH_GET_USER_START>
  | { type: typeof AUTH_GET_USER_SUCCESS; payload: { user: User } }
  | { type: typeof AUTH_GET_USER_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof AUTH_LOGOUT_START>
  | Action<typeof AUTH_LOGOUT_SUCCESS>
  | { type: typeof AUTH_LOGOUT_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof AUTH_CLEAR_ERROR>;

export type AuthThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AuthAction>;
