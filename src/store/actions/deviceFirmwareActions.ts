// src/store/actions/deviceFirmwareActions.ts
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
import { parseError } from '../types/ErrorTypes';

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
    return rejectWithValue(parseError(error));
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
      return rejectWithValue(parseError(error));
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
    return rejectWithValue(parseError(error));
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
      return rejectWithValue(parseError(error));
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
      return rejectWithValue(parseError(error));
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
      return rejectWithValue(parseError(error));
    }
  },
);
