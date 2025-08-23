import { getCurrentUserThunk, loginThunk, logoutThunk } from '@/store/actions/authActions';
import { createUserThunk, updateUserThunk } from '@/store/actions/userActions';
import { CreateUserRequest, LoginRequest, UpdateUserRequest } from '@/store/types/ApiTypes';
import { AuthStatus } from '@/store/types/AuthTypes';

import { useCallback } from 'react';

import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);

  const login = useCallback(
    (credentials: LoginRequest) => {
      return dispatch(loginThunk(credentials));
    },
    [dispatch],
  );

  const register = useCallback(
    (registerData: CreateUserRequest) => {
      return dispatch(createUserThunk(registerData));
    },
    [dispatch],
  );

  const logout = useCallback(async () => {
    try {
      await dispatch(logoutThunk());
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, [dispatch]);

  const getCurrentUser = useCallback(() => {
    return dispatch(getCurrentUserThunk());
  }, [dispatch]);

  const updateProfile = useCallback(
    (id: string, userData: UpdateUserRequest) => {
      return dispatch(updateUserThunk(id, userData));
    },
    [dispatch],
  );

  const isLoading =
    authState.status === AuthStatus.LoggingIn ||
    authState.status === AuthStatus.FetchingUser ||
    authState.status === AuthStatus.LoggingOut;

  return {
    // State
    user: authState.user,
    token: authState.token,
    status: authState.status,
    isLoading,
    error: authState.error,
    isAuthenticated: !!authState.token,

    // Actions
    login,
    register,
    logout,
    getCurrentUser,
    updateProfile,
  };
};
