// src/store/reducers/deviceStatusSlice.ts
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { getDeviceStatusesThunk } from '../actions/deviceStatusActions';
import type { DeviceStatus, PaginatedResponse } from '../types/ApiTypes';
import type { DeviceStatusLoadingState } from '../types/LoadingTypes';

// =======================
// STATE INTERFACE
// =======================

export interface DeviceStatusState {
  // Data
  deviceStatuses: DeviceStatus[];

  // Pagination
  total: number;
  currentPage: number;
  pageSize: number;

  // Loading states
  loading: DeviceStatusLoadingState;

  // Error state
  error: string | null;
}

// =======================
// INITIAL STATE
// =======================

const initialLoadingState: DeviceStatusLoadingState = {
  getDeviceStatusesThunk: false,
};

const initialState: DeviceStatusState = {
  deviceStatuses: [],
  total: 0,
  currentPage: 1,
  pageSize: 10,
  loading: initialLoadingState,
  error: null,
};

// =======================
// SLICE
// =======================

const deviceStatusSlice = createSlice({
  name: 'deviceStatuses',
  initialState,
  reducers: {
    clearDeviceStatusError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDeviceStatusesThunk.pending, (state) => {
        state.loading.getDeviceStatusesThunk = true;
        state.error = null;
      })
      .addCase(
        getDeviceStatusesThunk.fulfilled,
        (state, action: PayloadAction<PaginatedResponse<DeviceStatus>>) => {
          state.loading.getDeviceStatusesThunk = false;
          state.deviceStatuses = action.payload.data;
          state.total = action.payload.total;
          state.currentPage = action.payload.offset / action.payload.limit + 1;
          state.pageSize = action.payload.limit;
        },
      )
      .addCase(getDeviceStatusesThunk.rejected, (state, action) => {
        state.loading.getDeviceStatusesThunk = false;
        state.error = (action.payload as string) || 'Failed to fetch device statuses.';
      });
  },
});

// =======================
// EXPORTS
// =======================

// Actions
export const { clearDeviceStatusError } = deviceStatusSlice.actions;

// Selectors
export const selectDeviceStatuses = (state: { deviceStatuses: DeviceStatusState }) =>
  state.deviceStatuses.deviceStatuses;
export const selectDeviceStatusLoading = (state: { deviceStatuses: DeviceStatusState }) =>
  state.deviceStatuses.loading;
export const selectDeviceStatusError = (state: { deviceStatuses: DeviceStatusState }) =>
  state.deviceStatuses.error;
export const selectDeviceStatusPagination = (state: { deviceStatuses: DeviceStatusState }) => ({
  total: state.deviceStatuses.total,
  currentPage: state.deviceStatuses.currentPage,
  pageSize: state.deviceStatuses.pageSize,
});

// Reducer
export default deviceStatusSlice.reducer;
