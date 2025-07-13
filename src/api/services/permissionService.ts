import { apiClient as client } from '../client';
import { operations } from '../types';

export const PermissionService = {
  async getPermissions(params?: operations['PermissionController_index']['parameters']['query']) {
    const response = await client.GET('/permission', { params: { query: params } });
    return response.data;
  },
};
