// src/store/reducers/mapSlice.ts
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  addDeviceToMapThunk,
  createMapThunk,
  deleteMapThunk,
  getMapByIdThunk,
  getMapsThunk,
  removeDeviceFromMapThunk,
  restoreMapThunk,
} from '../actions/mapActions';
import type { DeviceOnMap, Map, PaginatedResponse } from '../types/ApiTypes';
import type { MapLoadingState } from '../types/LoadingTypes';

// =======================
// STATE INTERFACE
// =======================

export interface MapState {
  // Data
  maps: Map[];
  selectedMap: Map | null;

  // Pagination
  total: number;
  currentPage: number;
  pageSize: number;

  // Loading states
  loading: MapLoadingState;

  // Error state
  error: string | null;
}

// =======================
// INITIAL STATE
// =======================

const initialLoadingState: MapLoadingState = {
  getMapsThunk: false,
  getMapByIdThunk: false,
  createMapThunk: false,
  deleteMapThunk: false,
  restoreMapThunk: false,
  addDeviceToMapThunk: false,
  removeDeviceFromMapThunk: false,
};

const initialState: MapState = {
  maps: [],
  selectedMap: null,
  total: 0,
  currentPage: 1,
  pageSize: 10,
  loading: initialLoadingState,
  error: null,
};

// =======================
// SLICE
// =======================

const mapSlice = createSlice({
  name: 'maps',
  initialState,
  reducers: {
    clearSelectedMap: (state) => {
      state.selectedMap = null;
    },
    clearMapError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // GET ALL (paginated)
    builder
      .addCase(getMapsThunk.pending, (state) => {
        state.loading.getMapsThunk = true;
        state.error = null;
      })
      .addCase(getMapsThunk.fulfilled, (state, action: PayloadAction<PaginatedResponse<Map>>) => {
        state.loading.getMapsThunk = false;
        state.maps = action.payload.data;
        state.total = action.payload.total;
        state.currentPage = action.payload.offset / action.payload.limit + 1;
        state.pageSize = action.payload.limit;
      })
      .addCase(getMapsThunk.rejected, (state, action) => {
        state.loading.getMapsThunk = false;
        state.error = (action.payload as string) || 'Failed to fetch maps.';
      });

    // GET BY ID
    builder
      .addCase(getMapByIdThunk.pending, (state) => {
        state.loading.getMapByIdThunk = true;
        state.error = null;
      })
      .addCase(getMapByIdThunk.fulfilled, (state, action: PayloadAction<Map>) => {
        state.loading.getMapByIdThunk = false;
        state.selectedMap = action.payload;
      })
      .addCase(getMapByIdThunk.rejected, (state, action) => {
        state.loading.getMapByIdThunk = false;
        state.error = (action.payload as string) || 'Failed to fetch map.';
      });

    // CREATE
    builder
      .addCase(createMapThunk.pending, (state) => {
        state.loading.createMapThunk = true;
        state.error = null;
      })
      .addCase(createMapThunk.fulfilled, (state, action: PayloadAction<Map>) => {
        state.loading.createMapThunk = false;
        state.maps.unshift(action.payload);
        state.total += 1;
      })
      .addCase(createMapThunk.rejected, (state, action) => {
        state.loading.createMapThunk = false;
        state.error = (action.payload as string) || 'Failed to create map.';
      });

    // DELETE
    builder
      .addCase(deleteMapThunk.pending, (state) => {
        state.loading.deleteMapThunk = true;
        state.error = null;
      })
      .addCase(deleteMapThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading.deleteMapThunk = false;
        state.maps = state.maps.filter((m) => m.id !== action.payload);
        state.total -= 1;
      })
      .addCase(deleteMapThunk.rejected, (state, action) => {
        state.loading.deleteMapThunk = false;
        state.error = (action.payload as string) || 'Failed to delete map.';
      });

    // RESTORE
    builder
      .addCase(restoreMapThunk.pending, (state) => {
        state.loading.restoreMapThunk = true;
        state.error = null;
      })
      .addCase(restoreMapThunk.fulfilled, (state, action: PayloadAction<Map>) => {
        state.loading.restoreMapThunk = false;
        const index = state.maps.findIndex((m) => m.id === action.payload.id);
        if (index !== -1) {
          state.maps[index] = action.payload;
        } else {
          state.maps.unshift(action.payload);
          state.total += 1;
        }
      })
      .addCase(restoreMapThunk.rejected, (state, action) => {
        state.loading.restoreMapThunk = false;
        state.error = (action.payload as string) || 'Failed to restore map.';
      });

    // ADD DEVICE
    builder
      .addCase(addDeviceToMapThunk.pending, (state) => {
        state.loading.addDeviceToMapThunk = true;
        state.error = null;
      })
      .addCase(addDeviceToMapThunk.fulfilled, (state, action: PayloadAction<DeviceOnMap>) => {
        state.loading.addDeviceToMapThunk = false;
        if (state.selectedMap && state.selectedMap.devices) {
          state.selectedMap.devices.push(action.payload);
        }
      })
      .addCase(addDeviceToMapThunk.rejected, (state, action) => {
        state.loading.addDeviceToMapThunk = false;
        state.error = (action.payload as string) || 'Failed to add device to map.';
      });

    // REMOVE DEVICE
    builder
      .addCase(removeDeviceFromMapThunk.pending, (state) => {
        state.loading.removeDeviceFromMapThunk = true;
        state.error = null;
      })
      .addCase(removeDeviceFromMapThunk.fulfilled, (state, action) => {
        state.loading.removeDeviceFromMapThunk = false;
        if (state.selectedMap && state.selectedMap.devices) {
          state.selectedMap.devices = state.selectedMap.devices.filter(
            (d) => d.id !== action.meta.arg.deviceMapId,
          );
        }
      })
      .addCase(removeDeviceFromMapThunk.rejected, (state, action) => {
        state.loading.removeDeviceFromMapThunk = false;
        state.error = (action.payload as string) || 'Failed to remove device from map.';
      });
  },
});

// =======================
// EXPORTS
// =======================

// Actions
export const { clearSelectedMap, clearMapError } = mapSlice.actions;

// Selectors
export const selectMaps = (state: { maps: MapState }) => state.maps.maps;
export const selectSelectedMap = (state: { maps: MapState }) => state.maps.selectedMap;
export const selectMapLoading = (state: { maps: MapState }) => state.maps.loading;
export const selectMapError = (state: { maps: MapState }) => state.maps.error;
export const selectMapPagination = (state: { maps: MapState }) => ({
  total: state.maps.total,
  currentPage: state.maps.currentPage,
  pageSize: state.maps.pageSize,
});

// Reducer
export default mapSlice.reducer;
