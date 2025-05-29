// src/services/permissions/PermissionsService.ts
import apiClient from '../apiClient';
import { ListPermissionsResponseDto } from './Permissions.types';
// Query params type can be imported if defined:
// import { GetPermissionsQueryParams } from './Permissions.types';

const PERMISSIONS_BASE_URL = '/permission'; // From Swagger

export const PermissionsService = {
  /**
   * List all available permissions.
   * Corresponds to: GET /permission
   */
  listPermissions: async (): Promise<ListPermissionsResponseDto> => {
    // If query parameters were supported:
    // listPermissions: async (params?: GetPermissionsQueryParams): Promise<ListPermissionsResponseDto> => {
    // const response = await apiClient.get<ListPermissionsResponseDto>(PERMISSIONS_BASE_URL, { params });
    
    const response = await apiClient.get<ListPermissionsResponseDto>(PERMISSIONS_BASE_URL);
    return response.data;
  },
};
