// src/store/reducers/deviceModelSlice.ts
import { DeviceModelDto } from '@/services/devicemodel/DeviceModel.types';
import { DeviceModel } from '@/services/devicemodel/convertToDeviceModel';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface DeviceModelState {
  list: DeviceModel[];
  selectedDeviceModel: DeviceModel | null;
  isLoading: boolean;
  error: string | null;
  totalDeviceModels: number;
  currentPage: number;
  pageSize: number;
}

const initialState: DeviceModelState = {
  list: [],
  selectedDeviceModel: null,
  isLoading: false,
  error: null,
  totalDeviceModels: 0,
  currentPage: 1,
  pageSize: 10,
};

const deviceModelSlice = createSlice({
  name: 'deviceModels',
  initialState,
  reducers: {
    deviceModelRequestStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    deviceModelRequestFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    listDeviceModelsSuccess: (
      state,
      action: PayloadAction<{
        deviceModels: DeviceModel[];
        total: number;
        page: number;
        pageSize: number;
      }>,
    ) => {
      state.isLoading = false;
      state.list = action.payload.deviceModels;
      state.totalDeviceModels = action.payload.total;
      state.currentPage = action.payload.page;
      state.pageSize = action.payload.pageSize;
      state.error = null;
    },
    getDeviceModelSuccess: (state, action: PayloadAction<DeviceModel>) => {
      state.isLoading = false;
      state.selectedDeviceModel = action.payload;
      state.error = null;
    },
    createDeviceModelSuccess: (state, action: PayloadAction<DeviceModel>) => {
      state.isLoading = false;
      state.selectedDeviceModel = action.payload;
      state.error = null;
    },
    updateDeviceModelSuccess: (state, action: PayloadAction<DeviceModel>) => {
      state.isLoading = false;
      state.selectedDeviceModel = action.payload;
      state.list = state.list.map((model) =>
        model.id === action.payload.id ? action.payload : model,
      );
      state.error = null;
    },
    deleteDeviceModelSuccess: (state, action: PayloadAction<string /* modelId */>) => {
      state.isLoading = false;
      state.list = state.list.filter((model) => model.id !== action.payload);
      if (state.selectedDeviceModel?.id === action.payload) {
        state.selectedDeviceModel = null;
      }
      state.error = null;
    },
  },
});

export const {
  deviceModelRequestStart,
  deviceModelRequestFailure,
  listDeviceModelsSuccess,
  getDeviceModelSuccess,
  createDeviceModelSuccess,
  updateDeviceModelSuccess,
  deleteDeviceModelSuccess,
} = deviceModelSlice.actions;

export default deviceModelSlice.reducer;
