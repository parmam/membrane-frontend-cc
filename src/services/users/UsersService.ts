// src/services/users/UsersService.ts
import apiClient from '../apiClient';
import {
  PaginatedUsersResponseDto,
  UserDetailsDto,
  StoreUserRequestDto,
  UpdateUserRequestDto,
  HasPermissionToRequestDto,
  HasPermissionToResponseDto,
  SearchUserByCredentialsRequestDto,
  SearchUserByCredentialsResponseDto,
  GetUsersQueryParams
} from './Users.types';

const USERS_BASE_URL = '/user'; // From Swagger

export const UsersService = {
  /**
   * List users with pagination and filtering.
   * Corresponds to: GET /user
   */
  listUsers: async (params?: GetUsersQueryParams): Promise<PaginatedUsersResponseDto> => {
    const response = await apiClient.get<PaginatedUsersResponseDto>(USERS_BASE_URL, { params });
    return response.data;
  },

  /**
   * Create a new user.
   * Corresponds to: POST /user
   */
  createUser: async (userData: StoreUserRequestDto): Promise<UserDetailsDto> => {
    // Assuming API returns the created user details
    const response = await apiClient.post<UserDetailsDto>(USERS_BASE_URL, userData);
    return response.data;
  },

  /**
   * Find a user by their ID.
   * Corresponds to: GET /user/{id}
   */
  findUserById: async (id: string): Promise<UserDetailsDto> => {
    const response = await apiClient.get<UserDetailsDto>(`${USERS_BASE_URL}/${id}`);
    return response.data;
  },

  /**
   * Update an existing user.
   * Corresponds to: PUT /user/{id}
   */
  updateUser: async (id: string, updateData: UpdateUserRequestDto): Promise<UserDetailsDto> => {
    // Assuming API returns the updated user details
    const response = await apiClient.put<UserDetailsDto>(`${USERS_BASE_URL}/${id}`, updateData);
    return response.data;
  },

  /**
   * Delete a user.
   * Corresponds to: DELETE /user/{id}
   */
  deleteUser: async (id: string): Promise<void> => {
    // Swagger indicates 204 No Content response
    await apiClient.delete(`${USERS_BASE_URL}/${id}`);
  },

  /**
   * Restore a soft-deleted user.
   * Corresponds to: PUT /user/{id}/restore
   */
  restoreUser: async (id: string): Promise<UserDetailsDto> => {
    // Assuming API returns the restored user details
    const response = await apiClient.put<UserDetailsDto>(`${USERS_BASE_URL}/${id}/restore`);
    return response.data;
  },

  /**
   * Check if a user has a specific permission.
   * Corresponds to: POST /user/{id}/hasPermissionTo
   */
  userHasPermissionTo: async (id: string, permissionData: HasPermissionToRequestDto): Promise<HasPermissionToResponseDto> => {
    const response = await apiClient.post<HasPermissionToResponseDto>(`${USERS_BASE_URL}/${id}/hasPermissionTo`, permissionData);
    return response.data;
  },

  /**
   * Search for a user by credentials.
   * (Note: This endpoint seems unusual for a typical frontend flow if auth tokens are used.
   *  It might be for specific admin/backend tasks. Included as per Swagger.)
   * Corresponds to: POST /user/searchByCredentials
   */
  searchUserByCredentials: async (credentials: SearchUserByCredentialsRequestDto): Promise<SearchUserByCredentialsResponseDto> => {
    const response = await apiClient.post<SearchUserByCredentialsResponseDto>(`${USERS_BASE_URL}/searchByCredentials`, credentials);
    return response.data;
  },
};
