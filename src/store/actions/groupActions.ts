// src/store/actions/groupActions.ts
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
import { parseError } from '../types/ErrorTypes';

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
    return rejectWithValue(parseError(error));
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
      return rejectWithValue(parseError(error));
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
      return rejectWithValue(parseError(error));
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
    return rejectWithValue(parseError(error));
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
      return rejectWithValue(parseError(error));
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
      return rejectWithValue(parseError(error));
    }
  },
);
