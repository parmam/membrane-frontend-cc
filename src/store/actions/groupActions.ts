// src/store/actions/groupActions.ts
import { GroupService } from '../../api/services/groupService';
import {
  CreateGroupRequest,
  Group,
  GroupQueryParams,
  PaginatedResponse,
  UpdateGroupRequest,
} from '../types/ApiTypes';
import { parseError } from '../types/ErrorTypes';
import { AppErrorDto } from '../types/ErrorTypes';
import {
  GROUP_CLEAR_ERROR,
  GROUP_CREATE_FAILED,
  GROUP_CREATE_START,
  GROUP_CREATE_SUCCESS,
  GROUP_DELETE_FAILED,
  GROUP_DELETE_START,
  GROUP_DELETE_SUCCESS,
  GROUP_GET_BY_ID_FAILED,
  GROUP_GET_BY_ID_START,
  GROUP_GET_BY_ID_SUCCESS,
  GROUP_GET_GROUPS_FAILED,
  GROUP_GET_GROUPS_START,
  GROUP_GET_GROUPS_SUCCESS,
  GROUP_RESTORE_FAILED,
  GROUP_RESTORE_START,
  GROUP_RESTORE_SUCCESS,
  GROUP_UPDATE_FAILED,
  GROUP_UPDATE_START,
  GROUP_UPDATE_SUCCESS,
  GroupAction,
  GroupThunk,
} from '../types/GroupTypes';

// Action Creators
export const getGroupsStart = (): GroupAction => ({ type: GROUP_GET_GROUPS_START });
export const getGroupsSuccess = (response: PaginatedResponse<Group>): GroupAction => ({
  type: GROUP_GET_GROUPS_SUCCESS,
  payload: { response },
});
export const getGroupsFailed = (error: AppErrorDto): GroupAction => ({
  type: GROUP_GET_GROUPS_FAILED,
  payload: { error },
});

export const getByIdStart = (): GroupAction => ({ type: GROUP_GET_BY_ID_START });
export const getByIdSuccess = (group: Group): GroupAction => ({
  type: GROUP_GET_BY_ID_SUCCESS,
  payload: { group },
});
export const getByIdFailed = (error: AppErrorDto): GroupAction => ({
  type: GROUP_GET_BY_ID_FAILED,
  payload: { error },
});

export const createStart = (): GroupAction => ({ type: GROUP_CREATE_START });
export const createSuccess = (group: Group): GroupAction => ({
  type: GROUP_CREATE_SUCCESS,
  payload: { group },
});
export const createFailed = (error: AppErrorDto): GroupAction => ({
  type: GROUP_CREATE_FAILED,
  payload: { error },
});

export const updateStart = (): GroupAction => ({ type: GROUP_UPDATE_START });
export const updateSuccess = (group: Group): GroupAction => ({
  type: GROUP_UPDATE_SUCCESS,
  payload: { group },
});
export const updateFailed = (error: AppErrorDto): GroupAction => ({
  type: GROUP_UPDATE_FAILED,
  payload: { error },
});

export const deleteStart = (): GroupAction => ({ type: GROUP_DELETE_START });
export const deleteSuccess = (id: string): GroupAction => ({
  type: GROUP_DELETE_SUCCESS,
  payload: { id },
});
export const deleteFailed = (error: AppErrorDto): GroupAction => ({
  type: GROUP_DELETE_FAILED,
  payload: { error },
});

export const restoreStart = (): GroupAction => ({ type: GROUP_RESTORE_START });
export const restoreSuccess = (group: Group): GroupAction => ({
  type: GROUP_RESTORE_SUCCESS,
  payload: { group },
});
export const restoreFailed = (error: AppErrorDto): GroupAction => ({
  type: GROUP_RESTORE_FAILED,
  payload: { error },
});

export const clearError = (): GroupAction => ({ type: GROUP_CLEAR_ERROR });

// Thunks
export const getGroupsThunk =
  (params?: GroupQueryParams): GroupThunk =>
  async (dispatch) => {
    dispatch(getGroupsStart());
    try {
      const response = (await GroupService.getGroups(params)) ?? {
        data: [],
        total: 0,
        limit: 10,
        offset: 0,
      };
      dispatch(getGroupsSuccess(response));
    } catch (error) {
      dispatch(getGroupsFailed(parseError(error)));
    }
  };

export const getGroupByIdThunk =
  (id: string): GroupThunk =>
  async (dispatch) => {
    dispatch(getByIdStart());
    try {
      const group = (await GroupService.getGroupById(id)) ?? {
        id: '',
        name: '',
        description: '',
        createdAt: '',
        updatedAt: '',
        deletedAt: '',
      };
      dispatch(getByIdSuccess(group));
    } catch (error) {
      dispatch(getByIdFailed(parseError(error)));
    }
  };

export const createGroupThunk =
  (groupData: CreateGroupRequest): GroupThunk =>
  async (dispatch) => {
    dispatch(createStart());
    try {
      const group = (await GroupService.createGroup(groupData)) ?? {
        id: '',
        name: '',
        description: '',
        createdAt: '',
        updatedAt: '',
        deletedAt: '',
      };
      dispatch(createSuccess(group));
    } catch (error) {
      dispatch(createFailed(parseError(error)));
    }
  };

export const updateGroupThunk =
  (id: string, groupData: UpdateGroupRequest): GroupThunk =>
  async (dispatch) => {
    dispatch(updateStart());
    try {
      const group = (await GroupService.updateGroup(id, groupData)) ?? {
        id: '',
        name: '',
        description: '',
        createdAt: '',
        updatedAt: '',
        deletedAt: '',
      };
      dispatch(updateSuccess(group));
    } catch (error) {
      dispatch(updateFailed(parseError(error)));
    }
  };

export const deleteGroupThunk =
  (id: string): GroupThunk =>
  async (dispatch) => {
    dispatch(deleteStart());
    try {
      await GroupService.deleteGroup(id);
      dispatch(deleteSuccess(id));
    } catch (error) {
      dispatch(deleteFailed(parseError(error)));
    }
  };

export const restoreGroupThunk =
  (id: string): GroupThunk =>
  async (dispatch) => {
    dispatch(restoreStart());
    try {
      const group = (await GroupService.restoreGroup(id)) ?? {
        id: '',
        name: '',
        description: '',
        createdAt: '',
        updatedAt: '',
        deletedAt: '',
      };
      dispatch(restoreSuccess(group));
    } catch (error) {
      dispatch(restoreFailed(parseError(error)));
    }
  };
