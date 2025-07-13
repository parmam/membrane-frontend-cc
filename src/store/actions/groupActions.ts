// src/store/actions/newGroupActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';

import { GroupService } from '../../api/services';
import type {
  CreateGroupRequest,
  Group,
  GroupQueryParams,
  PaginatedResponse,
  ThunkApiConfig,
  UpdateGroupRequest,
} from '../types/ApiTypes';

// =======================
// GET GROUPS (PAGINATED)
// =======================

export const getGroupsThunk = createAsyncThunk<
  PaginatedResponse<Group>,
  GroupQueryParams | undefined,
  ThunkApiConfig
>('groups/getGroupsThunk', async (params, { rejectWithValue }) => {
  try {
    const response = await GroupService.getGroups(params);
    return response as unknown as PaginatedResponse<Group>;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch groups';
    return rejectWithValue(message);
  }
});

// =======================
// GET GROUP BY ID
// =======================

export const getGroupByIdThunk = createAsyncThunk<Group, string, ThunkApiConfig>(
  'groups/getGroupByIdThunk',
  async (id, { rejectWithValue }) => {
    try {
      const response = await GroupService.getGroupById(id);
      return response as unknown as Group;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch group';
      return rejectWithValue(message);
    }
  },
);

// =======================
// CREATE GROUP
// =======================

export const createGroupThunk = createAsyncThunk<Group, CreateGroupRequest, ThunkApiConfig>(
  'groups/createGroupThunk',
  async (groupData, { rejectWithValue }) => {
    try {
      const response = await GroupService.createGroup(groupData);
      return response as unknown as Group;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create group';
      return rejectWithValue(message);
    }
  },
);

// =======================
// UPDATE GROUP
// =======================

export const updateGroupThunk = createAsyncThunk<
  Group,
  { id: string; groupData: UpdateGroupRequest },
  ThunkApiConfig
>('groups/updateGroupThunk', async ({ id, groupData }, { rejectWithValue }) => {
  try {
    const response = await GroupService.updateGroup(id, groupData);
    return response as unknown as Group;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update group';
    return rejectWithValue(message);
  }
});

// =======================
// DELETE GROUP
// =======================

export const deleteGroupThunk = createAsyncThunk<string, string, ThunkApiConfig>(
  'groups/deleteGroupThunk',
  async (id, { rejectWithValue }) => {
    try {
      await GroupService.deleteGroup(id);
      return id;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete group';
      return rejectWithValue(message);
    }
  },
);

// =======================
// RESTORE GROUP
// =======================

export const restoreGroupThunk = createAsyncThunk<Group, string, ThunkApiConfig>(
  'groups/restoreGroupThunk',
  async (id, { rejectWithValue }) => {
    try {
      const response = await GroupService.restoreGroup(id);
      return response as unknown as Group;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to restore group';
      return rejectWithValue(message);
    }
  },
);
