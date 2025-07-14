// src/store/reducers/deviceMonitoringSlice.ts
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  getDeviceMonitoringThunk,
  getLastStatusByIdThunk,
  getLastStatusThunk,
  getMonitoringPageInitialDataThunk,
  getUptimeThunk,
} from '../actions/deviceMonitoringActions';
import type { DeviceMonitoring, PaginatedResponse } from '../types/ApiTypes';
import { AppErrorDto } from '../types/ErrorTypes';
import type { DeviceMonitoringLoadingState } from '../types/LoadingTypes';

// =======================
// STATE INTERFACE
// =======================

export interface DeviceMonitoringState {
  // Data
  monitoringData: DeviceMonitoring[];
  lastStatus: DeviceMonitoring[];
  uptime: unknown;

  // Pagination
  total: number;
  currentPage: number;
  pageSize: number;

  // Loading states
  loading: DeviceMonitoringLoadingState;

  // Error state
  error: AppErrorDto | null;
}

// =======================
// INITIAL STATE
// =======================

const initialLoadingState: DeviceMonitoringLoadingState = {
  getDeviceMonitoringThunk: false,
  getLastStatusThunk: false,
  getLastStatusByIdThunk: false,
  getUptimeThunk: false,
  getMonitoringPageInitialDataThunk: false,
};

const initialState: DeviceMonitoringState = {
  monitoringData: [],
  lastStatus: [],
  uptime: null,
  total: 0,
  currentPage: 1,
  pageSize: 10,
  loading: initialLoadingState,
  error: null,
};

// =======================
// SLICE
// =======================

const deviceMonitoringSlice = createSlice({
  name: 'deviceMonitoring',
  initialState,
  reducers: {
    clearDeviceMonitoringError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // GET DEVICE MONITORING (paginated)
    builder
      .addCase(getDeviceMonitoringThunk.pending, (state) => {
        state.loading.getDeviceMonitoringThunk = true;
        state.error = null;
      })
      .addCase(
        getDeviceMonitoringThunk.fulfilled,
        (state, action: PayloadAction<PaginatedResponse<DeviceMonitoring>>) => {
          state.loading.getDeviceMonitoringThunk = false;
          state.monitoringData = action.payload.data;
          state.total = action.payload.total;
          state.currentPage = action.payload.offset / action.payload.limit + 1;
          state.pageSize = action.payload.limit;
        },
      )
      .addCase(getDeviceMonitoringThunk.rejected, (state, action) => {
        state.loading.getDeviceMonitoringThunk = false;
        state.error = action.payload ?? null;
      });

    // GET LAST STATUS
    builder
      .addCase(getLastStatusThunk.pending, (state) => {
        state.loading.getLastStatusThunk = true;
        state.error = null;
      })
      .addCase(getLastStatusThunk.fulfilled, (state, action: PayloadAction<DeviceMonitoring[]>) => {
        state.loading.getLastStatusThunk = false;
        state.lastStatus = action.payload;
      })
      .addCase(getLastStatusThunk.rejected, (state, action) => {
        state.loading.getLastStatusThunk = false;
        state.error = action.payload ?? null;
      });

    // GET LAST STATUS BY ID
    builder
      .addCase(getLastStatusByIdThunk.pending, (state) => {
        state.loading.getLastStatusByIdThunk = true;
        state.error = null;
      })
      .addCase(
        getLastStatusByIdThunk.fulfilled,
        (state, action: PayloadAction<DeviceMonitoring[]>) => {
          state.loading.getLastStatusByIdThunk = false;
          // Here you might want to merge or replace, depending on the use case
          state.lastStatus = action.payload;
        },
      )
      .addCase(getLastStatusByIdThunk.rejected, (state, action) => {
        state.loading.getLastStatusByIdThunk = false;
        state.error = action.payload ?? null;
      });

    // GET UPTIME
    builder
      .addCase(getUptimeThunk.pending, (state) => {
        state.loading.getUptimeThunk = true;
        state.error = null;
      })
      .addCase(getUptimeThunk.fulfilled, (state, action: PayloadAction<unknown>) => {
        state.loading.getUptimeThunk = false;
        state.uptime = action.payload;
      })
      .addCase(getUptimeThunk.rejected, (state, action) => {
        state.loading.getUptimeThunk = false;
        state.error = action.payload ?? null;
      });

    // GET MONITORING PAGE INITIAL DATA
    builder
      .addCase(getMonitoringPageInitialDataThunk.pending, (state) => {
        state.loading.getMonitoringPageInitialDataThunk = true;
        state.error = null;
      })
      .addCase(getMonitoringPageInitialDataThunk.fulfilled, (state) => {
        state.loading.getMonitoringPageInitialDataThunk = false;
      })
      .addCase(getMonitoringPageInitialDataThunk.rejected, (state, action) => {
        state.loading.getMonitoringPageInitialDataThunk = false;
        state.error = action.payload ?? null;
      });
  },
});

// =======================
// EXPORTS
// =======================

// Actions
export const { clearDeviceMonitoringError } = deviceMonitoringSlice.actions;

// Selectors
export const selectMonitoringData = (state: { deviceMonitoring: DeviceMonitoringState }) =>
  state.deviceMonitoring.monitoringData;
export const selectLastStatus = (state: { deviceMonitoring: DeviceMonitoringState }) =>
  state.deviceMonitoring.lastStatus;
export const selectUptime = (state: { deviceMonitoring: DeviceMonitoringState }) =>
  state.deviceMonitoring.uptime;
export const selectDeviceMonitoringLoading = (state: { deviceMonitoring: DeviceMonitoringState }) =>
  state.deviceMonitoring.loading;
export const selectDeviceMonitoringError = (state: { deviceMonitoring: DeviceMonitoringState }) =>
  state.deviceMonitoring.error;
export const selectDeviceMonitoringPagination = (state: {
  deviceMonitoring: DeviceMonitoringState;
}) => ({
  total: state.deviceMonitoring.total,
  currentPage: state.deviceMonitoring.currentPage,
  pageSize: state.deviceMonitoring.pageSize,
});

// Reducer
export default deviceMonitoringSlice.reducer;
