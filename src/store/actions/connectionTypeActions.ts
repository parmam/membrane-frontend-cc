// src/store/actions/connectionTypeActions.ts
import {
  ConnectionTypeDto,
  GetConnectionTypesQueryParams,
  // Assuming ListConnectionTypesResponseDto is ConnectionTypeDto[] based on service,
  // but if it's paginated like others, need to adjust.
  // For now, assuming it might return a simple array or an object with a 'data' property.
  // Let's assume the service returns PaginatedConnectionTypesResponseDto similar to others for consistency in thunk.
} from '@/services/connectiontype/ConnectionType.types';
import { ConnectionTypeService } from '@/services/connectiontype/ConnectionTypeService';

import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  connectionTypesRequestFailure,
  connectionTypesRequestStart,
  listConnectionTypesSuccess,
} from '../reducers/connectionTypeSlice';

// Mocking a paginated response structure if the service actually returns simple array
// This interface is local to this file as it's a mock for adapting the response.
// If the API does support pagination, this should come from .types.ts
interface PaginatedConnectionTypesResponseDto {
  data: ConnectionTypeDto[];
  total: number;
  limit: number;
  offset: number;
}

export const fetchConnectionTypes = createAsyncThunk(
  'connectionTypes/fetchConnectionTypes',
  async (params: GetConnectionTypesQueryParams = {}, { dispatch }) => {
    dispatch(connectionTypesRequestStart());
    try {
      // The ConnectionTypeService.listConnectionTypes currently expects to return ConnectionTypeDto[]
      // If the API is truly paginated for this, the service & types need to reflect that.
      // For now, let's adapt to make it consistent with slice structure,
      // assuming service might be changed or this is a simplified case.
      const responseArray: ConnectionTypeDto[] =
        await ConnectionTypeService.listConnectionTypes(params);

      // Simulate pagination if not provided by backend for this specific endpoint
      const limit = params.limit || responseArray.length; // Default to all if no limit
      const offset = params.offset || 0;
      // Basic slice for pagination; for more complex cases, API should handle it
      const paginatedData = responseArray.slice(offset, offset + limit);

      dispatch(
        listConnectionTypesSuccess({
          connectionTypes: paginatedData, // Send only the "current page"
          total: responseArray.length, // Total is the full array length
          page: offset / limit + 1,
          pageSize: limit,
        }),
      );
      // Thunks should ideally return what's considered the "result" of the async operation
      // This could be the paginated data, or the full list if useful for some callers.
      // For consistency with other paginated thunks, returning an object similar to what a paginated API might give.
      return {
        data: paginatedData,
        total: responseArray.length,
        page: offset / limit + 1,
        pageSize: limit,
      };
    } catch (error: unknown) {
      // Changed from any to unknown
      let errorMessage = 'Failed to fetch connection types';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(connectionTypesRequestFailure(errorMessage));
      throw error;
    }
  },
);
