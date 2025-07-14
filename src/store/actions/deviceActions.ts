// src/store/actions/deviceActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';

import { DeviceService } from '../../api/services';
import type {
  CreateDeviceRequest,
  Device,
  DeviceQueryParams,
  PaginatedResponse,
  ThunkApiConfig,
  UpdateDeviceRequest,
} from '../types/ApiTypes';
import { parseError } from '../types/ErrorTypes';

// ========================
// GET DEVICES (PAGINATED)
// ========================

export const getDevicesThunk = createAsyncThunk<
  PaginatedResponse<Device>,
  DeviceQueryParams | undefined,
  ThunkApiConfig
>('devices/getDevicesThunk', async (params, { rejectWithValue }) => {
  try {
    const response = await DeviceService.getDevices(params);
    return response as unknown as PaginatedResponse<Device>;
  } catch (error) {
    return rejectWithValue(parseError(error));
  }
});

// ========================
// GET DEVICE BY ID
// ========================

export const getDeviceByIdThunk = createAsyncThunk<Device, string, ThunkApiConfig>(
  'devices/getDeviceByIdThunk',
  async (id, { rejectWithValue }) => {
    try {
      const response = await DeviceService.getDeviceById(id);
      return response as unknown as Device;
    } catch (error) {
      return rejectWithValue(parseError(error));
    }
  },
);

// ========================
// CREATE DEVICE
// ========================

export const createDeviceThunk = createAsyncThunk<Device, CreateDeviceRequest, ThunkApiConfig>(
  'devices/createDeviceThunk',
  async (deviceData, { rejectWithValue }) => {
    try {
      const response = await DeviceService.createDevice(deviceData);
      return response as unknown as Device;
    } catch (error) {
      return rejectWithValue(parseError(error));
    }
  },
);

// ========================
// UPDATE DEVICE
// ========================

export const updateDeviceThunk = createAsyncThunk<
  Device,
  { id: string; deviceData: UpdateDeviceRequest },
  ThunkApiConfig
>('devices/updateDeviceThunk', async ({ id, deviceData }, { rejectWithValue }) => {
  try {
    const response = await DeviceService.updateDevice(id, deviceData);
    return response as unknown as Device;
  } catch (error) {
    return rejectWithValue(parseError(error));
  }
});

// ========================
// DELETE DEVICE
// ========================

export const deleteDeviceThunk = createAsyncThunk<string, string, ThunkApiConfig>(
  'devices/deleteDeviceThunk',
  async (id, { rejectWithValue }) => {
    try {
      await DeviceService.deleteDevice(id);
      return id;
    } catch (error) {
      return rejectWithValue(parseError(error));
    }
  },
);

// ========================
// RESTORE DEVICE
// ========================

export const restoreDeviceThunk = createAsyncThunk<Device, string, ThunkApiConfig>(
  'devices/restoreDeviceThunk',
  async (id, { rejectWithValue }) => {
    try {
      const response = await DeviceService.restoreDevice(id);
      return response as unknown as Device;
    } catch (error) {
      return rejectWithValue(parseError(error));
    }
  },
);
