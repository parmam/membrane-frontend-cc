// src/store/reducers/connectionTypeSlice.ts
import { ConnectionTypeDto } from '@/services/connectiontype/ConnectionType.types';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// Assuming no specific frontend model transformation is strictly needed for this simple list,
// DTO can be used directly in state.

export interface ConnectionTypeState {
  list: ConnectionTypeDto[];
  isLoading: boolean;
  error: string | null;
  // Pagination fields if API supports and is used, though GetConnectionTypesQueryParams exists
  totalConnectionTypes: number;
  currentPage: number;
  pageSize: number;
}

const initialState: ConnectionTypeState = {
  list: [],
  isLoading: false,
  error: null,
  totalConnectionTypes: 0,
  currentPage: 1,
  pageSize: 10, // Or a larger default if typically all are fetched
};

const connectionTypeSlice = createSlice({
  name: 'connectionTypes', // Plural name
  initialState,
  reducers: {
    connectionTypesRequestStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    connectionTypesRequestFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    listConnectionTypesSuccess: (
      state,
      action: PayloadAction<{
        connectionTypes: ConnectionTypeDto[];
        total: number;
        page: number;
        pageSize: number;
      }>,
    ) => {
      state.isLoading = false;
      state.list = action.payload.connectionTypes;
      state.totalConnectionTypes = action.payload.total;
      state.currentPage = action.payload.page;
      state.pageSize = action.payload.pageSize;
      state.error = null;
    },
  },
});

export const {
  connectionTypesRequestStart,
  connectionTypesRequestFailure,
  listConnectionTypesSuccess,
} = connectionTypeSlice.actions;

export default connectionTypeSlice.reducer;
