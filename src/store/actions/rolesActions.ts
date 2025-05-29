// src/store/actions/rolesActions.ts
import {
  GetRolesQueryParams,
  PaginatedRolesResponseDto,
  RoleDetailsDto,
  StoreRoleRequestDto,
  UpdateRoleRequestDto,
} from '@/services/roles/Roles.types';
import { RolesService } from '@/services/roles/RolesService';
import {
  RoleListModel,
  RoleModel,
  convertRoleDetailsDtoToModel,
  convertRoleListItemDtoToModel,
} from '@/services/roles/convertToRole';

import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  createRoleSuccess,
  deleteRoleSuccess,
  getRoleSuccess,
  listRolesSuccess,
  rolesRequestFailure,
  rolesRequestStart,
  updateRoleSuccess,
} from '../reducers/rolesSlice';

export const fetchRoles = createAsyncThunk(
  'roles/fetchRoles',
  async (params: GetRolesQueryParams = {}, { dispatch }) => {
    dispatch(rolesRequestStart());
    try {
      const response: PaginatedRolesResponseDto = await RolesService.listRoles(params);
      const roleListModels: RoleListModel[] = response.data.map(convertRoleListItemDtoToModel);
      dispatch(
        listRolesSuccess({
          roles: roleListModels,
          total: response.total,
          page: (params.offset || 0) / (params.limit || 10) + 1,
          pageSize: params.limit || 10,
        }),
      );
      return { roles: roleListModels, total: response.total };
    } catch (error: unknown) {
      // Changed from any to unknown
      let errorMessage = 'Failed to fetch roles';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(rolesRequestFailure(errorMessage));
      throw error;
    }
  },
);

export const fetchRoleById = createAsyncThunk(
  'roles/fetchRoleById',
  async (roleId: string, { dispatch }) => {
    dispatch(rolesRequestStart());
    try {
      const roleDto: RoleDetailsDto = await RolesService.findRoleById(roleId);
      const roleModel: RoleModel = convertRoleDetailsDtoToModel(roleDto);
      dispatch(getRoleSuccess(roleModel));
      return roleModel;
    } catch (error: unknown) {
      // Changed from any to unknown
      let errorMessage = 'Failed to fetch role details';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(rolesRequestFailure(errorMessage));
      throw error;
    }
  },
);

export const createRole = createAsyncThunk(
  'roles/createRole',
  async (roleData: StoreRoleRequestDto, { dispatch }) => {
    dispatch(rolesRequestStart());
    try {
      const createdRoleDto: RoleDetailsDto = await RolesService.createRole(roleData);
      const createdRoleModel: RoleModel = convertRoleDetailsDtoToModel(createdRoleDto);
      dispatch(createRoleSuccess(createdRoleModel));
      // Consider dispatching fetchRoles() or other actions to update the list if needed
      return createdRoleModel;
    } catch (error: unknown) {
      // Changed from any to unknown
      let errorMessage = 'Failed to create role';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(rolesRequestFailure(errorMessage));
      throw error;
    }
  },
);

export const updateRole = createAsyncThunk(
  'roles/updateRole',
  async (
    { roleId, roleData }: { roleId: string; roleData: UpdateRoleRequestDto },
    { dispatch },
  ) => {
    dispatch(rolesRequestStart());
    try {
      const updatedRoleDto: RoleDetailsDto = await RolesService.updateRole(roleId, roleData);
      const updatedRoleModel: RoleModel = convertRoleDetailsDtoToModel(updatedRoleDto);
      dispatch(updateRoleSuccess(updatedRoleModel));
      return updatedRoleModel;
    } catch (error: unknown) {
      // Changed from any to unknown
      let errorMessage = 'Failed to update role';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(rolesRequestFailure(errorMessage));
      throw error;
    }
  },
);

export const deleteRole = createAsyncThunk(
  'roles/deleteRole',
  async (roleId: string, { dispatch }) => {
    dispatch(rolesRequestStart());
    try {
      await RolesService.deleteRole(roleId);
      dispatch(deleteRoleSuccess(roleId));
      return roleId;
    } catch (error: unknown) {
      // Changed from any to unknown
      let errorMessage = 'Failed to delete role';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(rolesRequestFailure(errorMessage));
      throw error;
    }
  },
);

// Thunk for restoring a role
export const restoreRole = createAsyncThunk(
  'roles/restoreRole',
  async (roleId: string, { dispatch }) => {
    dispatch(rolesRequestStart());
    try {
      const restoredRoleDto: RoleDetailsDto = await RolesService.restoreRole(roleId);
      const restoredRoleModel: RoleModel = convertRoleDetailsDtoToModel(restoredRoleDto);
      // Option 1: Dispatch updateUserSuccess if the list should be updated similarly
      dispatch(updateRoleSuccess(restoredRoleModel));
      // Option 2: Or dispatch a specific restoreRoleSuccess action if handling is different
      // dispatch(restoreRoleSuccess(restoredRoleModel));
      // Option 3: Or refetch the list / specific item
      // dispatch(fetchRoleById(roleId));
      // dispatch(fetchRoles()); // or with current params
      return restoredRoleModel;
    } catch (error: unknown) {
      // Changed from any to unknown
      let errorMessage = 'Failed to restore role';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(rolesRequestFailure(errorMessage));
      throw error;
    }
  },
);
