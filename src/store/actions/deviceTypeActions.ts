// src/store/actions/deviceTypeActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';

import { DeviceTypeService } from '../../api/services';
import type {
  DeviceType,
  DeviceTypeQueryParams,
  PaginatedResponse,
  ThunkApiConfig,
} from '../types/ApiTypes';
import { parseError } from '../types/ErrorTypes';

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
    return rejectWithValue(parseError(error));
  }
});
