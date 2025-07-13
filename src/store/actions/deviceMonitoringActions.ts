// src/store/actions/newDeviceMonitoringActions.ts
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
    const message = error instanceof Error ? error.message : 'Failed to fetch device monitoring';
    return rejectWithValue(message);
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
    const message = error instanceof Error ? error.message : 'Failed to fetch last status';
    return rejectWithValue(message);
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
    const message = error instanceof Error ? error.message : 'Failed to fetch last status by id';
    return rejectWithValue(message);
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
    const message = error instanceof Error ? error.message : 'Failed to fetch uptime';
    return rejectWithValue(message);
  }
});
