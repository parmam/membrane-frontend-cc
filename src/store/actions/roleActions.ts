// src/store/actions/newRoleActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';

import { RoleService } from '../../api/services';
import type {
  CreateRoleRequest,
  PaginatedResponse,
  Role,
  RoleQueryParams,
  ThunkApiConfig,
  UpdateRoleRequest,
} from '../types/ApiTypes';

// ========================
// GET ROLES (PAGINATED)
// ========================

export const getRolesThunk = createAsyncThunk<
  PaginatedResponse<Role>,
  RoleQueryParams | undefined,
  ThunkApiConfig
>('roles/getRolesThunk', async (params, { rejectWithValue }) => {
  try {
    const response = await RoleService.getRoles(params);
    return response as unknown as PaginatedResponse<Role>;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch roles';
    return rejectWithValue(message);
  }
});

// ========================
// GET ROLE BY ID
// ========================

export const getRoleByIdThunk = createAsyncThunk<Role, string, ThunkApiConfig>(
  'roles/getRoleByIdThunk',
  async (id, { rejectWithValue }) => {
    try {
      const response = await RoleService.getRoleById(id);
      return response as unknown as Role;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch role';
      return rejectWithValue(message);
    }
  },
);

// ========================
// CREATE ROLE
// ========================

export const createRoleThunk = createAsyncThunk<Role, CreateRoleRequest, ThunkApiConfig>(
  'roles/createRoleThunk',
  async (roleData, { rejectWithValue }) => {
    try {
      const response = await RoleService.createRole(roleData);
      return response as unknown as Role;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create role';
      return rejectWithValue(message);
    }
  },
);

// ========================
// UPDATE ROLE
// ========================

export const updateRoleThunk = createAsyncThunk<
  Role,
  { id: string; roleData: UpdateRoleRequest },
  ThunkApiConfig
>('roles/updateRoleThunk', async ({ id, roleData }, { rejectWithValue }) => {
  try {
    const response = await RoleService.updateRole(id, roleData);
    return response as unknown as Role;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update role';
    return rejectWithValue(message);
  }
});

// ========================
// DELETE ROLE
// ========================

export const deleteRoleThunk = createAsyncThunk<string, string, ThunkApiConfig>(
  'roles/deleteRoleThunk',
  async (id, { rejectWithValue }) => {
    try {
      await RoleService.deleteRole(id);
      return id;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete role';
      return rejectWithValue(message);
    }
  },
);

// ========================
// RESTORE ROLE
// ========================

export const restoreRoleThunk = createAsyncThunk<Role, string, ThunkApiConfig>(
  'roles/restoreRoleThunk',
  async (id, { rejectWithValue }) => {
    try {
      const response = await RoleService.restoreRole(id);
      return response as unknown as Role;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to restore role';
      return rejectWithValue(message);
    }
  },
);
