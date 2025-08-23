// src/store/types/RoleTypes.ts
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { RootState } from '../index';
import {
  CreateRoleRequest,
  PaginatedResponse,
  Role,
  RoleQueryParams,
  UpdateRoleRequest,
} from '../types/ApiTypes';
import { AppErrorDto } from './ErrorTypes';

export enum RoleStatus {
  Initial = 'INITIAL',
  Fetching = 'FETCHING',
  Creating = 'CREATING',
  Updating = 'UPDATING',
  Deleting = 'DELETING',
  Restoring = 'RESTORING',
  Success = 'SUCCESS',
  Failed = 'FAILED',
}

export interface RoleState {
  roles: Role[];
  selectedRole: Role | null;
  total: number;
  currentPage: number;
  pageSize: number;
  status: RoleStatus;
  error: AppErrorDto | null;
}

export const initialRoleState: RoleState = {
  roles: [],
  selectedRole: null,
  total: 0,
  currentPage: 1,
  pageSize: 10,
  status: RoleStatus.Initial,
  error: null,
};

export const ROLE_GET_ROLES_START = 'roles/getRoles/start';
export const ROLE_GET_ROLES_SUCCESS = 'roles/getRoles/success';
export const ROLE_GET_ROLES_FAILED = 'roles/getRoles/failed';

export const ROLE_GET_ROLE_BY_ID_START = 'roles/getRoleById/start';
export const ROLE_GET_ROLE_BY_ID_SUCCESS = 'roles/getRoleById/success';
export const ROLE_GET_ROLE_BY_ID_FAILED = 'roles/getRoleById/failed';

export const ROLE_CREATE_START = 'roles/create/start';
export const ROLE_CREATE_SUCCESS = 'roles/create/success';
export const ROLE_CREATE_FAILED = 'roles/create/failed';

export const ROLE_UPDATE_START = 'roles/update/start';
export const ROLE_UPDATE_SUCCESS = 'roles/update/success';
export const ROLE_UPDATE_FAILED = 'roles/update/failed';

export const ROLE_DELETE_START = 'roles/delete/start';
export const ROLE_DELETE_SUCCESS = 'roles/delete/success';
export const ROLE_DELETE_FAILED = 'roles/delete/failed';

export const ROLE_RESTORE_START = 'roles/restore/start';
export const ROLE_RESTORE_SUCCESS = 'roles/restore/success';
export const ROLE_RESTORE_FAILED = 'roles/restore/failed';

export const ROLE_CLEAR_ERROR = 'roles/clearError';

export type RoleAction =
  | Action<typeof ROLE_GET_ROLES_START>
  | { type: typeof ROLE_GET_ROLES_SUCCESS; payload: { response: PaginatedResponse<Role> } }
  | { type: typeof ROLE_GET_ROLES_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof ROLE_GET_ROLE_BY_ID_START>
  | { type: typeof ROLE_GET_ROLE_BY_ID_SUCCESS; payload: { role: Role } }
  | { type: typeof ROLE_GET_ROLE_BY_ID_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof ROLE_CREATE_START>
  | { type: typeof ROLE_CREATE_SUCCESS; payload: { role: Role } }
  | { type: typeof ROLE_CREATE_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof ROLE_UPDATE_START>
  | { type: typeof ROLE_UPDATE_SUCCESS; payload: { role: Role } }
  | { type: typeof ROLE_UPDATE_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof ROLE_DELETE_START>
  | { type: typeof ROLE_DELETE_SUCCESS; payload: { id: string } }
  | { type: typeof ROLE_DELETE_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof ROLE_RESTORE_START>
  | { type: typeof ROLE_RESTORE_SUCCESS; payload: { role: Role } }
  | { type: typeof ROLE_RESTORE_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof ROLE_CLEAR_ERROR>;

export type RoleThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, RoleAction>;
