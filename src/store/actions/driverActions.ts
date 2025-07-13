// src/store/actions/newDriverActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';

import { DriverService } from '../../api/services';
import type {
  Driver,
  DriverQueryParams,
  PaginatedResponse,
  ThunkApiConfig,
} from '../types/ApiTypes';

// =======================
// GET DRIVERS (PAGINATED)
// =======================

export const getDriversThunk = createAsyncThunk<
  PaginatedResponse<Driver>,
  DriverQueryParams | undefined,
  ThunkApiConfig
>('drivers/getDriversThunk', async (params, { rejectWithValue }) => {
  try {
    const response = await DriverService.getDrivers(params);
    return response as unknown as PaginatedResponse<Driver>;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch drivers';
    return rejectWithValue(message);
  }
});
