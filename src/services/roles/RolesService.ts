// src/services/roles/RolesService.ts
import apiClient from '../apiClient';
import {
  GetRolesQueryParams,
  PaginatedRolesResponseDto,
  RoleDetailsDto,
  StoreRoleRequestDto,
  UpdateRoleRequestDto,
} from './Roles.types';

const ROLES_BASE_URL = '/role'; // From Swagger

export const RolesService = {
  listRoles: async (params?: GetRolesQueryParams): Promise<PaginatedRolesResponseDto> => {
    const response = await apiClient.get<PaginatedRolesResponseDto>(ROLES_BASE_URL, { params });
    return response.data;
  },

  createRole: async (roleData: StoreRoleRequestDto): Promise<RoleDetailsDto> => {
    const response = await apiClient.post<RoleDetailsDto>(ROLES_BASE_URL, roleData);
    return response.data;
  },

  findRoleById: async (id: string): Promise<RoleDetailsDto> => {
    const response = await apiClient.get<RoleDetailsDto>(`${ROLES_BASE_URL}/${id}`);
    return response.data;
  },

  updateRole: async (id: string, updateData: UpdateRoleRequestDto): Promise<RoleDetailsDto> => {
    const response = await apiClient.put<RoleDetailsDto>(`${ROLES_BASE_URL}/${id}`, updateData);
    return response.data;
  },

  deleteRole: async (id: string): Promise<void> => {
    await apiClient.delete(`${ROLES_BASE_URL}/${id}`);
  },

  restoreRole: async (id: string): Promise<RoleDetailsDto> => {
    const response = await apiClient.put<RoleDetailsDto>(`${ROLES_BASE_URL}/${id}/restore`);
    return response.data;
  },
};
