// src/store/actions/newMapActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';

import { MapService } from '../../api/services';
import type {
  AddDeviceToMapRequest,
  CreateMapRequest,
  DeviceOnMap,
  Map,
  MapQueryParams,
  PaginatedResponse,
  ThunkApiConfig,
} from '../types/ApiTypes';

// =======================
// GET MAPS (PAGINATED)
// =======================

export const getMapsThunk = createAsyncThunk<
  PaginatedResponse<Map>,
  MapQueryParams | undefined,
  ThunkApiConfig
>('maps/getMapsThunk', async (params, { rejectWithValue }) => {
  try {
    const response = await MapService.getMaps(params);
    return response as unknown as PaginatedResponse<Map>;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch maps';
    return rejectWithValue(message);
  }
});

// =======================
// GET MAP BY ID
// =======================

export const getMapByIdThunk = createAsyncThunk<Map, string, ThunkApiConfig>(
  'maps/getMapByIdThunk',
  async (id, { rejectWithValue }) => {
    try {
      const response = await MapService.getMapById(id);
      return response as unknown as Map;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch map';
      return rejectWithValue(message);
    }
  },
);

// =======================
// CREATE MAP
// =======================

export const createMapThunk = createAsyncThunk<Map, CreateMapRequest, ThunkApiConfig>(
  'maps/createMapThunk',
  async (mapData, { rejectWithValue }) => {
    try {
      const response = await MapService.createMap(mapData);
      return response as unknown as Map;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create map';
      return rejectWithValue(message);
    }
  },
);

// =======================
// DELETE MAP
// =======================

export const deleteMapThunk = createAsyncThunk<string, string, ThunkApiConfig>(
  'maps/deleteMapThunk',
  async (id, { rejectWithValue }) => {
    try {
      await MapService.deleteMap(id);
      return id;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete map';
      return rejectWithValue(message);
    }
  },
);

// =======================
// RESTORE MAP
// =======================

export const restoreMapThunk = createAsyncThunk<Map, string, ThunkApiConfig>(
  'maps/restoreMapThunk',
  async (id, { rejectWithValue }) => {
    try {
      const response = await MapService.restoreMap(id);
      return response as unknown as Map;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to restore map';
      return rejectWithValue(message);
    }
  },
);

// =======================
// ADD DEVICE TO MAP
// =======================

export const addDeviceToMapThunk = createAsyncThunk<
  DeviceOnMap,
  { id: string; deviceData: AddDeviceToMapRequest },
  ThunkApiConfig
>('maps/addDeviceToMapThunk', async ({ id, deviceData }, { rejectWithValue }) => {
  try {
    const response = await MapService.addDeviceToMap(id, deviceData);
    return response as unknown as DeviceOnMap;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to add device to map';
    return rejectWithValue(message);
  }
});

// =======================
// REMOVE DEVICE FROM MAP
// =======================

export const removeDeviceFromMapThunk = createAsyncThunk<
  void,
  { mapId: string; deviceMapId: string },
  ThunkApiConfig
>('maps/removeDeviceFromMapThunk', async ({ mapId, deviceMapId }, { rejectWithValue }) => {
  try {
    await MapService.removeDeviceFromMap(mapId, deviceMapId);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to remove device from map';
    return rejectWithValue(message);
  }
});
