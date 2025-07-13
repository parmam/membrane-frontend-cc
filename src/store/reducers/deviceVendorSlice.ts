// src/store/reducers/deviceVendorSlice.ts
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  createDeviceVendorThunk,
  deleteDeviceVendorThunk,
  getDeviceVendorByIdThunk,
  getDeviceVendorsThunk,
  restoreDeviceVendorThunk,
  updateDeviceVendorThunk,
} from '../actions/deviceVendorActions';
import type { DeviceVendor, PaginatedResponse } from '../types/ApiTypes';
import type { DeviceVendorLoadingState } from '../types/LoadingTypes';

// =======================
// STATE INTERFACE
// =======================

export interface DeviceVendorState {
  // Data
  vendors: DeviceVendor[];
  selectedVendor: DeviceVendor | null;

  // Pagination
  total: number;
  currentPage: number;
  pageSize: number;

  // Loading states
  loading: DeviceVendorLoadingState;

  // Error state
  error: string | null;
}

// =======================
// INITIAL STATE
// =======================

const initialLoadingState: DeviceVendorLoadingState = {
  getDeviceVendorsThunk: false,
  getDeviceVendorByIdThunk: false,
  createDeviceVendorThunk: false,
  updateDeviceVendorThunk: false,
  deleteDeviceVendorThunk: false,
  restoreDeviceVendorThunk: false,
};

const initialState: DeviceVendorState = {
  vendors: [],
  selectedVendor: null,
  total: 0,
  currentPage: 1,
  pageSize: 10,
  loading: initialLoadingState,
  error: null,
};

// =======================
// SLICE
// =======================

const deviceVendorSlice = createSlice({
  name: 'deviceVendors',
  initialState,
  reducers: {
    clearSelectedVendor: (state) => {
      state.selectedVendor = null;
    },
    clearVendorError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // GET ALL (paginated)
    builder
      .addCase(getDeviceVendorsThunk.pending, (state) => {
        state.loading.getDeviceVendorsThunk = true;
        state.error = null;
      })
      .addCase(
        getDeviceVendorsThunk.fulfilled,
        (state, action: PayloadAction<PaginatedResponse<DeviceVendor>>) => {
          state.loading.getDeviceVendorsThunk = false;
          state.vendors = action.payload.data;
          state.total = action.payload.total;
          state.currentPage = action.payload.offset / action.payload.limit + 1;
          state.pageSize = action.payload.limit;
        },
      )
      .addCase(getDeviceVendorsThunk.rejected, (state, action) => {
        state.loading.getDeviceVendorsThunk = false;
        state.error = (action.payload as string) || 'Failed to fetch vendors.';
      });

    // GET BY ID
    builder
      .addCase(getDeviceVendorByIdThunk.pending, (state) => {
        state.loading.getDeviceVendorByIdThunk = true;
        state.error = null;
      })
      .addCase(getDeviceVendorByIdThunk.fulfilled, (state, action: PayloadAction<DeviceVendor>) => {
        state.loading.getDeviceVendorByIdThunk = false;
        state.selectedVendor = action.payload;
      })
      .addCase(getDeviceVendorByIdThunk.rejected, (state, action) => {
        state.loading.getDeviceVendorByIdThunk = false;
        state.error = (action.payload as string) || 'Failed to fetch vendor.';
      });

    // CREATE
    builder
      .addCase(createDeviceVendorThunk.pending, (state) => {
        state.loading.createDeviceVendorThunk = true;
        state.error = null;
      })
      .addCase(createDeviceVendorThunk.fulfilled, (state, action: PayloadAction<DeviceVendor>) => {
        state.loading.createDeviceVendorThunk = false;
        state.vendors.unshift(action.payload);
        state.total += 1;
      })
      .addCase(createDeviceVendorThunk.rejected, (state, action) => {
        state.loading.createDeviceVendorThunk = false;
        state.error = (action.payload as string) || 'Failed to create vendor.';
      });

    // UPDATE
    builder
      .addCase(updateDeviceVendorThunk.pending, (state) => {
        state.loading.updateDeviceVendorThunk = true;
        state.error = null;
      })
      .addCase(updateDeviceVendorThunk.fulfilled, (state, action: PayloadAction<DeviceVendor>) => {
        state.loading.updateDeviceVendorThunk = false;
        const index = state.vendors.findIndex((v) => v.id === action.payload.id);
        if (index !== -1) {
          state.vendors[index] = action.payload;
        }
        if (state.selectedVendor?.id === action.payload.id) {
          state.selectedVendor = action.payload;
        }
      })
      .addCase(updateDeviceVendorThunk.rejected, (state, action) => {
        state.loading.updateDeviceVendorThunk = false;
        state.error = (action.payload as string) || 'Failed to update vendor.';
      });

    // DELETE
    builder
      .addCase(deleteDeviceVendorThunk.pending, (state) => {
        state.loading.deleteDeviceVendorThunk = true;
        state.error = null;
      })
      .addCase(deleteDeviceVendorThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading.deleteDeviceVendorThunk = false;
        state.vendors = state.vendors.filter((v) => v.id !== action.payload);
        state.total -= 1;
      })
      .addCase(deleteDeviceVendorThunk.rejected, (state, action) => {
        state.loading.deleteDeviceVendorThunk = false;
        state.error = (action.payload as string) || 'Failed to delete vendor.';
      });

    // RESTORE
    builder
      .addCase(restoreDeviceVendorThunk.pending, (state) => {
        state.loading.restoreDeviceVendorThunk = true;
        state.error = null;
      })
      .addCase(restoreDeviceVendorThunk.fulfilled, (state, action: PayloadAction<DeviceVendor>) => {
        state.loading.restoreDeviceVendorThunk = false;
        const index = state.vendors.findIndex((v) => v.id === action.payload.id);
        if (index !== -1) {
          state.vendors[index] = action.payload;
        } else {
          state.vendors.unshift(action.payload);
          state.total += 1;
        }
      })
      .addCase(restoreDeviceVendorThunk.rejected, (state, action) => {
        state.loading.restoreDeviceVendorThunk = false;
        state.error = (action.payload as string) || 'Failed to restore vendor.';
      });
  },
});

// =======================
// EXPORTS
// =======================

// Actions
export const { clearSelectedVendor, clearVendorError } = deviceVendorSlice.actions;

// Selectors
export const selectVendors = (state: { deviceVendors: DeviceVendorState }) =>
  state.deviceVendors.vendors;
export const selectSelectedVendor = (state: { deviceVendors: DeviceVendorState }) =>
  state.deviceVendors.selectedVendor;
export const selectVendorLoading = (state: { deviceVendors: DeviceVendorState }) =>
  state.deviceVendors.loading;
export const selectVendorError = (state: { deviceVendors: DeviceVendorState }) =>
  state.deviceVendors.error;
export const selectVendorPagination = (state: { deviceVendors: DeviceVendorState }) => ({
  total: state.deviceVendors.total,
  currentPage: state.deviceVendors.currentPage,
  pageSize: state.deviceVendors.pageSize,
});

// Reducer
export default deviceVendorSlice.reducer;
