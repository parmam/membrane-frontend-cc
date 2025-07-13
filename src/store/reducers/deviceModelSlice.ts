// src/store/reducers/deviceModelSlice.ts
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  createDeviceModelThunk,
  deleteDeviceModelThunk,
  getDeviceModelByIdThunk,
  getDeviceModelsThunk,
  restoreDeviceModelThunk,
  updateDeviceModelThunk,
} from '../actions/deviceModelActions';
import type { DeviceModel, PaginatedResponse } from '../types/ApiTypes';
import type { DeviceModelLoadingState } from '../types/LoadingTypes';

// ========================
// STATE INTERFACE
// ========================

export interface DeviceModelState {
  // Data
  deviceModels: DeviceModel[];
  selectedDeviceModel: DeviceModel | null;

  // Pagination
  total: number;
  currentPage: number;
  pageSize: number;

  // Loading states
  loading: DeviceModelLoadingState;

  // Error state
  error: string | null;
}

// ========================
// INITIAL STATE
// ========================

const initialLoadingState: DeviceModelLoadingState = {
  getDeviceModelsThunk: false,
  getDeviceModelByIdThunk: false,
  createDeviceModelThunk: false,
  updateDeviceModelThunk: false,
  deleteDeviceModelThunk: false,
  restoreDeviceModelThunk: false,
};

const initialState: DeviceModelState = {
  deviceModels: [],
  selectedDeviceModel: null,
  total: 0,
  currentPage: 1,
  pageSize: 10,
  loading: initialLoadingState,
  error: null,
};

// ========================
// SLICE
// ========================

