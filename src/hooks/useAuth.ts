import { AppDispatch, RootState } from '@/store';
import { getCurrentUserThunk, loginThunk, logoutThunk } from '@/store/actions/authActions';
import { createUserThunk, updateUserThunk } from '@/store/actions/userActions';
import { CreateUserRequest, LoginRequest, UpdateUserRequest } from '@/store/types/ApiTypes';

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: RootState) => state.auth);

  const login = useCallback(
    async (credentials: LoginRequest) => {
      return dispatch(loginThunk(credentials));
    },
    [dispatch],
  );

  const register = useCallback(
    async (registerData: CreateUserRequest) => {
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

  const getCurrentUser = useCallback(async () => {
    return dispatch(getCurrentUserThunk());
  }, [dispatch]);

  const updateProfile = useCallback(
    async (updateData: { id: string; userData: UpdateUserRequest }) => {
      return dispatch(updateUserThunk(updateData));
    },
    [dispatch],
  );

  return {
    // State
    user: authState.user,
    token: authState.token,
    loading: authState.loading,
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
