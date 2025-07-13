// src/store/reducers/connectionTypeSlice.ts
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { getConnectionTypesThunk } from '../actions/connectionTypeActions';
import type { ConnectionType } from '../types/ApiTypes';
import type { ConnectionTypeLoadingState } from '../types/LoadingTypes';

// =======================
// STATE INTERFACE
// =======================

export interface ConnectionTypeState {
  // Data
  connectionTypes: ConnectionType[];

  // Loading states
  loading: ConnectionTypeLoadingState;

  // Error state
  error: string | null;
}

// =======================
// INITIAL STATE
// =======================

const initialLoadingState: ConnectionTypeLoadingState = {
  getConnectionTypesThunk: false,
};

const initialState: ConnectionTypeState = {
  connectionTypes: [],
  loading: initialLoadingState,
  error: null,
};

// =======================
// SLICE
// =======================

const connectionTypeSlice = createSlice({
  name: 'connectionTypes',
  initialState,
  reducers: {
    clearConnectionTypeError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getConnectionTypesThunk.pending, (state) => {
        state.loading.getConnectionTypesThunk = true;
        state.error = null;
      })
      .addCase(
        getConnectionTypesThunk.fulfilled,
        (state, action: PayloadAction<ConnectionType[]>) => {
          state.loading.getConnectionTypesThunk = false;
          state.connectionTypes = action.payload;
        },
      )
      .addCase(getConnectionTypesThunk.rejected, (state, action) => {
        state.loading.getConnectionTypesThunk = false;
        state.error = action.payload || 'Failed to fetch connection types.';
      });
  },
});

// =======================
// EXPORTS
// =======================

// Actions
export const { clearConnectionTypeError } = connectionTypeSlice.actions;

// Selectors
export const selectConnectionTypes = (state: { connectionTypes: ConnectionTypeState }) =>
  state.connectionTypes.connectionTypes;
export const selectConnectionTypeLoading = (state: { connectionTypes: ConnectionTypeState }) =>
  state.connectionTypes.loading;
export const selectConnectionTypeError = (state: { connectionTypes: ConnectionTypeState }) =>
  state.connectionTypes.error;

// Reducer
export default connectionTypeSlice.reducer;
