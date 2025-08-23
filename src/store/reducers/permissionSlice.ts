// src/store/reducers/permissionReducer.ts
import { Reducer } from 'redux';

import { Permission } from '../types/ApiTypes';
import {
  PERMISSION_CLEAR_ERROR,
  PERMISSION_GET_PERMISSIONS_FAILED,
  PERMISSION_GET_PERMISSIONS_START,
  PERMISSION_GET_PERMISSIONS_SUCCESS,
  PermissionAction,
  PermissionState,
  PermissionStatus,
  initialPermissionState,
} from '../types/PermissionTypes';

export const permissionReducer: Reducer<PermissionState, PermissionAction> = (
  state = initialPermissionState,
  action,
) => {
  switch (action.type) {
    case PERMISSION_GET_PERMISSIONS_START:
      return { ...state, status: PermissionStatus.Fetching, error: null };
    case PERMISSION_GET_PERMISSIONS_SUCCESS:
      return {
        ...state,
        permissions: action.payload.permissions,
        status: PermissionStatus.Success,
      };
    case PERMISSION_GET_PERMISSIONS_FAILED:
      return { ...state, status: PermissionStatus.Failed, error: action.payload.error };
    case PERMISSION_CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};

export default permissionReducer;
