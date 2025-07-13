// src/store/reducers/driverSlice.ts
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { getDriversThunk } from '../actions/driverActions';
import type { Driver, PaginatedResponse } from '../types/ApiTypes';
import type { DriverLoadingState } from '../types/LoadingTypes';

// =======================
// STATE INTERFACE
// =======================

export interface DriverState {
  // Data
  drivers: Driver[];

  // Pagination
  total: number;
  currentPage: number;
  pageSize: number;

  // Loading states
  loading: DriverLoadingState;

  // Error state
  error: string | null;
}

// =======================
// INITIAL STATE
// =======================

const initialLoadingState: DriverLoadingState = {
  getDriversThunk: false,
};

const initialState: DriverState = {
  drivers: [],
  total: 0,
  currentPage: 1,
  pageSize: 10,
  loading: initialLoadingState,
  error: null,
};

// =======================
// SLICE
// =======================

const driverSlice = createSlice({
  name: 'drivers',
  initialState,
  reducers: {
    clearDriverError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDriversThunk.pending, (state) => {
        state.loading.getDriversThunk = true;
        state.error = null;
      })
      .addCase(
        getDriversThunk.fulfilled,
        (state, action: PayloadAction<PaginatedResponse<Driver>>) => {
          state.loading.getDriversThunk = false;
          state.drivers = action.payload.data;
          state.total = action.payload.total;
          state.currentPage = action.payload.offset / action.payload.limit + 1;
          state.pageSize = action.payload.limit;
        },
      )
      .addCase(getDriversThunk.rejected, (state, action) => {
        state.loading.getDriversThunk = false;
        state.error = (action.payload as string) || 'Failed to fetch drivers.';
      });
  },
});

// =======================
// EXPORTS
// =======================

// Actions
export const { clearDriverError } = driverSlice.actions;

// Selectors
export const selectDrivers = (state: { drivers: DriverState }) => state.drivers.drivers;
export const selectDriverLoading = (state: { drivers: DriverState }) => state.drivers.loading;
export const selectDriverError = (state: { drivers: DriverState }) => state.drivers.error;
export const selectDriverPagination = (state: { drivers: DriverState }) => ({
  total: state.drivers.total,
  currentPage: state.drivers.currentPage,
  pageSize: state.drivers.pageSize,
});

// Reducer
export default driverSlice.reducer;
