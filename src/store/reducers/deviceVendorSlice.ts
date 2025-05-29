// src/store/reducers/deviceVendorSlice.ts
import { DeviceVendorDto } from '@/services/devicevendor/DeviceVendor.types';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// Assuming DeviceVendorDto is sufficient for both list items and details for now.
// Create a DeviceVendorModel if transformations are needed.
// For simplicity, using DeviceVendorDto directly in state.

export interface DeviceVendorState {
  list: DeviceVendorDto[];
  selectedDeviceVendor: DeviceVendorDto | null;
  isLoading: boolean;
  error: string | null;
  totalDeviceVendors: number;
  currentPage: number;
  pageSize: number;
}

const initialState: DeviceVendorState = {
  list: [],
  selectedDeviceVendor: null,
  isLoading: false,
  error: null,
  totalDeviceVendors: 0,
  currentPage: 1,
  pageSize: 10,
};

const deviceVendorSlice = createSlice({
  name: 'deviceVendors', // Plural name
  initialState,
  reducers: {
    deviceVendorRequestStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    deviceVendorRequestFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    listDeviceVendorsSuccess: (
      state,
      action: PayloadAction<{
        deviceVendors: DeviceVendorDto[];
        total: number;
        page: number;
        pageSize: number;
      }>,
    ) => {
      state.isLoading = false;
      state.list = action.payload.deviceVendors;
      state.totalDeviceVendors = action.payload.total;
      state.currentPage = action.payload.page;
      state.pageSize = action.payload.pageSize;
      state.error = null;
    },
    getDeviceVendorSuccess: (state, action: PayloadAction<DeviceVendorDto>) => {
      state.isLoading = false;
      state.selectedDeviceVendor = action.payload;
      state.error = null;
    },
    createDeviceVendorSuccess: (state, action: PayloadAction<DeviceVendorDto>) => {
      state.isLoading = false;
      state.selectedDeviceVendor = action.payload;
      // Optionally add to list or refetch
      state.error = null;
    },
    updateDeviceVendorSuccess: (state, action: PayloadAction<DeviceVendorDto>) => {
      state.isLoading = false;
      state.selectedDeviceVendor = action.payload;
      state.list = state.list.map((vendor) =>
        vendor.id === action.payload.id ? action.payload : vendor,
      );
      state.error = null;
    },
    deleteDeviceVendorSuccess: (state, action: PayloadAction<string /* vendorId */>) => {
      state.isLoading = false;
      state.list = state.list.filter((vendor) => vendor.id !== action.payload);
      if (state.selectedDeviceVendor?.id === action.payload) {
        state.selectedDeviceVendor = null;
      }
      state.error = null;
    },
  },
});

export const {
  deviceVendorRequestStart,
  deviceVendorRequestFailure,
  listDeviceVendorsSuccess,
  getDeviceVendorSuccess,
  createDeviceVendorSuccess,
  updateDeviceVendorSuccess,
  deleteDeviceVendorSuccess,
} = deviceVendorSlice.actions;

export default deviceVendorSlice.reducer;
