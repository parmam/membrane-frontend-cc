import { apiClient as client } from '../client';
import { components, operations } from '../types';

export const RoleService = {
  async getRoles(params: operations['RoleController_index']['parameters']['query'] = {}) {
    const response = await client.GET('/role', { params: { query: params } });
    return response.data;
  },

  async getRoleById(id: string) {
    const response = await client.GET('/role/{id}', { params: { path: { id } } });
    return response.data;
  },

  async createRole(roleData: components['schemas']['StoreRoleRequest']) {
    const response = await client.POST('/role', { body: roleData });
    return response.data;
  },

  async updateRole(id: string, roleData: components['schemas']['UpdateRoleRequest']) {
    const response = await client.PUT('/role/{id}', { params: { path: { id } }, body: roleData });
    return response.data;
  },

  async deleteRole(id: string) {
    const response = await client.DELETE('/role/{id}', { params: { path: { id } } });
    return response.data;
  },

  async restoreRole(id: string) {
    const response = await client.PUT('/role/{id}/restore', { params: { path: { id } } });
    return response.data;
  },
};
