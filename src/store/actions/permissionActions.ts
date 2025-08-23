// src/store/actions/permissionActions.ts
import { PermissionService } from '../../api/services/permissionService';
import { Permission, PermissionQueryParams } from '../types/ApiTypes';
import { parseError } from '../types/ErrorTypes';
import { AppErrorDto } from '../types/ErrorTypes';
import {
  PERMISSION_CLEAR_ERROR,
  PERMISSION_GET_PERMISSIONS_FAILED,
  PERMISSION_GET_PERMISSIONS_START,
  PERMISSION_GET_PERMISSIONS_SUCCESS,
  PermissionAction,
  PermissionThunk,
} from '../types/PermissionTypes';

// Action Creators
export const getPermissionsStart = (): PermissionAction => ({
  type: PERMISSION_GET_PERMISSIONS_START,
});
export const getPermissionsSuccess = (permissions: Permission[]): PermissionAction => ({
  type: PERMISSION_GET_PERMISSIONS_SUCCESS,
  payload: { permissions },
});
export const getPermissionsFailed = (error: AppErrorDto): PermissionAction => ({
  type: PERMISSION_GET_PERMISSIONS_FAILED,
  payload: { error },
});

export const clearPermissionError = (): PermissionAction => ({ type: PERMISSION_CLEAR_ERROR });

// Thunks
export const getPermissionsThunk =
  (params?: PermissionQueryParams): PermissionThunk =>
  async (dispatch) => {
    dispatch(getPermissionsStart());
    try {
      const permissions = (await PermissionService.getPermissions(params)) ?? [];
      dispatch(getPermissionsSuccess(permissions));
    } catch (error) {
      dispatch(getPermissionsFailed(parseError(error)));
    }
  };
