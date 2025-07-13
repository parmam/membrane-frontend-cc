// src/store/actions/newDeviceStatusActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';

import { DeviceStatusService } from '../../api/services';
import type {
  DeviceStatus,
  DeviceStatusQueryParams,
  PaginatedResponse,
  ThunkApiConfig,
} from '../types/ApiTypes';

// =======================
// GET DEVICE STATUSES (PAGINATED)
// =======================

export const getDeviceStatusesThunk = createAsyncThunk<
  PaginatedResponse<DeviceStatus>,
  DeviceStatusQueryParams | undefined,
  ThunkApiConfig
>('deviceStatuses/getDeviceStatusesThunk', async (params, { rejectWithValue }) => {
  try {
    const response = await DeviceStatusService.getDeviceStatuses(params);
    return response as unknown as PaginatedResponse<DeviceStatus>;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch device statuses';
    return rejectWithValue(message);
  }
});
