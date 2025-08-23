// src/store/actions/roleActions.ts
import { RoleService } from '../../api/services/roleService';
import {
  CreateRoleRequest,
  PaginatedResponse,
  Role,
  RoleQueryParams,
  UpdateRoleRequest,
} from '../types/ApiTypes';
import { parseError } from '../types/ErrorTypes';
import { AppErrorDto } from '../types/ErrorTypes';
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
  RoleThunk,
} from '../types/RoleTypes';

// Action Creators
export const getRolesStart = (): RoleAction => ({ type: ROLE_GET_ROLES_START });
export const getRolesSuccess = (response: PaginatedResponse<Role>): RoleAction => ({
  type: ROLE_GET_ROLES_SUCCESS,
  payload: { response },
});
export const getRolesFailed = (error: AppErrorDto): RoleAction => ({
  type: ROLE_GET_ROLES_FAILED,
  payload: { error },
});

export const getRoleByIdStart = (): RoleAction => ({ type: ROLE_GET_ROLE_BY_ID_START });
export const getRoleByIdSuccess = (role: Role): RoleAction => ({
  type: ROLE_GET_ROLE_BY_ID_SUCCESS,
  payload: { role },
});
export const getRoleByIdFailed = (error: AppErrorDto): RoleAction => ({
  type: ROLE_GET_ROLE_BY_ID_FAILED,
  payload: { error },
});

export const createRoleStart = (): RoleAction => ({ type: ROLE_CREATE_START });
export const createRoleSuccess = (role: Role): RoleAction => ({
  type: ROLE_CREATE_SUCCESS,
  payload: { role },
});
export const createRoleFailed = (error: AppErrorDto): RoleAction => ({
  type: ROLE_CREATE_FAILED,
  payload: { error },
});

export const updateRoleStart = (): RoleAction => ({ type: ROLE_UPDATE_START });
export const updateRoleSuccess = (role: Role): RoleAction => ({
  type: ROLE_UPDATE_SUCCESS,
  payload: { role },
});
export const updateRoleFailed = (error: AppErrorDto): RoleAction => ({
  type: ROLE_UPDATE_FAILED,
  payload: { error },
});

export const deleteRoleStart = (): RoleAction => ({ type: ROLE_DELETE_START });
export const deleteRoleSuccess = (id: string): RoleAction => ({
  type: ROLE_DELETE_SUCCESS,
  payload: { id },
});
export const deleteRoleFailed = (error: AppErrorDto): RoleAction => ({
  type: ROLE_DELETE_FAILED,
  payload: { error },
});

export const restoreRoleStart = (): RoleAction => ({ type: ROLE_RESTORE_START });
export const restoreRoleSuccess = (role: Role): RoleAction => ({
  type: ROLE_RESTORE_SUCCESS,
  payload: { role },
});
export const restoreRoleFailed = (error: AppErrorDto): RoleAction => ({
  type: ROLE_RESTORE_FAILED,
  payload: { error },
});

export const clearRoleError = (): RoleAction => ({ type: ROLE_CLEAR_ERROR });

// Thunks
export const getRolesThunk =
  (params?: RoleQueryParams): RoleThunk =>
  async (dispatch) => {
    dispatch(getRolesStart());
    try {
      const response = (await RoleService.getRoles(params)) ?? {
        data: [],
        total: 0,
        limit: 10,
        offset: 0,
      };
      dispatch(getRolesSuccess(response));
    } catch (error) {
      dispatch(getRolesFailed(parseError(error)));
    }
  };

export const getRoleByIdThunk =
  (id: string): RoleThunk =>
  async (dispatch) => {
    dispatch(getRoleByIdStart());
    try {
      const role = (await RoleService.getRoleById(id)) ?? {
        id: '',
        name: '',
        createdAt: '',
        updatedAt: '',
      };
      dispatch(getRoleByIdSuccess(role));
    } catch (error) {
      dispatch(getRoleByIdFailed(parseError(error)));
    }
  };

export const createRoleThunk =
  (roleData: CreateRoleRequest): RoleThunk =>
  async (dispatch) => {
    dispatch(createRoleStart());
    try {
      const role = (await RoleService.createRole(roleData)) ?? {
        id: '',
        name: '',
        createdAt: '',
        updatedAt: '',
      };
      dispatch(createRoleSuccess(role));
    } catch (error) {
      dispatch(createRoleFailed(parseError(error)));
    }
  };

export const updateRoleThunk =
  (id: string, roleData: UpdateRoleRequest): RoleThunk =>
  async (dispatch) => {
    dispatch(updateRoleStart());
    try {
      const role = (await RoleService.updateRole(id, roleData)) ?? {
        id: '',
        name: '',
        createdAt: '',
        updatedAt: '',
      };
      dispatch(updateRoleSuccess(role));
    } catch (error) {
      dispatch(updateRoleFailed(parseError(error)));
    }
  };

export const deleteRoleThunk =
  (id: string): RoleThunk =>
  async (dispatch) => {
    dispatch(deleteRoleStart());
    try {
      await RoleService.deleteRole(id);
      dispatch(deleteRoleSuccess(id));
    } catch (error) {
      dispatch(deleteRoleFailed(parseError(error)));
    }
  };

export const restoreRoleThunk =
  (id: string): RoleThunk =>
  async (dispatch) => {
    dispatch(restoreRoleStart());
    try {
      const role = (await RoleService.restoreRole(id)) ?? {
        id: '',
        name: '',
        createdAt: '',
        updatedAt: '',
      };
      dispatch(restoreRoleSuccess(role));
    } catch (error) {
      dispatch(restoreRoleFailed(parseError(error)));
    }
  };
