// src/services/roles/RolesService.ts
import apiClient from '../apiClient';
import {
  PaginatedRolesResponseDto,
  RoleDetailsDto,
  StoreRoleRequestDto,
  UpdateRoleRequestDto,
  GetRolesQueryParams
} from './Roles.types';

const ROLES_BASE_URL = '/role'; // From Swagger

export const RolesService = {
  /**
   * List roles with pagination and filtering.
   * Corresponds to: GET /role
   */
  listRoles: async (params?: GetRolesQueryParams): Promise<PaginatedRolesResponseDto> => {
    const response = await apiClient.get<PaginatedRolesResponseDto>(ROLES_BASE_URL, { params });
    return response.data;
  },

  /**
   * Create a new role.
   * Corresponds to: POST /role
   */
  createRole: async (roleData: StoreRoleRequestDto): Promise<RoleDetailsDto> => {
    // Assuming API returns the created role details
    const response = await apiClient.post<RoleDetailsDto>(ROLES_BASE_URL, roleData);
    return response.data;
  },

  /**
   * Find a role by its ID.
   * Corresponds to: GET /role/{id}
   */
  findRoleById: async (id: string): Promise<RoleDetailsDto> => {
    const response = await apiClient.get<RoleDetailsDto>(`${ROLES_BASE_URL}/${id}`);
    return response.data;
  },

  /**
   * Update an existing role.
   * Corresponds to: PUT /role/{id}
   */
  updateRole: async (id: string, updateData: UpdateRoleRequestDto): Promise<RoleDetailsDto> => {
    // Assuming API returns the updated role details
    const response = await apiClient.put<RoleDetailsDto>(`${ROLES_BASE_URL}/${id}`, updateData);
    return response.data;
  },

  /**
   * Delete a role.
   * Corresponds to: DELETE /role/{id}
   */
  deleteRole: async (id: string): Promise<void> => {
    // Swagger indicates 204 No Content response
    await apiClient.delete(`${ROLES_BASE_URL}/${id}`);
  },

  /**
   * Restore a soft-deleted role.
   * Corresponds to: PUT /role/{id}/restore
   */
  restoreRole: async (id: string): Promise<RoleDetailsDto> => {
    // Assuming API returns the restored role details
    const response = await apiClient.put<RoleDetailsDto>(`${ROLES_BASE_URL}/${id}/restore`);
    return response.data;
  },
};
