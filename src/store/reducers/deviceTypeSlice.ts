// src/store/reducers/deviceTypeSlice.ts
import { DeviceTypeDto } from '@/services/devicetype/DeviceType.types';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface DeviceTypeState {
  list: DeviceTypeDto[];
  isLoading: boolean;
  error: string | null;
  totalDeviceTypes: number;
  currentPage: number;
  pageSize: number;
}

const initialState: DeviceTypeState = {
  list: [],
  isLoading: false,
  error: null,
  totalDeviceTypes: 0,
  currentPage: 1,
  pageSize: 10,
};

const deviceTypeSlice = createSlice({
  name: 'deviceTypes', // Plural name
  initialState,
  reducers: {
    deviceTypesRequestStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    deviceTypesRequestFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    listDeviceTypesSuccess: (
      state,
      action: PayloadAction<{
        deviceTypes: DeviceTypeDto[];
        total: number;
        page: number;
        pageSize: number;
      }>,
    ) => {
      state.isLoading = false;
      state.list = action.payload.deviceTypes;
      state.totalDeviceTypes = action.payload.total;
      state.currentPage = action.payload.page;
      state.pageSize = action.payload.pageSize;
      state.error = null;
    },
  },
});

export const { deviceTypesRequestStart, deviceTypesRequestFailure, listDeviceTypesSuccess } =
  deviceTypeSlice.actions;

export default deviceTypeSlice.reducer;
