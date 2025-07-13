// src/store/reducers/deviceSlice.ts
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  createDeviceThunk,
  deleteDeviceThunk,
  getDeviceByIdThunk,
  getDevicesThunk,
  restoreDeviceThunk,
  updateDeviceThunk,
} from '../actions/deviceActions';
import type { Device, PaginatedResponse } from '../types/ApiTypes';
import type { DeviceLoadingState } from '../types/LoadingTypes';

// =======================
// STATE INTERFACE
// =======================

export interface DeviceState {
  // Data
  devices: Device[];
  selectedDevice: Device | null;

  // Pagination
  total: number;
  currentPage: number;
  pageSize: number;

  // Loading states
  loading: DeviceLoadingState;

  // Error state
  error: string | null;
}

// =======================
// INITIAL STATE
// =======================

const initialLoadingState: DeviceLoadingState = {
  getDevicesThunk: false,
  getDeviceByIdThunk: false,
  createDeviceThunk: false,
  updateDeviceThunk: false,
  deleteDeviceThunk: false,
  restoreDeviceThunk: false,
};

const initialState: DeviceState = {
  devices: [],
  selectedDevice: null,
  total: 0,
  currentPage: 1,
  pageSize: 10,
  loading: initialLoadingState,
  error: null,
};

// =======================
// SLICE
// =======================

const deviceSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    clearSelectedDevice: (state) => {
      state.selectedDevice = null;
    },
    clearDeviceError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Shared pending and rejected states
    const handlePending = (state: DeviceState, action: { type: string }) => {
      const thunkName = action.type.split('/')[1];
      state.loading[thunkName as keyof DeviceLoadingState] = true;
      state.error = null;
    };

    const handleRejected = (state: DeviceState, action: PayloadAction<string>) => {
      const thunkName = action.type.split('/')[1];
      state.loading[thunkName as keyof DeviceLoadingState] = false;
      state.error = action.payload;
    };

    // GET ALL (paginated)
    builder.addCase(
      getDevicesThunk.fulfilled,
      (state, action: PayloadAction<PaginatedResponse<Device>>) => {
        state.devices = action.payload.data;
        state.total = action.payload.total;
        state.currentPage = action.payload.offset / action.payload.limit + 1;
        state.pageSize = action.payload.limit;
        state.loading.getDevicesThunk = false;
      },
    );

    // GET BY ID
    builder.addCase(getDeviceByIdThunk.fulfilled, (state, action: PayloadAction<Device>) => {
      state.selectedDevice = action.payload;
      state.loading.getDeviceByIdThunk = false;
    });

    // CREATE
    builder.addCase(createDeviceThunk.fulfilled, (state, action: PayloadAction<Device>) => {
      state.devices.unshift(action.payload);
      state.total += 1;
      state.loading.createDeviceThunk = false;
    });

    // UPDATE
    builder.addCase(updateDeviceThunk.fulfilled, (state, action: PayloadAction<Device>) => {
      const index = state.devices.findIndex((d) => d.id === action.payload.id);
      if (index !== -1) {
        state.devices[index] = action.payload;
      }
      if (state.selectedDevice?.id === action.payload.id) {
        state.selectedDevice = action.payload;
      }
      state.loading.updateDeviceThunk = false;
    });

    // DELETE
    builder.addCase(deleteDeviceThunk.fulfilled, (state, action: PayloadAction<string>) => {
      state.devices = state.devices.filter((d) => d.id !== action.payload);
      state.total -= 1;
      state.loading.deleteDeviceThunk = false;
    });

    // RESTORE
    builder.addCase(restoreDeviceThunk.fulfilled, (state, action: PayloadAction<Device>) => {
      // Assuming a restored device might not be in the current list,
      // we can either add it or leave it to be fetched again.
      // For now, let's update it if it exists, similar to update.
      const index = state.devices.findIndex((d) => d.id === action.payload.id);
      if (index !== -1) {
        state.devices[index] = action.payload;
      } else {
        // Or add it to the list if not present
        state.devices.unshift(action.payload);
        state.total += 1;
      }
      if (state.selectedDevice?.id === action.payload.id) {
        state.selectedDevice = action.payload;
      }
      state.loading.restoreDeviceThunk = false;
    });

    // Add matchers for pending and rejected actions
    builder
      .addMatcher((action) => action.type.endsWith('/pending'), handlePending)
      .addMatcher((action) => action.type.endsWith('/rejected'), handleRejected);
  },
});

// =======================
// EXPORTS
// =======================

// Actions
export const { clearSelectedDevice, clearDeviceError } = deviceSlice.actions;

// Selectors
export const selectDevices = (state: { devices: DeviceState }) => state.devices.devices;
export const selectSelectedDevice = (state: { devices: DeviceState }) =>
  state.devices.selectedDevice;
export const selectDeviceLoading = (state: { devices: DeviceState }) => state.devices.loading;
export const selectDeviceError = (state: { devices: DeviceState }) => state.devices.error;
export const selectDevicePagination = (state: { devices: DeviceState }) => ({
  total: state.devices.total,
  currentPage: state.devices.currentPage,
  pageSize: state.devices.pageSize,
});

// Reducer
export default deviceSlice.reducer;
