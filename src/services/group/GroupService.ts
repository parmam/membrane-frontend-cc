// src/services/group/GroupService.ts
import apiClient from '../apiClient';
import {
  GroupDto,
  PaginatedGroupsResponseDto,
  StoreGroupRequestDto,
  UpdateGroupRequestDto,
  GetGroupsQueryParams
} from './Group.types';

const GROUP_BASE_URL = '/group'; // From Swagger

export const GroupService = {
  /**
   * List groups.
   */
  listGroups: async (params?: GetGroupsQueryParams): Promise<PaginatedGroupsResponseDto> => {
    const response = await apiClient.get<PaginatedGroupsResponseDto>(GROUP_BASE_URL, { params });
    return response.data;
  },

  /**
   * Create a new group.
   */
  createGroup: async (groupData: StoreGroupRequestDto): Promise<GroupDto> => {
    const response = await apiClient.post<GroupDto>(GROUP_BASE_URL, groupData);
    return response.data;
  },

  /**
   * Find a group by ID.
   */
  findGroupById: async (id: string): Promise<GroupDto> => {
    const response = await apiClient.get<GroupDto>(`${GROUP_BASE_URL}/${id}`);
    return response.data;
  },

  /**
   * Update an existing group.
   */
  updateGroup: async (id: string, updateData: UpdateGroupRequestDto): Promise<GroupDto> => {
    const response = await apiClient.put<GroupDto>(`${GROUP_BASE_URL}/${id}`, updateData);
    return response.data;
  },

  /**
   * Delete a group.
   */
  deleteGroup: async (id: string): Promise<void> => {
    await apiClient.delete(`${GROUP_BASE_URL}/${id}`);
  },

  /**
   * Restore a soft-deleted group.
   */
  restoreGroup: async (id: string): Promise<GroupDto> => {
    const response = await apiClient.put<GroupDto>(`${GROUP_BASE_URL}/${id}/restore`);
    return response.data;
  },
};
