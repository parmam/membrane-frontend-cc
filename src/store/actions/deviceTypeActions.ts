// src/store/actions/deviceTypeActions.ts
import {
  DeviceTypeDto,
  GetDeviceTypesQueryParams,
  // Assuming ListDeviceTypesResponseDto is DeviceTypeDto[] from service.
} from '@/services/devicetype/DeviceType.types';
import { DeviceTypeService } from '@/services/devicetype/DeviceTypeService';

import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  deviceTypesRequestFailure,
  deviceTypesRequestStart,
  listDeviceTypesSuccess,
} from '../reducers/deviceTypeSlice';

// Mocking a paginated response structure if the service actually returns simple array
// This interface is local to this file as it's a mock for adapting the response.
// If the API does support pagination, this should come from .types.ts
interface PaginatedDeviceTypesResponseDto {
  data: DeviceTypeDto[];
  total: number;
  limit: number;
  offset: number;
}

export const fetchDeviceTypes = createAsyncThunk(
  'deviceTypes/fetchDeviceTypes',
  async (params: GetDeviceTypesQueryParams = {}, { dispatch }) => {
    dispatch(deviceTypesRequestStart());
    try {
      // DeviceTypeService.listDeviceTypes currently expects to return DeviceTypeDto[]
      const responseArray: DeviceTypeDto[] = await DeviceTypeService.listDeviceTypes(params);

      const limit = params.limit || responseArray.length;
      const offset = params.offset || 0;
      const paginatedData = responseArray.slice(offset, offset + limit);

      dispatch(
        listDeviceTypesSuccess({
          deviceTypes: paginatedData,
          total: responseArray.length,
          page: offset / limit + 1,
          pageSize: limit,
        }),
      );
      // For consistency with other paginated thunks, returning an object similar to what a paginated API might give.
      return {
        data: paginatedData,
        total: responseArray.length,
        page: offset / limit + 1,
        pageSize: limit,
      };
    } catch (error: unknown) {
      // Changed from any to unknown
      let errorMessage = 'Failed to fetch device types';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(deviceTypesRequestFailure(errorMessage));
      throw error;
    }
  },
);
