// src/services/auth/AuthService.ts
import apiClient from '../apiClient';
import {
  LoginRequestDto,
  LoginResponseDto,
  CurrentUserResponseDto,
  UpdateCurrentUserRequestDto,
  UpdateCurrentUserResponseDto,
  UserDto
} from './Auth.types';

const AUTH_BASE_URL = '/auth'; // From Swagger

export const AuthService = {
  /**
   * Login to the system.
   * Corresponds to: POST /auth/login
   */
  login: async (loginData: LoginRequestDto): Promise<LoginResponseDto> => {
    const response = await apiClient.post<LoginResponseDto>(`${AUTH_BASE_URL}/login`, loginData);
    // TODO: Handle successful login, e.g., store token from response.data.accessToken
    // localStorage.setItem('authToken', response.data.accessToken);
    return response.data;
  },

  /**
   * Logout the current user.
   * Corresponds to: POST /auth/logout
   */
  logout: async (): Promise<void> => {
    // According to Swagger, POST /auth/logout has no request body and a 200 response with no content.
    // It requires Authorization header, which should be handled by the interceptor.
    await apiClient.post(`${AUTH_BASE_URL}/logout`);
    // TODO: Handle successful logout, e.g., remove token
    // localStorage.removeItem('authToken');
  },

  /**
   * Get the current authenticated user's information.
   * Corresponds to: GET /auth/user
   */
  getCurrentUser: async (): Promise<CurrentUserResponseDto> => {
    // Requires Authorization header, handled by interceptor.
    const response = await apiClient.get<CurrentUserResponseDto>(`${AUTH_BASE_URL}/user`);
    return response.data;
  },

  /**
   * Update the current authenticated user's information.
   * Corresponds to: PATCH /auth/user
   */
  updateCurrentUser: async (updateData: UpdateCurrentUserRequestDto): Promise<UpdateCurrentUserResponseDto> => {
    // Requires Authorization header, handled by interceptor.
    const response = await apiClient.patch<UpdateCurrentUserResponseDto>(`${AUTH_BASE_URL}/user`, updateData);
    return response.data;
  },
};

// Example DTO converter (if needed, can be in a separate convertToAuthDto.ts file)
// For instance, if UpdateCurrentUserRequestDto needed transformation from a frontend form model:
// export interface UpdateCurrentUserForm { ... }
// export function convertUpdateFormToDto(form: UpdateCurrentUserForm): UpdateCurrentUserRequestDto { ... }
