import { apiClient as client } from '../client';
import { components, operations } from '../types';

export const UserService = {
  async getUsers(params: operations['UserController_index']['parameters']['query'] = {}) {
    const response = await client.GET('/user', { params: { query: params } });
    return response.data;
  },

  async getUserById(id: string) {
    const response = await client.GET('/user/{id}', { params: { path: { id } } });
    return response.data;
  },

  async createUser(userData: components['schemas']['StoreUserRequest']) {
    const response = await client.POST('/user', { body: userData });
    return response.data;
  },

  async updateUser(id: string, userData: components['schemas']['UpdateUserRequest']) {
    const response = await client.PUT('/user/{id}', { params: { path: { id } }, body: userData });
    return response.data;
  },

  async deleteUser(id: string) {
    const response = await client.DELETE('/user/{id}', { params: { path: { id } } });
    return response.data;
  },

  async restoreUser(id: string) {
    const response = await client.PUT('/user/{id}/restore', { params: { path: { id } } });
    return response.data;
  },

  async hasPermissionTo(
    id: string,
    permissionData: components['schemas']['HasPermissionToRequest'],
  ) {
    const response = await client.POST('/user/{id}/hasPermissionTo', {
      params: { path: { id } },
      body: permissionData,
    });
    return response.data;
  },

  async searchUserByCredentials(
    credentials: components['schemas']['SearchUserByCredentialsRequest'],
  ) {
    const response = await client.POST('/user/searchByCredentials', { body: credentials });
    return response.data;
  },
};