const deviceModelSlice = createSlice({
  name: 'deviceModels',
  initialState,
  reducers: {
    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Clear selected device model
    clearSelectedDeviceModel: (state) => {
      state.selectedDeviceModel = null;
    },

    // Reset state
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    // ========================
    // GET DEVICE MODELS
    // ========================
    builder
      .addCase(getDeviceModelsThunk.pending, (state) => {
        state.loading.getDeviceModelsThunk = true;
        state.error = null;
      })
      .addCase(
        getDeviceModelsThunk.fulfilled,
        (state, action: PayloadAction<PaginatedResponse<DeviceModel>>) => {
          state.loading.getDeviceModelsThunk = false;
          state.deviceModels = action.payload.data;
          state.total = action.payload.total;
          state.currentPage = Math.floor(action.payload.offset / action.payload.limit) + 1;
          state.pageSize = action.payload.limit;
          state.error = null;
        },
      )
      .addCase(getDeviceModelsThunk.rejected, (state, action) => {
        state.loading.getDeviceModelsThunk = false;
        state.error = action.payload || 'Failed to fetch device models';
      })

      // ========================
      // GET DEVICE MODEL BY ID
      // ========================
      .addCase(getDeviceModelByIdThunk.pending, (state) => {
        state.loading.getDeviceModelByIdThunk = true;
        state.error = null;
      })
      .addCase(getDeviceModelByIdThunk.fulfilled, (state, action: PayloadAction<DeviceModel>) => {
        state.loading.getDeviceModelByIdThunk = false;
        state.selectedDeviceModel = action.payload;
        state.error = null;
      })
      .addCase(getDeviceModelByIdThunk.rejected, (state, action) => {
        state.loading.getDeviceModelByIdThunk = false;
        state.error = action.payload || 'Failed to fetch device model';
      })

      // ========================
      // CREATE DEVICE MODEL
      // ========================
      .addCase(createDeviceModelThunk.pending, (state) => {
        state.loading.createDeviceModelThunk = true;
        state.error = null;
      })
      .addCase(createDeviceModelThunk.fulfilled, (state, action: PayloadAction<DeviceModel>) => {
        state.loading.createDeviceModelThunk = false;
        state.deviceModels.unshift(action.payload);
        state.selectedDeviceModel = action.payload;
        state.total += 1;
        state.error = null;
      })
      .addCase(createDeviceModelThunk.rejected, (state, action) => {
        state.loading.createDeviceModelThunk = false;
        state.error = action.payload || 'Failed to create device model';
      })

      // ========================
      // UPDATE DEVICE MODEL
      // ========================
      .addCase(updateDeviceModelThunk.pending, (state) => {
        state.loading.updateDeviceModelThunk = true;
        state.error = null;
      })
      .addCase(updateDeviceModelThunk.fulfilled, (state, action: PayloadAction<DeviceModel>) => {
        state.loading.updateDeviceModelThunk = false;
        const index = state.deviceModels.findIndex(
          (deviceModel) => deviceModel.id === action.payload.id,
        );
        if (index !== -1) {
          state.deviceModels[index] = action.payload;
        }
        if (state.selectedDeviceModel?.id === action.payload.id) {
          state.selectedDeviceModel = action.payload;
        }
        state.error = null;
      })
      .addCase(updateDeviceModelThunk.rejected, (state, action) => {
        state.loading.updateDeviceModelThunk = false;
        state.error = action.payload || 'Failed to update device model';
      })

      // ========================
      // DELETE DEVICE MODEL
      // ========================
      .addCase(deleteDeviceModelThunk.pending, (state) => {
        state.loading.deleteDeviceModelThunk = true;
        state.error = null;
      })
      .addCase(deleteDeviceModelThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading.deleteDeviceModelThunk = false;
        state.deviceModels = state.deviceModels.filter(
          (deviceModel) => deviceModel.id !== action.payload,
        );
        if (state.selectedDeviceModel?.id === action.payload) {
          state.selectedDeviceModel = null;
        }
        state.total -= 1;
        state.error = null;
      })
      .addCase(deleteDeviceModelThunk.rejected, (state, action) => {
        state.loading.deleteDeviceModelThunk = false;
        state.error = action.payload || 'Failed to delete device model';
      })

      // ========================
      // RESTORE DEVICE MODEL
      // ========================
      .addCase(restoreDeviceModelThunk.pending, (state) => {
        state.loading.restoreDeviceModelThunk = true;
        state.error = null;
      })
      .addCase(restoreDeviceModelThunk.fulfilled, (state, action: PayloadAction<DeviceModel>) => {
        state.loading.restoreDeviceModelThunk = false;
        const index = state.deviceModels.findIndex(
          (deviceModel) => deviceModel.id === action.payload.id,
        );
        if (index !== -1) {
          state.deviceModels[index] = action.payload;
        } else {
          state.deviceModels.unshift(action.payload);
          state.total += 1;
        }
        state.selectedDeviceModel = action.payload;
        state.error = null;
      })
      .addCase(restoreDeviceModelThunk.rejected, (state, action) => {
        state.loading.restoreDeviceModelThunk = false;
        state.error = action.payload || 'Failed to restore device model';
      });
  },
});

// ========================
// ACTIONS & SELECTORS
// ========================

export const { clearError, clearSelectedDeviceModel, resetState } = deviceModelSlice.actions;

// Selectors
export const selectDeviceModels = (state: { deviceModels: DeviceModelState }) =>
  state.deviceModels.deviceModels;
export const selectSelectedDeviceModel = (state: { deviceModels: DeviceModelState }) =>
  state.deviceModels.selectedDeviceModel;
export const selectDeviceModelLoading = (state: { deviceModels: DeviceModelState }) =>
  state.deviceModels.loading;
export const selectDeviceModelError = (state: { deviceModels: DeviceModelState }) =>
  state.deviceModels.error;
export const selectDeviceModelPagination = (state: { deviceModels: DeviceModelState }) => ({
  total: state.deviceModels.total,
  currentPage: state.deviceModels.currentPage,
  pageSize: state.deviceModels.pageSize,
});

export default deviceModelSlice.reducer;
