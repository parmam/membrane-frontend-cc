// src/store/types/GroupTypes.ts
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { RootState } from '../index';
import {
  CreateGroupRequest,
  Group,
  GroupQueryParams,
  PaginatedResponse,
  UpdateGroupRequest,
} from '../types/ApiTypes';
import { AppErrorDto } from './ErrorTypes';

export enum GroupStatus {
  Initial = 'INITIAL',
  Fetching = 'FETCHING',
  Creating = 'CREATING',
  Updating = 'UPDATING',
  Deleting = 'DELETING',
  Restoring = 'RESTORING',
  Success = 'SUCCESS',
  Failed = 'FAILED',
}

export interface GroupState {
  groups: Group[];
  selectedGroup: Group | null;
  total: number;
  currentPage: number;
  pageSize: number;
  status: GroupStatus;
  error: AppErrorDto | null;
}

export const initialGroupState: GroupState = {
  groups: [],
  selectedGroup: null,
  total: 0,
  currentPage: 1,
  pageSize: 10,
  status: GroupStatus.Initial,
  error: null,
};

export const GROUP_GET_GROUPS_START = 'groups/getGroups/start';
export const GROUP_GET_GROUPS_SUCCESS = 'groups/getGroups/success';
export const GROUP_GET_GROUPS_FAILED = 'groups/getGroups/failed';

export const GROUP_GET_BY_ID_START = 'groups/getById/start';
export const GROUP_GET_BY_ID_SUCCESS = 'groups/getById/success';
export const GROUP_GET_BY_ID_FAILED = 'groups/getById/failed';

export const GROUP_CREATE_START = 'groups/create/start';
export const GROUP_CREATE_SUCCESS = 'groups/create/success';
export const GROUP_CREATE_FAILED = 'groups/create/failed';

export const GROUP_UPDATE_START = 'groups/update/start';
export const GROUP_UPDATE_SUCCESS = 'groups/update/success';
export const GROUP_UPDATE_FAILED = 'groups/update/failed';

export const GROUP_DELETE_START = 'groups/delete/start';
export const GROUP_DELETE_SUCCESS = 'groups/delete/success';
export const GROUP_DELETE_FAILED = 'groups/delete/failed';

export const GROUP_RESTORE_START = 'groups/restore/start';
export const GROUP_RESTORE_SUCCESS = 'groups/restore/success';
export const GROUP_RESTORE_FAILED = 'groups/restore/failed';

export const GROUP_CLEAR_ERROR = 'groups/clearError';

export type GroupAction =
  | Action<typeof GROUP_GET_GROUPS_START>
  | { type: typeof GROUP_GET_GROUPS_SUCCESS; payload: { response: PaginatedResponse<Group> } }
  | { type: typeof GROUP_GET_GROUPS_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof GROUP_GET_BY_ID_START>
  | { type: typeof GROUP_GET_BY_ID_SUCCESS; payload: { group: Group } }
  | { type: typeof GROUP_GET_BY_ID_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof GROUP_CREATE_START>
  | { type: typeof GROUP_CREATE_SUCCESS; payload: { group: Group } }
  | { type: typeof GROUP_CREATE_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof GROUP_UPDATE_START>
  | { type: typeof GROUP_UPDATE_SUCCESS; payload: { group: Group } }
  | { type: typeof GROUP_UPDATE_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof GROUP_DELETE_START>
  | { type: typeof GROUP_DELETE_SUCCESS; payload: { id: string } }
  | { type: typeof GROUP_DELETE_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof GROUP_RESTORE_START>
  | { type: typeof GROUP_RESTORE_SUCCESS; payload: { group: Group } }
  | { type: typeof GROUP_RESTORE_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof GROUP_CLEAR_ERROR>;

export type GroupThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  GroupAction
>;
