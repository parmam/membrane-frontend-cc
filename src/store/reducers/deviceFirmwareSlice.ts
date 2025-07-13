// src/store/reducers/deviceFirmwareSlice.ts
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  createDeviceFirmwareThunk,
  deleteDeviceFirmwareThunk,
  getDeviceFirmwareByIdThunk,
  getDeviceFirmwaresThunk,
  restoreDeviceFirmwareThunk,
  updateDeviceFirmwareThunk,
} from '../actions/deviceFirmwareActions';
import type { DeviceFirmware, PaginatedResponse } from '../types/ApiTypes';
import type { DeviceFirmwareLoadingState } from '../types/LoadingTypes';

// =======================
// STATE INTERFACE
// =======================

export interface DeviceFirmwareState {
  // Data
  firmwares: DeviceFirmware[];
  selectedFirmware: DeviceFirmware | null;

  // Pagination
  total: number;
  currentPage: number;
  pageSize: number;

  // Loading states
  loading: DeviceFirmwareLoadingState;

  // Error state
  error: string | null;
}

// =======================
// INITIAL STATE
// =======================

const initialLoadingState: DeviceFirmwareLoadingState = {
  getDeviceFirmwaresThunk: false,
  getDeviceFirmwareByIdThunk: false,
  createDeviceFirmwareThunk: false,
  updateDeviceFirmwareThunk: false,
  deleteDeviceFirmwareThunk: false,
  restoreDeviceFirmwareThunk: false,
};

const initialState: DeviceFirmwareState = {
  firmwares: [],
  selectedFirmware: null,
  total: 0,
  currentPage: 1,
  pageSize: 10,
  loading: initialLoadingState,
  error: null,
};

// =======================
// SLICE
// =======================

const deviceFirmwareSlice = createSlice({
  name: 'deviceFirmwares',
  initialState,
  reducers: {
    clearSelectedFirmware: (state) => {
      state.selectedFirmware = null;
    },
    clearFirmwareError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // GET ALL (paginated)
    builder
      .addCase(getDeviceFirmwaresThunk.pending, (state) => {
        state.loading.getDeviceFirmwaresThunk = true;
        state.error = null;
      })
      .addCase(
        getDeviceFirmwaresThunk.fulfilled,
        (state, action: PayloadAction<PaginatedResponse<DeviceFirmware>>) => {
          state.loading.getDeviceFirmwaresThunk = false;
          state.firmwares = action.payload.data;
          state.total = action.payload.total;
          state.currentPage = action.payload.offset / action.payload.limit + 1;
          state.pageSize = action.payload.limit;
        },
      )
      .addCase(getDeviceFirmwaresThunk.rejected, (state, action) => {
        state.loading.getDeviceFirmwaresThunk = false;
        state.error = (action.payload as string) || 'Failed to fetch firmwares.';
      });

    // GET BY ID
    builder
      .addCase(getDeviceFirmwareByIdThunk.pending, (state) => {
        state.loading.getDeviceFirmwareByIdThunk = true;
        state.error = null;
      })
      .addCase(
        getDeviceFirmwareByIdThunk.fulfilled,
        (state, action: PayloadAction<DeviceFirmware>) => {
          state.loading.getDeviceFirmwareByIdThunk = false;
          state.selectedFirmware = action.payload;
        },
      )
      .addCase(getDeviceFirmwareByIdThunk.rejected, (state, action) => {
        state.loading.getDeviceFirmwareByIdThunk = false;
        state.error = (action.payload as string) || 'Failed to fetch firmware.';
      });

    // CREATE
    builder
      .addCase(createDeviceFirmwareThunk.pending, (state) => {
        state.loading.createDeviceFirmwareThunk = true;
        state.error = null;
      })
      .addCase(
        createDeviceFirmwareThunk.fulfilled,
        (state, action: PayloadAction<DeviceFirmware>) => {
          state.loading.createDeviceFirmwareThunk = false;
          state.firmwares.unshift(action.payload);
          state.total += 1;
        },
      )
      .addCase(createDeviceFirmwareThunk.rejected, (state, action) => {
        state.loading.createDeviceFirmwareThunk = false;
        state.error = (action.payload as string) || 'Failed to create firmware.';
      });

    // UPDATE
    builder
      .addCase(updateDeviceFirmwareThunk.pending, (state) => {
        state.loading.updateDeviceFirmwareThunk = true;
        state.error = null;
      })
      .addCase(
        updateDeviceFirmwareThunk.fulfilled,
        (state, action: PayloadAction<DeviceFirmware>) => {
          state.loading.updateDeviceFirmwareThunk = false;
          const index = state.firmwares.findIndex((f) => f.id === action.payload.id);
          if (index !== -1) {
            state.firmwares[index] = action.payload;
          }
          if (state.selectedFirmware?.id === action.payload.id) {
            state.selectedFirmware = action.payload;
          }
        },
      )
      .addCase(updateDeviceFirmwareThunk.rejected, (state, action) => {
        state.loading.updateDeviceFirmwareThunk = false;
        state.error = (action.payload as string) || 'Failed to update firmware.';
      });

    // DELETE
    builder
      .addCase(deleteDeviceFirmwareThunk.pending, (state) => {
        state.loading.deleteDeviceFirmwareThunk = true;
        state.error = null;
      })
      .addCase(deleteDeviceFirmwareThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading.deleteDeviceFirmwareThunk = false;
        state.firmwares = state.firmwares.filter((f) => f.id !== action.payload);
        state.total -= 1;
      })
      .addCase(deleteDeviceFirmwareThunk.rejected, (state, action) => {
        state.loading.deleteDeviceFirmwareThunk = false;
        state.error = (action.payload as string) || 'Failed to delete firmware.';
      });

    // RESTORE
    builder
      .addCase(restoreDeviceFirmwareThunk.pending, (state) => {
        state.loading.restoreDeviceFirmwareThunk = true;
        state.error = null;
      })
      .addCase(
        restoreDeviceFirmwareThunk.fulfilled,
        (state, action: PayloadAction<DeviceFirmware>) => {
          state.loading.restoreDeviceFirmwareThunk = false;
          const index = state.firmwares.findIndex((f) => f.id === action.payload.id);
          if (index !== -1) {
            state.firmwares[index] = action.payload;
          } else {
            state.firmwares.unshift(action.payload);
            state.total += 1;
          }
        },
      )
      .addCase(restoreDeviceFirmwareThunk.rejected, (state, action) => {
        state.loading.restoreDeviceFirmwareThunk = false;
        state.error = (action.payload as string) || 'Failed to restore firmware.';
      });
  },
});

// =======================
// EXPORTS
// =======================

// Actions
export const { clearSelectedFirmware, clearFirmwareError } = deviceFirmwareSlice.actions;

// Selectors
export const selectFirmwares = (state: { deviceFirmwares: DeviceFirmwareState }) =>
  state.deviceFirmwares.firmwares;
export const selectSelectedFirmware = (state: { deviceFirmwares: DeviceFirmwareState }) =>
  state.deviceFirmwares.selectedFirmware;
export const selectFirmwareLoading = (state: { deviceFirmwares: DeviceFirmwareState }) =>
  state.deviceFirmwares.loading;
export const selectFirmwareError = (state: { deviceFirmwares: DeviceFirmwareState }) =>
  state.deviceFirmwares.error;
export const selectFirmwarePagination = (state: { deviceFirmwares: DeviceFirmwareState }) => ({
  total: state.deviceFirmwares.total,
  currentPage: state.deviceFirmwares.currentPage,
  pageSize: state.deviceFirmwares.pageSize,
});

// Reducer
export default deviceFirmwareSlice.reducer;
