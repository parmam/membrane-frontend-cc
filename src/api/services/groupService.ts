// src/api/services/groupService.ts
import { apiClient as client } from '../client';
import { components, operations } from '../types';

export const GroupService = {
  async getGroups(params?: operations['GroupController_index']['parameters']['query']) {
    const response = await client.GET('/group', { params: { query: params } });
    return response.data;
  },

  async getGroupById(id: string) {
    const response = await client.GET('/group/{id}', { params: { path: { id } } });
    return response.data;
  },

  async createGroup(groupData: components['schemas']['StoreGroupRequest']) {
    const response = await client.POST('/group', { body: groupData });
    return response.data;
  },

  async updateGroup(id: string, groupData: components['schemas']['UpdateGroupRequest']) {
    const response = await client.PUT('/group/{id}', {
      params: { path: { id } },
      body: groupData,
    });
    return response.data;
  },

  async deleteGroup(id: string) {
    const response = await client.DELETE('/group/{id}', { params: { path: { id } } });
    return response.data;
  },

  async restoreGroup(id: string) {
    const response = await client.PUT('/group/{id}/restore', { params: { path: { id } } });
    return response.data;
  },
};
