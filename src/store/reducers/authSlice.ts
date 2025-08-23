// src/store/reducers/authReducer.ts
import { Reducer } from 'redux';

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
  AuthState,
  AuthStatus,
  initialAuthState,
} from '../types/AuthTypes';

export const authReducer: Reducer<AuthState, AuthAction> = (state = initialAuthState, action) => {
  switch (action.type) {
    case AUTH_LOGIN_START:
      return { ...state, status: AuthStatus.LoggingIn, error: null };
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        status: AuthStatus.Success,
      };
    case AUTH_LOGIN_FAILED:
      return { ...state, status: AuthStatus.Failed, error: action.payload.error };

    case AUTH_GET_USER_START:
      return { ...state, status: AuthStatus.FetchingUser, error: null };
    case AUTH_GET_USER_SUCCESS:
      return { ...state, user: action.payload.user, status: AuthStatus.Success };
    case AUTH_GET_USER_FAILED:
      return { ...state, status: AuthStatus.Failed, error: action.payload.error };

    case AUTH_LOGOUT_START:
      return { ...state, status: AuthStatus.LoggingOut, error: null };
    case AUTH_LOGOUT_SUCCESS:
      return { ...state, token: null, user: null, status: AuthStatus.Initial };
    case AUTH_LOGOUT_FAILED:
      return { ...state, status: AuthStatus.Failed, error: action.payload.error };

    case AUTH_CLEAR_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};
