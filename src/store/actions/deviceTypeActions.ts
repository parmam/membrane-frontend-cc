// src/store/actions/newDeviceTypeActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';

import { DeviceTypeService } from '../../api/services';
import type {
  DeviceType,
  DeviceTypeQueryParams,
  PaginatedResponse,
  ThunkApiConfig,
} from '../types/ApiTypes';

// =======================
// GET DEVICE TYPES (PAGINATED)
// =======================

export const getDeviceTypesThunk = createAsyncThunk<
  PaginatedResponse<DeviceType>,
  DeviceTypeQueryParams | undefined,
  ThunkApiConfig
>('deviceTypes/getDeviceTypesThunk', async (params, { rejectWithValue }) => {
  try {
    const response = await DeviceTypeService.getDeviceTypes(params);
    return response as unknown as PaginatedResponse<DeviceType>;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch device types';
    return rejectWithValue(message);
  }
});
