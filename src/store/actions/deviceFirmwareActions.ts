// src/store/actions/newDeviceFirmwareActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';

import { DeviceFirmwareService } from '../../api/services';
import type {
  CreateDeviceFirmwareRequest,
  DeviceFirmware,
  DeviceFirmwareQueryParams,
  PaginatedResponse,
  ThunkApiConfig,
  UpdateDeviceFirmwareRequest,
} from '../types/ApiTypes';

// =======================
// GET DEVICE FIRMWARES (PAGINATED)
// =======================

export const getDeviceFirmwaresThunk = createAsyncThunk<
  PaginatedResponse<DeviceFirmware>,
  DeviceFirmwareQueryParams | undefined,
  ThunkApiConfig
>('deviceFirmwares/getDeviceFirmwaresThunk', async (params, { rejectWithValue }) => {
  try {
    const response = await DeviceFirmwareService.getDeviceFirmwares(params);
    return response as unknown as PaginatedResponse<DeviceFirmware>;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch device firmwares';
    return rejectWithValue(message);
  }
});

// =======================
// GET DEVICE FIRMWARE BY ID
// =======================

export const getDeviceFirmwareByIdThunk = createAsyncThunk<DeviceFirmware, string, ThunkApiConfig>(
  'deviceFirmwares/getDeviceFirmwareByIdThunk',
  async (id, { rejectWithValue }) => {
    try {
      const response = await DeviceFirmwareService.getDeviceFirmwareById(id);
      return response as unknown as DeviceFirmware;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch device firmware';
      return rejectWithValue(message);
    }
  },
);

// =======================
// CREATE DEVICE FIRMWARE
// =======================

export const createDeviceFirmwareThunk = createAsyncThunk<
  DeviceFirmware,
  CreateDeviceFirmwareRequest,
  ThunkApiConfig
>('deviceFirmwares/createDeviceFirmwareThunk', async (firmwareData, { rejectWithValue }) => {
  try {
    const response = await DeviceFirmwareService.createDeviceFirmware(firmwareData);
    return response as unknown as DeviceFirmware;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create device firmware';
    return rejectWithValue(message);
  }
});

// =======================
// UPDATE DEVICE FIRMWARE
// =======================

export const updateDeviceFirmwareThunk = createAsyncThunk<
  DeviceFirmware,
  { id: string; firmwareData: UpdateDeviceFirmwareRequest },
  ThunkApiConfig
>(
  'deviceFirmwares/updateDeviceFirmwareThunk',
  async ({ id, firmwareData }, { rejectWithValue }) => {
    try {
      const response = await DeviceFirmwareService.updateDeviceFirmware(id, firmwareData);
      return response as unknown as DeviceFirmware;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update device firmware';
      return rejectWithValue(message);
    }
  },
);

// =======================
// DELETE DEVICE FIRMWARE
// =======================

export const deleteDeviceFirmwareThunk = createAsyncThunk<string, string, ThunkApiConfig>(
  'deviceFirmwares/deleteDeviceFirmwareThunk',
  async (id, { rejectWithValue }) => {
    try {
      await DeviceFirmwareService.deleteDeviceFirmware(id);
      return id;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete device firmware';
      return rejectWithValue(message);
    }
  },
);

// =======================
// RESTORE DEVICE FIRMWARE
// =======================

export const restoreDeviceFirmwareThunk = createAsyncThunk<DeviceFirmware, string, ThunkApiConfig>(
  'deviceFirmwares/restoreDeviceFirmwareThunk',
  async (id, { rejectWithValue }) => {
    try {
      const response = await DeviceFirmwareService.restoreDeviceFirmware(id);
      return response as unknown as DeviceFirmware;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to restore device firmware';
      return rejectWithValue(message);
    }
  },
);
