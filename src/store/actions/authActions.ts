// src/store/actions/authActions.ts
import { setAuthToken } from '../../api/client';
import { AuthService } from '../../api/services/authService';
import { LoginRequest, LoginResponse, User } from '../../api/services/authService';
import {
  AUTH_CLEAR_ERROR,
  AUTH_GET_USER_FAILED,
  AUTH_GET_USER_START,
  AUTH_GET_USER_SUCCESS,
  AUTH_LOGIN_FAILED,
  AUTH_LOGIN_START,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT_FAILED,
  AUTH_LOGOUT_START,
  AUTH_LOGOUT_SUCCESS,
  AuthAction,
  AuthThunk,
} from '../types/AuthTypes';
import { parseError } from '../types/ErrorTypes';
import { AppErrorDto } from '../types/ErrorTypes';

// Action Creators
export const loginStart = (): AuthAction => ({ type: AUTH_LOGIN_START });
export const loginSuccess = (response: LoginResponse): AuthAction => ({
  type: AUTH_LOGIN_SUCCESS,
  payload: { token: response.accessToken, user: response.user },
});
export const loginFailed = (error: AppErrorDto): AuthAction => ({
  type: AUTH_LOGIN_FAILED,
  payload: { error },
});

export const getUserStart = (): AuthAction => ({ type: AUTH_GET_USER_START });
export const getUserSuccess = (user: User): AuthAction => ({
  type: AUTH_GET_USER_SUCCESS,
  payload: { user },
});
export const getUserFailed = (error: AppErrorDto): AuthAction => ({
  type: AUTH_GET_USER_FAILED,
  payload: { error },
});

export const logoutStart = (): AuthAction => ({ type: AUTH_LOGOUT_START });
export const logoutSuccess = (): AuthAction => ({ type: AUTH_LOGOUT_SUCCESS });
export const logoutFailed = (error: AppErrorDto): AuthAction => ({
  type: AUTH_LOGOUT_FAILED,
  payload: { error },
});

export const clearAuthError = (): AuthAction => ({ type: AUTH_CLEAR_ERROR });

// Thunks
export const loginThunk =
  (credentials: LoginRequest): AuthThunk =>
  async (dispatch) => {
    dispatch(loginStart());
    try {
      const response = await AuthService.login(credentials);
      setAuthToken(response.accessToken);
      localStorage.setItem('authToken', response.accessToken);
      dispatch(loginSuccess(response));
    } catch (error) {
      setAuthToken(null);
      localStorage.removeItem('authToken');
      dispatch(loginFailed(parseError(error)));
    }
  };

export const getCurrentUserThunk = (): AuthThunk => async (dispatch) => {
  dispatch(getUserStart());
  try {
    const user = await AuthService.getCurrentUser();
    dispatch(getUserSuccess(user));
  } catch (error) {
    setAuthToken(null);
    localStorage.removeItem('authToken');
    dispatch(getUserFailed(parseError(error)));
  }
};

export const logoutThunk = (): AuthThunk => async (dispatch) => {
  dispatch(logoutStart());
  try {
    localStorage.removeItem('authToken');
    setAuthToken(null);
    await AuthService.logout();
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutFailed(parseError(error)));
  }
};
