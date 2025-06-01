// src/services/auth/AuthService.ts
import apiClient from '../apiClient';
import {
  CurrentUserResponseDto,
  LoginRequestDto,
  LoginResponseDto,
  UpdateCurrentUserRequestDto,
  UpdateCurrentUserResponseDto,
} from './Auth.types';

const AUTH_BASE_URL = '/auth'; // From Swagger

export const AuthService = {
  login: async (loginData: LoginRequestDto): Promise<LoginResponseDto> => {
    const response = await apiClient.post<LoginResponseDto>(`${AUTH_BASE_URL}/login`, loginData);
    // Client-side token storage should ideally happen in the Redux action/thunk after this call
    return response.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post(`${AUTH_BASE_URL}/logout`);
    // Client-side token removal should ideally happen in the Redux action/thunk
  },

  getCurrentUser: async (): Promise<CurrentUserResponseDto> => {
    const response = await apiClient.get<CurrentUserResponseDto>(`${AUTH_BASE_URL}/user`);
    return response.data;
  },

  updateCurrentUser: async (
    updateData: UpdateCurrentUserRequestDto,
  ): Promise<UpdateCurrentUserResponseDto> => {
    const response = await apiClient.patch<UpdateCurrentUserResponseDto>(
      `${AUTH_BASE_URL}/user`,
      updateData,
    );
    return response.data;
  },
};
