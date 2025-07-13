// src/store/reducers/deviceTypeSlice.ts
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { getDeviceTypesThunk } from '../actions/deviceTypeActions';
import type { DeviceType, PaginatedResponse } from '../types/ApiTypes';
import type { DeviceTypeLoadingState } from '../types/LoadingTypes';

// =======================
// STATE INTERFACE
// =======================

export interface DeviceTypeState {
  // Data
  deviceTypes: DeviceType[];

  // Pagination
  total: number;
  currentPage: number;
  pageSize: number;

  // Loading states
  loading: DeviceTypeLoadingState;

  // Error state
  error: string | null;
}

// =======================
// INITIAL STATE
// =======================

const initialLoadingState: DeviceTypeLoadingState = {
  getDeviceTypesThunk: false,
};

const initialState: DeviceTypeState = {
  deviceTypes: [],
  total: 0,
  currentPage: 1,
  pageSize: 10,
  loading: initialLoadingState,
  error: null,
};

// =======================
// SLICE
// =======================

const deviceTypeSlice = createSlice({
  name: 'deviceTypes',
  initialState,
  reducers: {
    clearDeviceTypeError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDeviceTypesThunk.pending, (state) => {
        state.loading.getDeviceTypesThunk = true;
        state.error = null;
      })
      .addCase(
        getDeviceTypesThunk.fulfilled,
        (state, action: PayloadAction<PaginatedResponse<DeviceType>>) => {
          state.loading.getDeviceTypesThunk = false;
          state.deviceTypes = action.payload.data;
          state.total = action.payload.total;
          state.currentPage = action.payload.offset / action.payload.limit + 1;
          state.pageSize = action.payload.limit;
        },
      )
      .addCase(getDeviceTypesThunk.rejected, (state, action) => {
        state.loading.getDeviceTypesThunk = false;
        state.error = (action.payload as string) || 'Failed to fetch device types.';
      });
  },
});

// =======================
// EXPORTS
// =======================

// Actions
export const { clearDeviceTypeError } = deviceTypeSlice.actions;

// Selectors
export const selectDeviceTypes = (state: { deviceTypes: DeviceTypeState }) =>
  state.deviceTypes.deviceTypes;
export const selectDeviceTypeLoading = (state: { deviceTypes: DeviceTypeState }) =>
  state.deviceTypes.loading;
export const selectDeviceTypeError = (state: { deviceTypes: DeviceTypeState }) =>
  state.deviceTypes.error;
export const selectDeviceTypePagination = (state: { deviceTypes: DeviceTypeState }) => ({
  total: state.deviceTypes.total,
  currentPage: state.deviceTypes.currentPage,
  pageSize: state.deviceTypes.pageSize,
});

// Reducer
export default deviceTypeSlice.reducer;
