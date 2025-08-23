// src/store/types/PermissionTypes.ts
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { RootState } from '../index';
import { Permission, PermissionQueryParams } from '../types/ApiTypes';
import { AppErrorDto } from './ErrorTypes';

export enum PermissionStatus {
  Initial = 'INITIAL',
  Fetching = 'FETCHING',
  Success = 'SUCCESS',
  Failed = 'FAILED',
}

export interface PermissionState {
  permissions: Permission[];
  status: PermissionStatus;
  error: AppErrorDto | null;
}

export const initialPermissionState: PermissionState = {
  permissions: [],
  status: PermissionStatus.Initial,
  error: null,
};

export const PERMISSION_GET_PERMISSIONS_START = 'permissions/getPermissions/start';
export const PERMISSION_GET_PERMISSIONS_SUCCESS = 'permissions/getPermissions/success';
export const PERMISSION_GET_PERMISSIONS_FAILED = 'permissions/getPermissions/failed';

export const PERMISSION_CLEAR_ERROR = 'permissions/clearError';

export type PermissionAction =
  | Action<typeof PERMISSION_GET_PERMISSIONS_START>
  | { type: typeof PERMISSION_GET_PERMISSIONS_SUCCESS; payload: { permissions: Permission[] } }
  | { type: typeof PERMISSION_GET_PERMISSIONS_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof PERMISSION_CLEAR_ERROR>;

export type PermissionThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  PermissionAction
>;
