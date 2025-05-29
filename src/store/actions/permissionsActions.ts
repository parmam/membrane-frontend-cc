// src/store/actions/permissionsActions.ts
import { PermissionDto } from '@/services/permissions/Permissions.types';
import { PermissionsService } from '@/services/permissions/PermissionsService';

import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  listPermissionsSuccess,
  permissionsRequestFailure,
  permissionsRequestStart,
} from '../reducers/permissionsSlice';

export const fetchPermissions = createAsyncThunk(
  'permissions/fetchPermissions',
  async (_, { dispatch }) => {
    // No arguments needed for listAll
    dispatch(permissionsRequestStart());
    try {
      const permissionsList: PermissionDto[] = await PermissionsService.listPermissions();
      dispatch(listPermissionsSuccess(permissionsList));
      return permissionsList;
    } catch (error: unknown) {
      // Changed from any to unknown
      let errorMessage = 'Failed to fetch permissions';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(permissionsRequestFailure(errorMessage));
      throw error;
    }
  },
);
