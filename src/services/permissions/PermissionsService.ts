// src/services/permissions/PermissionsService.ts
import apiClient from '../apiClient';
import { ListPermissionsResponseDto } from './Permissions.types';

const PERMISSIONS_BASE_URL = '/permission';

export const PermissionsService = {
  listPermissions: async (): Promise<ListPermissionsResponseDto> => {
    const response = await apiClient.get<ListPermissionsResponseDto>(PERMISSIONS_BASE_URL);
    return response.data;
  },
};
