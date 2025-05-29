// src/store/actions/deviceModelActions.ts
import {
  DeviceModelDto,
  GetDeviceModelsQueryParams,
  PaginatedDeviceModelsResponseDto,
  StoreDeviceModelRequestDto,
  UpdateDeviceModelRequestDto,
} from '@/services/devicemodel/DeviceModel.types';
import { DeviceModelService } from '@/services/devicemodel/DeviceModelService';
import {
  DeviceModel,
  convertDeviceModelDtoToModel,
} from '@/services/devicemodel/convertToDeviceModel';

import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  createDeviceModelSuccess,
  deleteDeviceModelSuccess,
  deviceModelRequestFailure,
  deviceModelRequestStart,
  getDeviceModelSuccess,
  listDeviceModelsSuccess,
  updateDeviceModelSuccess,
} from '../reducers/deviceModelSlice';

export const fetchDeviceModels = createAsyncThunk(
  'deviceModels/fetchDeviceModels',
  async (params: GetDeviceModelsQueryParams = {}, { dispatch }) => {
    dispatch(deviceModelRequestStart());
    try {
      const response: PaginatedDeviceModelsResponseDto =
        await DeviceModelService.listDeviceModels(params);
      const deviceModelModels = response.data.map(convertDeviceModelDtoToModel);
      dispatch(
        listDeviceModelsSuccess({
          deviceModels: deviceModelModels,
          total: response.total,
          page: (params.offset || 0) / (params.limit || 10) + 1,
          pageSize: params.limit || 10,
        }),
      );
      return { deviceModels: deviceModelModels, total: response.total };
    } catch (error: unknown) {
      // Changed from any to unknown
      let errorMessage = 'Failed to fetch device models';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(deviceModelRequestFailure(errorMessage));
      throw error;
    }
  },
);

export const fetchDeviceModelById = createAsyncThunk(
  'deviceModels/fetchDeviceModelById',
  async (modelId: string, { dispatch }) => {
    dispatch(deviceModelRequestStart());
    try {
      const modelDto: DeviceModelDto = await DeviceModelService.findDeviceModelById(modelId);
      const model: DeviceModel = convertDeviceModelDtoToModel(modelDto);
      dispatch(getDeviceModelSuccess(model));
      return model;
    } catch (error: unknown) {
      // Changed from any to unknown
      let errorMessage = 'Failed to fetch device model details';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(deviceModelRequestFailure(errorMessage));
      throw error;
    }
  },
);

export const createDeviceModel = createAsyncThunk(
  'deviceModels/createDeviceModel',
  async (modelData: StoreDeviceModelRequestDto, { dispatch }) => {
    dispatch(deviceModelRequestStart());
    try {
      const createdModelDto: DeviceModelDto = await DeviceModelService.createDeviceModel(modelData);
      const createdModel: DeviceModel = convertDeviceModelDtoToModel(createdModelDto);
      dispatch(createDeviceModelSuccess(createdModel));
      return createdModel;
    } catch (error: unknown) {
      // Changed from any to unknown
      let errorMessage = 'Failed to create device model';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(deviceModelRequestFailure(errorMessage));
      throw error;
    }
  },
);

export const updateDeviceModel = createAsyncThunk(
  'deviceModels/updateDeviceModel',
  async (
    { modelId, modelData }: { modelId: string; modelData: UpdateDeviceModelRequestDto },
    { dispatch },
  ) => {
    dispatch(deviceModelRequestStart());
    try {
      const updatedModelDto: DeviceModelDto = await DeviceModelService.updateDeviceModel(
        modelId,
        modelData,
      );
      const updatedModel: DeviceModel = convertDeviceModelDtoToModel(updatedModelDto);
      dispatch(updateDeviceModelSuccess(updatedModel));
      return updatedModel;
    } catch (error: unknown) {
      // Changed from any to unknown
      let errorMessage = 'Failed to update device model';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(deviceModelRequestFailure(errorMessage));
      throw error;
    }
  },
);

export const deleteDeviceModel = createAsyncThunk(
  'deviceModels/deleteDeviceModel',
  async (modelId: string, { dispatch }) => {
    dispatch(deviceModelRequestStart());
    try {
      await DeviceModelService.deleteDeviceModel(modelId);
      dispatch(deleteDeviceModelSuccess(modelId));
      return modelId;
    } catch (error: unknown) {
      // Changed from any to unknown
      let errorMessage = 'Failed to delete device model';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(deviceModelRequestFailure(errorMessage));
      throw error;
    }
  },
);

export const restoreDeviceModel = createAsyncThunk(
  'deviceModels/restoreDeviceModel',
  async (modelId: string, { dispatch }) => {
    dispatch(deviceModelRequestStart());
    try {
      const restoredModelDto: DeviceModelDto = await DeviceModelService.restoreDeviceModel(modelId);
      const restoredModel: DeviceModel = convertDeviceModelDtoToModel(restoredModelDto);
      dispatch(updateDeviceModelSuccess(restoredModel)); // Reuse update for simplicity
      return restoredModel;
    } catch (error: unknown) {
      // Changed from any to unknown
      let errorMessage = 'Failed to restore device model';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(deviceModelRequestFailure(errorMessage));
      throw error;
    }
  },
);
