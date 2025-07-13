// src/store/actions/newDeviceModelActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';

import { DeviceModelService } from '../../api/services';
import type {
  CreateDeviceModelRequest,
  DeviceModel,
  DeviceModelQueryParams,
  PaginatedResponse,
  ThunkApiConfig,
  UpdateDeviceModelRequest,
} from '../types/ApiTypes';

// ========================
// GET DEVICE MODELS (PAGINATED)
// ========================

export const getDeviceModelsThunk = createAsyncThunk<
  PaginatedResponse<DeviceModel>,
  DeviceModelQueryParams | undefined,
  ThunkApiConfig
>('deviceModels/getDeviceModelsThunk', async (params, { rejectWithValue }) => {
  try {
    const response = await DeviceModelService.getDeviceModels(params);
    return response as unknown as PaginatedResponse<DeviceModel>;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch device models';
    return rejectWithValue(message);
  }
});

// ========================
// GET DEVICE MODEL BY ID
// ========================

export const getDeviceModelByIdThunk = createAsyncThunk<DeviceModel, string, ThunkApiConfig>(
  'deviceModels/getDeviceModelByIdThunk',
  async (id, { rejectWithValue }) => {
    try {
      const response = await DeviceModelService.getDeviceModelById(id);
      return response as unknown as DeviceModel;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch device model';
      return rejectWithValue(message);
    }
  },
);

// ========================
// CREATE DEVICE MODEL
// ========================

export const createDeviceModelThunk = createAsyncThunk<
  DeviceModel,
  CreateDeviceModelRequest,
  ThunkApiConfig
>('deviceModels/createDeviceModelThunk', async (deviceModelData, { rejectWithValue }) => {
  try {
    const response = await DeviceModelService.createDeviceModel(deviceModelData);
    return response as unknown as DeviceModel;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create device model';
    return rejectWithValue(message);
  }
});

// ========================
// UPDATE DEVICE MODEL
// ========================

export const updateDeviceModelThunk = createAsyncThunk<
  DeviceModel,
  { id: string; deviceModelData: UpdateDeviceModelRequest },
  ThunkApiConfig
>('deviceModels/updateDeviceModelThunk', async ({ id, deviceModelData }, { rejectWithValue }) => {
  try {
    const response = await DeviceModelService.updateDeviceModel(id, deviceModelData);
    return response as unknown as DeviceModel;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update device model';
    return rejectWithValue(message);
  }
});

// ========================
// DELETE DEVICE MODEL
// ========================

export const deleteDeviceModelThunk = createAsyncThunk<string, string, ThunkApiConfig>(
  'deviceModels/deleteDeviceModelThunk',
  async (id, { rejectWithValue }) => {
    try {
      await DeviceModelService.deleteDeviceModel(id);
      return id;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete device model';
      return rejectWithValue(message);
    }
  },
);

// ========================
// RESTORE DEVICE MODEL
// ========================

export const restoreDeviceModelThunk = createAsyncThunk<DeviceModel, string, ThunkApiConfig>(
  'deviceModels/restoreDeviceModelThunk',
  async (id, { rejectWithValue }) => {
    try {
      const response = await DeviceModelService.restoreDeviceModel(id);
      return response as unknown as DeviceModel;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to restore device model';
      return rejectWithValue(message);
    }
  },
);
