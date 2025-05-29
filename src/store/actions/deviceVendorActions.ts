// src/store/actions/deviceVendorActions.ts
// Assuming DeviceVendorDto is used directly as model for simplicity, no separate convertToDeviceVendor.ts needed for now
import {
  DeviceVendorDto,
  GetDeviceVendorsQueryParams,
  PaginatedDeviceVendorsResponseDto,
  StoreDeviceVendorRequestDto,
  UpdateDeviceVendorRequestDto,
} from '@/services/devicevendor/DeviceVendor.types';
import { DeviceVendorService } from '@/services/devicevendor/DeviceVendorService';

import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  createDeviceVendorSuccess,
  deleteDeviceVendorSuccess,
  deviceVendorRequestFailure,
  deviceVendorRequestStart,
  getDeviceVendorSuccess,
  listDeviceVendorsSuccess,
  updateDeviceVendorSuccess,
} from '../reducers/deviceVendorSlice';

export const fetchDeviceVendors = createAsyncThunk(
  'deviceVendors/fetchDeviceVendors',
  async (params: GetDeviceVendorsQueryParams = {}, { dispatch }) => {
    dispatch(deviceVendorRequestStart());
    try {
      const response: PaginatedDeviceVendorsResponseDto =
        await DeviceVendorService.listDeviceVendors(params);
      dispatch(
        listDeviceVendorsSuccess({
          deviceVendors: response.data, // Assuming DTO is used as model
          total: response.total,
          page: (params.offset || 0) / (params.limit || 10) + 1,
          pageSize: params.limit || 10,
        }),
      );
      return response; // Or response.data if preferred
    } catch (error: unknown) {
      // Changed from any to unknown
      let errorMessage = 'Failed to fetch device vendors';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(deviceVendorRequestFailure(errorMessage));
      throw error;
    }
  },
);

export const fetchDeviceVendorById = createAsyncThunk(
  'deviceVendors/fetchDeviceVendorById',
  async (vendorId: string, { dispatch }) => {
    dispatch(deviceVendorRequestStart());
    try {
      const vendorDto: DeviceVendorDto = await DeviceVendorService.findDeviceVendorById(vendorId);
      dispatch(getDeviceVendorSuccess(vendorDto)); // Assuming DTO is used as model
      return vendorDto;
    } catch (error: unknown) {
      // Changed from any to unknown
      let errorMessage = 'Failed to fetch device vendor details';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(deviceVendorRequestFailure(errorMessage));
      throw error;
    }
  },
);

export const createDeviceVendor = createAsyncThunk(
  'deviceVendors/createDeviceVendor',
  async (vendorData: StoreDeviceVendorRequestDto, { dispatch }) => {
    dispatch(deviceVendorRequestStart());
    try {
      const createdVendorDto: DeviceVendorDto =
        await DeviceVendorService.createDeviceVendor(vendorData);
      dispatch(createDeviceVendorSuccess(createdVendorDto)); // Assuming DTO is used as model
      return createdVendorDto;
    } catch (error: unknown) {
      // Changed from any to unknown
      let errorMessage = 'Failed to create device vendor';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(deviceVendorRequestFailure(errorMessage));
      throw error;
    }
  },
);

export const updateDeviceVendor = createAsyncThunk(
  'deviceVendors/updateDeviceVendor',
  async (
    { vendorId, vendorData }: { vendorId: string; vendorData: UpdateDeviceVendorRequestDto },
    { dispatch },
  ) => {
    dispatch(deviceVendorRequestStart());
    try {
      const updatedVendorDto: DeviceVendorDto = await DeviceVendorService.updateDeviceVendor(
        vendorId,
        vendorData,
      );
      dispatch(updateDeviceVendorSuccess(updatedVendorDto)); // Assuming DTO is used as model
      return updatedVendorDto;
    } catch (error: unknown) {
      // Changed from any to unknown
      let errorMessage = 'Failed to update device vendor';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(deviceVendorRequestFailure(errorMessage));
      throw error;
    }
  },
);

export const deleteDeviceVendor = createAsyncThunk(
  'deviceVendors/deleteDeviceVendor',
  async (vendorId: string, { dispatch }) => {
    dispatch(deviceVendorRequestStart());
    try {
      await DeviceVendorService.deleteDeviceVendor(vendorId);
      dispatch(deleteDeviceVendorSuccess(vendorId));
      return vendorId;
    } catch (error: unknown) {
      // Changed from any to unknown
      let errorMessage = 'Failed to delete device vendor';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(deviceVendorRequestFailure(errorMessage));
      throw error;
    }
  },
);

export const restoreDeviceVendor = createAsyncThunk(
  'deviceVendors/restoreDeviceVendor',
  async (vendorId: string, { dispatch }) => {
    dispatch(deviceVendorRequestStart());
    try {
      const restoredVendorDto: DeviceVendorDto =
        await DeviceVendorService.restoreDeviceVendor(vendorId);
      dispatch(updateDeviceVendorSuccess(restoredVendorDto)); // Reuse update for simplicity
      return restoredVendorDto;
    } catch (error: unknown) {
      // Changed from any to unknown
      let errorMessage = 'Failed to restore device vendor';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(deviceVendorRequestFailure(errorMessage));
      throw error;
    }
  },
);
