// src/store/actions/deviceMonitoringActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';

import { DeviceMonitoringService } from '../../api/services';
import type {
  DeviceMonitoring,
  DeviceMonitoringQueryParams,
  GetLastStatusByDeviceRequest,
  GetUptimeFilters,
  LastStatusQueryParams,
  PaginatedResponse,
  ThunkApiConfig,
} from '../types/ApiTypes';
import { parseError } from '../types/ErrorTypes';
import { getDevicesThunk } from './deviceActions';
import { getDeviceStatusesThunk } from './deviceStatusActions';
import { getDeviceTypesThunk } from './deviceTypeActions';
import { getDeviceVendorsThunk } from './deviceVendorActions';
import { getGroupsThunk } from './groupActions';
import { getPlacesThunk } from './placeActions';

// =======================
// GET DEVICE MONITORING (PAGINATED)
// =======================

export const getDeviceMonitoringThunk = createAsyncThunk<
  PaginatedResponse<DeviceMonitoring>,
  DeviceMonitoringQueryParams | undefined,
  ThunkApiConfig
>('deviceMonitoring/getDeviceMonitoringThunk', async (params, { rejectWithValue }) => {
  try {
    const response = await DeviceMonitoringService.getDeviceMonitoring(params);
    return response as unknown as PaginatedResponse<DeviceMonitoring>;
  } catch (error) {
    return rejectWithValue(parseError(error));
  }
});

// =======================
// GET LAST STATUS
// =======================

export const getLastStatusThunk = createAsyncThunk<
  DeviceMonitoring[],
  LastStatusQueryParams,
  ThunkApiConfig
>('deviceMonitoring/getLastStatusThunk', async (params, { rejectWithValue }) => {
  try {
    const response = await DeviceMonitoringService.getLastStatus(params);
    return response as unknown as DeviceMonitoring[];
  } catch (error) {
    return rejectWithValue(parseError(error));
  }
});

// =======================
// GET LAST STATUS BY ID
// =======================

export const getLastStatusByIdThunk = createAsyncThunk<
  DeviceMonitoring[],
  GetLastStatusByDeviceRequest,
  ThunkApiConfig
>('deviceMonitoring/getLastStatusByIdThunk', async (deviceData, { rejectWithValue }) => {
  try {
    const response = await DeviceMonitoringService.getLastStatusById(deviceData);
    return response as unknown as DeviceMonitoring[];
  } catch (error) {
    return rejectWithValue(parseError(error));
  }
});

// =======================
// GET UPTIME
// =======================

export const getUptimeThunk = createAsyncThunk<
  unknown, // The return type is not defined in the openapi spec
  GetUptimeFilters,
  ThunkApiConfig
>('deviceMonitoring/getUptimeThunk', async (filters, { rejectWithValue }) => {
  try {
    const response = await DeviceMonitoringService.getUptime(filters);
    return response;
  } catch (error) {
    return rejectWithValue(parseError(error));
  }
});

// =======================
// GET MONITORING PAGE INITIAL DATA
// =======================

export const getMonitoringPageInitialDataThunk = createAsyncThunk<void, void, ThunkApiConfig>(
  'deviceMonitoring/getMonitoringPageInitialDataThunk',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await Promise.all([
        dispatch(getDeviceMonitoringThunk({ limit: 10, offset: 0, withTrashed: 1 })),
        dispatch(getDevicesThunk({ limit: 99, offset: 0, withTrashed: 0 })),
        dispatch(getDeviceStatusesThunk({ limit: 99, offset: 0, withTrashed: 0 })),
        dispatch(getDeviceTypesThunk({ limit: 99, offset: 0, withTrashed: 0 })),
        dispatch(getDeviceVendorsThunk({ limit: 99, offset: 0, withTrashed: 0 })),
        dispatch(getGroupsThunk({ limit: 99, offset: 0, withTrashed: 0 })),
        dispatch(getPlacesThunk({ limit: 99, offset: 0, withTrashed: 0 })),
      ]);
    } catch (error) {
      return rejectWithValue(parseError(error));
    }
  },
);
