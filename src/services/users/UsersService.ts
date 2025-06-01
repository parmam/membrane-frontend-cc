// src/services/users/UsersService.ts
import apiClient from '../apiClient';
import {
  GetUsersQueryParams,
  HasPermissionToRequestDto,
  HasPermissionToResponseDto,
  PaginatedUsersResponseDto,
  SearchUserByCredentialsRequestDto,
  SearchUserByCredentialsResponseDto,
  StoreUserRequestDto,
  UpdateUserRequestDto,
  UserDetailsDto,
} from './Users.types';

const USERS_BASE_URL = '/user'; // From Swagger

export const UsersService = {
  listUsers: async (params?: GetUsersQueryParams): Promise<PaginatedUsersResponseDto> => {
    const response = await apiClient.get<PaginatedUsersResponseDto>(USERS_BASE_URL, { params });
    return response.data;
  },

  createUser: async (userData: StoreUserRequestDto): Promise<UserDetailsDto> => {
    const response = await apiClient.post<UserDetailsDto>(USERS_BASE_URL, userData);
    return response.data;
  },

  findUserById: async (id: string): Promise<UserDetailsDto> => {
    const response = await apiClient.get<UserDetailsDto>(`${USERS_BASE_URL}/${id}`);
    return response.data;
  },

  updateUser: async (id: string, updateData: UpdateUserRequestDto): Promise<UserDetailsDto> => {
    const response = await apiClient.put<UserDetailsDto>(`${USERS_BASE_URL}/${id}`, updateData);
    return response.data;
  },

  deleteUser: async (id: string): Promise<void> => {
    await apiClient.delete(`${USERS_BASE_URL}/${id}`);
  },

  restoreUser: async (id: string): Promise<UserDetailsDto> => {
    const response = await apiClient.put<UserDetailsDto>(`${USERS_BASE_URL}/${id}/restore`);
    return response.data;
  },

  userHasPermissionTo: async (
    id: string,
    permissionData: HasPermissionToRequestDto,
  ): Promise<HasPermissionToResponseDto> => {
    const response = await apiClient.post<HasPermissionToResponseDto>(
      `${USERS_BASE_URL}/${id}/hasPermissionTo`,
      permissionData,
    );
    return response.data;
  },

  searchUserByCredentials: async (
    credentials: SearchUserByCredentialsRequestDto,
  ): Promise<SearchUserByCredentialsResponseDto> => {
    const response = await apiClient.post<SearchUserByCredentialsResponseDto>(
      `${USERS_BASE_URL}/searchByCredentials`,
      credentials,
    );
    return response.data;
  },
};
