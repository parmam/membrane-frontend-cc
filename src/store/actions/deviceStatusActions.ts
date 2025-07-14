// src/store/actions/deviceStatusActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';

import { DeviceStatusService } from '../../api/services';
import type {
  DeviceStatus,
  DeviceStatusQueryParams,
  PaginatedResponse,
  ThunkApiConfig,
} from '../types/ApiTypes';
import { parseError } from '../types/ErrorTypes';

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
    return rejectWithValue(parseError(error));
  }
});
