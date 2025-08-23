// src/store/reducers/roleReducer.ts
import { Reducer } from 'redux';

import { PaginatedResponse, Role } from '../types/ApiTypes';
import {
  ROLE_CLEAR_ERROR,
  ROLE_CREATE_FAILED,
  ROLE_CREATE_START,
  ROLE_CREATE_SUCCESS,
  ROLE_DELETE_FAILED,
  ROLE_DELETE_START,
  ROLE_DELETE_SUCCESS,
  ROLE_GET_ROLES_FAILED,
  ROLE_GET_ROLES_START,
  ROLE_GET_ROLES_SUCCESS,
  ROLE_GET_ROLE_BY_ID_FAILED,
  ROLE_GET_ROLE_BY_ID_START,
  ROLE_GET_ROLE_BY_ID_SUCCESS,
  ROLE_RESTORE_FAILED,
  ROLE_RESTORE_START,
  ROLE_RESTORE_SUCCESS,
  ROLE_UPDATE_FAILED,
  ROLE_UPDATE_START,
  ROLE_UPDATE_SUCCESS,
  RoleAction,
  RoleState,
  RoleStatus,
  initialRoleState,
} from '../types/RoleTypes';

export const roleReducer: Reducer<RoleState, RoleAction> = (state = initialRoleState, action) => {
  switch (action.type) {
    case ROLE_GET_ROLES_START:
      return { ...state, status: RoleStatus.Fetching, error: null };
    case ROLE_GET_ROLES_SUCCESS:
      return {
        ...state,
        roles: action.payload.response.data,
        total: action.payload.response.total,
        currentPage: action.payload.response.offset / action.payload.response.limit + 1,
        pageSize: action.payload.response.limit,
        status: RoleStatus.Success,
      };
    case ROLE_GET_ROLES_FAILED:
      return { ...state, status: RoleStatus.Failed, error: action.payload.error };

    case ROLE_GET_ROLE_BY_ID_START:
      return { ...state, status: RoleStatus.Fetching, error: null };
    case ROLE_GET_ROLE_BY_ID_SUCCESS:
      return { ...state, selectedRole: action.payload.role, status: RoleStatus.Success };
    case ROLE_GET_ROLE_BY_ID_FAILED:
      return { ...state, status: RoleStatus.Failed, error: action.payload.error };

    case ROLE_CREATE_START:
      return { ...state, status: RoleStatus.Creating, error: null };
    case ROLE_CREATE_SUCCESS:
      return {
        ...state,
        roles: [action.payload.role, ...state.roles],
        total: state.total + 1,
        status: RoleStatus.Success,
      };
    case ROLE_CREATE_FAILED:
      return { ...state, status: RoleStatus.Failed, error: action.payload.error };

    case ROLE_UPDATE_START:
      return { ...state, status: RoleStatus.Updating, error: null };
    case ROLE_UPDATE_SUCCESS: {
      const updatedRoles = state.roles.map((r) =>
        r.id === action.payload.role.id ? action.payload.role : r,
      );
      return {
        ...state,
        roles: updatedRoles,
        selectedRole: action.payload.role,
        status: RoleStatus.Success,
      };
    }
    case ROLE_UPDATE_FAILED:
      return { ...state, status: RoleStatus.Failed, error: action.payload.error };

    case ROLE_DELETE_START:
      return { ...state, status: RoleStatus.Deleting, error: null };
    case ROLE_DELETE_SUCCESS: {
      const filteredRoles = state.roles.filter((r) => r.id !== action.payload.id);
      return {
        ...state,
        roles: filteredRoles,
        total: state.total - 1,
        status: RoleStatus.Success,
      };
    }
    case ROLE_DELETE_FAILED:
      return { ...state, status: RoleStatus.Failed, error: action.payload.error };

    case ROLE_RESTORE_START:
      return { ...state, status: RoleStatus.Restoring, error: null };
    case ROLE_RESTORE_SUCCESS:
      return {
        ...state,
        roles: [action.payload.role, ...state.roles],
        total: state.total + 1,
        status: RoleStatus.Success,
      };
    case ROLE_RESTORE_FAILED:
      return { ...state, status: RoleStatus.Failed, error: action.payload.error };

    case ROLE_CLEAR_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};

export default roleReducer;
