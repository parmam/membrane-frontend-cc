// src/services/group/GroupService.ts
import apiClient from '../apiClient';
import {
  GetGroupsQueryParams,
  GroupDto,
  PaginatedGroupsResponseDto,
  StoreGroupRequestDto,
  UpdateGroupRequestDto,
} from './Group.types';

const GROUP_BASE_URL = '/group'; // From Swagger

export const GroupService = {
  listGroups: async (params?: GetGroupsQueryParams): Promise<PaginatedGroupsResponseDto> => {
    const response = await apiClient.get<PaginatedGroupsResponseDto>(GROUP_BASE_URL, { params });
    return response.data;
  },

  createGroup: async (groupData: StoreGroupRequestDto): Promise<GroupDto> => {
    const response = await apiClient.post<GroupDto>(GROUP_BASE_URL, groupData);
    return response.data;
  },

  findGroupById: async (id: string): Promise<GroupDto> => {
    const response = await apiClient.get<GroupDto>(`${GROUP_BASE_URL}/${id}`);
    return response.data;
  },

  updateGroup: async (id: string, updateData: UpdateGroupRequestDto): Promise<GroupDto> => {
    const response = await apiClient.put<GroupDto>(`${GROUP_BASE_URL}/${id}`, updateData);
    return response.data;
  },

  deleteGroup: async (id: string): Promise<void> => {
    await apiClient.delete(`${GROUP_BASE_URL}/${id}`);
  },

  restoreGroup: async (id: string): Promise<GroupDto> => {
    const response = await apiClient.put<GroupDto>(`${GROUP_BASE_URL}/${id}/restore`);
    return response.data;
  },
};
