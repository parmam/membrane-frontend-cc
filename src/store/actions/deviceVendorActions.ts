// src/store/actions/newDeviceVendorActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';

import { DeviceVendorService } from '../../api/services';
import type {
  CreateDeviceVendorRequest,
  DeviceVendor,
  DeviceVendorQueryParams,
  PaginatedResponse,
  ThunkApiConfig,
  UpdateDeviceVendorRequest,
} from '../types/ApiTypes';

// =======================
// GET DEVICE VENDORS (PAGINATED)
// =======================

export const getDeviceVendorsThunk = createAsyncThunk<
  PaginatedResponse<DeviceVendor>,
  DeviceVendorQueryParams | undefined,
  ThunkApiConfig
>('deviceVendors/getDeviceVendorsThunk', async (params, { rejectWithValue }) => {
  try {
    const response = await DeviceVendorService.getDeviceVendors(params);
    return response as unknown as PaginatedResponse<DeviceVendor>;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch device vendors';
    return rejectWithValue(message);
  }
});

// =======================
// GET DEVICE VENDOR BY ID
// =======================

export const getDeviceVendorByIdThunk = createAsyncThunk<DeviceVendor, string, ThunkApiConfig>(
  'deviceVendors/getDeviceVendorByIdThunk',
  async (id, { rejectWithValue }) => {
    try {
      const response = await DeviceVendorService.getDeviceVendorById(id);
      return response as unknown as DeviceVendor;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch device vendor';
      return rejectWithValue(message);
    }
  },
);

// =======================
// CREATE DEVICE VENDOR
// =======================

export const createDeviceVendorThunk = createAsyncThunk<
  DeviceVendor,
  CreateDeviceVendorRequest,
  ThunkApiConfig
>('deviceVendors/createDeviceVendorThunk', async (vendorData, { rejectWithValue }) => {
  try {
    const response = await DeviceVendorService.createDeviceVendor(vendorData);
    return response as unknown as DeviceVendor;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create device vendor';
    return rejectWithValue(message);
  }
});

// =======================
// UPDATE DEVICE VENDOR
// =======================

export const updateDeviceVendorThunk = createAsyncThunk<
  DeviceVendor,
  { id: string; vendorData: UpdateDeviceVendorRequest },
  ThunkApiConfig
>('deviceVendors/updateDeviceVendorThunk', async ({ id, vendorData }, { rejectWithValue }) => {
  try {
    const response = await DeviceVendorService.updateDeviceVendor(id, vendorData);
    return response as unknown as DeviceVendor;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update device vendor';
    return rejectWithValue(message);
  }
});

// =======================
// DELETE DEVICE VENDOR
// =======================

export const deleteDeviceVendorThunk = createAsyncThunk<string, string, ThunkApiConfig>(
  'deviceVendors/deleteDeviceVendorThunk',
  async (id, { rejectWithValue }) => {
    try {
      await DeviceVendorService.deleteDeviceVendor(id);
      return id;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete device vendor';
      return rejectWithValue(message);
    }
  },
);

// =======================
// RESTORE DEVICE VENDOR
// =======================

export const restoreDeviceVendorThunk = createAsyncThunk<DeviceVendor, string, ThunkApiConfig>(
  'deviceVendors/restoreDeviceVendorThunk',
  async (id, { rejectWithValue }) => {
    try {
      const response = await DeviceVendorService.restoreDeviceVendor(id);
      return response as unknown as DeviceVendor;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to restore device vendor';
      return rejectWithValue(message);
    }
  },
);
