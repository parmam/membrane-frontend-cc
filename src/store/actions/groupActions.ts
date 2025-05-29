// src/store/actions/groupActions.ts
import {
  GetGroupsQueryParams,
  GroupDto,
  PaginatedGroupsResponseDto,
  StoreGroupRequestDto,
  UpdateGroupRequestDto,
} from '@/services/group/Group.types';
import { GroupService } from '@/services/group/GroupService';
import { Group as GroupModel, convertGroupDtoToModel } from '@/services/group/convertToGroup';

import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  createGroupSuccess,
  deleteGroupSuccess,
  getGroupSuccess,
  groupRequestFailure,
  groupRequestStart,
  listGroupsSuccess,
  updateGroupSuccess,
} from '../reducers/groupSlice';

export const fetchGroups = createAsyncThunk(
  'groups/fetchGroups',
  async (params: GetGroupsQueryParams = {}, { dispatch }) => {
    dispatch(groupRequestStart());
    try {
      const response: PaginatedGroupsResponseDto = await GroupService.listGroups(params);
      const groupModels: GroupModel[] = response.data.map(convertGroupDtoToModel);
      dispatch(
        listGroupsSuccess({
          groups: groupModels,
          total: response.total,
          page: (params.offset || 0) / (params.limit || 10) + 1,
          pageSize: params.limit || 10,
        }),
      );
      return { groups: groupModels, total: response.total };
    } catch (error: unknown) {
      // Changed from any to unknown
      let errorMessage = 'Failed to fetch groups';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(groupRequestFailure(errorMessage));
      throw error;
    }
  },
);

export const fetchGroupById = createAsyncThunk(
  'groups/fetchGroupById',
  async (groupId: string, { dispatch }) => {
    dispatch(groupRequestStart());
    try {
      const groupDto: GroupDto = await GroupService.findGroupById(groupId);
      const groupModel: GroupModel = convertGroupDtoToModel(groupDto);
      dispatch(getGroupSuccess(groupModel));
      return groupModel;
    } catch (error: unknown) {
      // Changed from any to unknown
      let errorMessage = 'Failed to fetch group details';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(groupRequestFailure(errorMessage));
      throw error;
    }
  },
);

export const createGroup = createAsyncThunk(
  'groups/createGroup',
  async (groupData: StoreGroupRequestDto, { dispatch }) => {
    dispatch(groupRequestStart());
    try {
      const createdGroupDto: GroupDto = await GroupService.createGroup(groupData);
      const createdGroupModel: GroupModel = convertGroupDtoToModel(createdGroupDto);
      dispatch(createGroupSuccess(createdGroupModel));
      return createdGroupModel;
    } catch (error: unknown) {
      // Changed from any to unknown
      let errorMessage = 'Failed to create group';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(groupRequestFailure(errorMessage));
      throw error;
    }
  },
);

export const updateGroup = createAsyncThunk(
  'groups/updateGroup',
  async (
    { groupId, groupData }: { groupId: string; groupData: UpdateGroupRequestDto },
    { dispatch },
  ) => {
    dispatch(groupRequestStart());
    try {
      const updatedGroupDto: GroupDto = await GroupService.updateGroup(groupId, groupData);
      const updatedGroupModel: GroupModel = convertGroupDtoToModel(updatedGroupDto);
      dispatch(updateGroupSuccess(updatedGroupModel));
      return updatedGroupModel;
    } catch (error: unknown) {
      // Changed from any to unknown
      let errorMessage = 'Failed to update group';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(groupRequestFailure(errorMessage));
      throw error;
    }
  },
);

export const deleteGroup = createAsyncThunk(
  'groups/deleteGroup',
  async (groupId: string, { dispatch }) => {
    dispatch(groupRequestStart());
    try {
      await GroupService.deleteGroup(groupId);
      dispatch(deleteGroupSuccess(groupId));
      return groupId;
    } catch (error: unknown) {
      // Changed from any to unknown
      let errorMessage = 'Failed to delete group';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(groupRequestFailure(errorMessage));
      throw error;
    }
  },
);

export const restoreGroup = createAsyncThunk(
  'groups/restoreGroup',
  async (groupId: string, { dispatch }) => {
    dispatch(groupRequestStart());
    try {
      const restoredGroupDto: GroupDto = await GroupService.restoreGroup(groupId);
      const restoredGroupModel: GroupModel = convertGroupDtoToModel(restoredGroupDto);
      dispatch(updateGroupSuccess(restoredGroupModel)); // Reuse update success for simplicity
      return restoredGroupModel;
    } catch (error: unknown) {
      // Changed from any to unknown
      let errorMessage = 'Failed to restore group';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(groupRequestFailure(errorMessage));
      throw error;
    }
  },
);
