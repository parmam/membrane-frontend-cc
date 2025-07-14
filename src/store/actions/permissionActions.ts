// src/store/actions/permissionActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';

import { PermissionService } from '../../api/services';
import type { Permission, PermissionQueryParams, ThunkApiConfig } from '../types/ApiTypes';
import { parseError } from '../types/ErrorTypes';

// ========================
// GET PERMISSIONS
// ========================

export const getPermissionsThunk = createAsyncThunk<
  Permission[],
  PermissionQueryParams | undefined,
  ThunkApiConfig
>('permissions/getPermissionsThunk', async (params, { rejectWithValue }) => {
  try {
    const response = await PermissionService.getPermissions(params);
    return response as unknown as Permission[];
  } catch (error) {
    return rejectWithValue(parseError(error));
  }
});
