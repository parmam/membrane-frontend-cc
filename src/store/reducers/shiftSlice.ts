// src/store/reducers/shiftSlice.ts
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  createShiftThunk,
  deleteShiftThunk,
  getShiftByIdThunk,
  getShiftsThunk,
  restoreShiftThunk,
  updateShiftThunk,
} from '../actions/shiftActions';
import type { PaginatedResponse, Shift } from '../types/ApiTypes';
import type { ShiftLoadingState } from '../types/LoadingTypes';

// =======================
// STATE INTERFACE
// =======================

export interface ShiftState {
  // Data
  shifts: Shift[];
  selectedShift: Shift | null;

  // Pagination
  total: number;
  currentPage: number;
  pageSize: number;

  // Loading states
  loading: ShiftLoadingState;

  // Error state
  error: string | null;
}

// =======================
// INITIAL STATE
// =======================

const initialLoadingState: ShiftLoadingState = {
  getShiftsThunk: false,
  getShiftByIdThunk: false,
  createShiftThunk: false,
  updateShiftThunk: false,
  deleteShiftThunk: false,
  restoreShiftThunk: false,
};

const initialState: ShiftState = {
  shifts: [],
  selectedShift: null,
  total: 0,
  currentPage: 1,
  pageSize: 10,
  loading: initialLoadingState,
  error: null,
};

// =======================
// SLICE
// =======================

const shiftSlice = createSlice({
  name: 'shifts',
  initialState,
  reducers: {
    clearSelectedShift: (state) => {
      state.selectedShift = null;
    },
    clearShiftError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // GET ALL (paginated)
    builder
      .addCase(getShiftsThunk.pending, (state) => {
        state.loading.getShiftsThunk = true;
        state.error = null;
      })
      .addCase(
        getShiftsThunk.fulfilled,
        (state, action: PayloadAction<PaginatedResponse<Shift>>) => {
          state.loading.getShiftsThunk = false;
          state.shifts = action.payload.data;
          state.total = action.payload.total;
          state.currentPage = action.payload.offset / action.payload.limit + 1;
          state.pageSize = action.payload.limit;
        },
      )
      .addCase(getShiftsThunk.rejected, (state, action) => {
        state.loading.getShiftsThunk = false;
        state.error = (action.payload as string) || 'Failed to fetch shifts.';
      });

    // GET BY ID
    builder
      .addCase(getShiftByIdThunk.pending, (state) => {
        state.loading.getShiftByIdThunk = true;
        state.error = null;
      })
      .addCase(getShiftByIdThunk.fulfilled, (state, action: PayloadAction<Shift>) => {
        state.loading.getShiftByIdThunk = false;
        state.selectedShift = action.payload;
      })
      .addCase(getShiftByIdThunk.rejected, (state, action) => {
        state.loading.getShiftByIdThunk = false;
        state.error = (action.payload as string) || 'Failed to fetch shift.';
      });

    // CREATE
    builder
      .addCase(createShiftThunk.pending, (state) => {
        state.loading.createShiftThunk = true;
        state.error = null;
      })
      .addCase(createShiftThunk.fulfilled, (state, action: PayloadAction<Shift>) => {
        state.loading.createShiftThunk = false;
        state.shifts.unshift(action.payload);
        state.total += 1;
      })
      .addCase(createShiftThunk.rejected, (state, action) => {
        state.loading.createShiftThunk = false;
        state.error = (action.payload as string) || 'Failed to create shift.';
      });

    // UPDATE
    builder
      .addCase(updateShiftThunk.pending, (state) => {
        state.loading.updateShiftThunk = true;
        state.error = null;
      })
      .addCase(updateShiftThunk.fulfilled, (state, action: PayloadAction<Shift>) => {
        state.loading.updateShiftThunk = false;
        const index = state.shifts.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) {
          state.shifts[index] = action.payload;
        }
        if (state.selectedShift?.id === action.payload.id) {
          state.selectedShift = action.payload;
        }
      })
      .addCase(updateShiftThunk.rejected, (state, action) => {
        state.loading.updateShiftThunk = false;
        state.error = (action.payload as string) || 'Failed to update shift.';
      });

    // DELETE
    builder
      .addCase(deleteShiftThunk.pending, (state) => {
        state.loading.deleteShiftThunk = true;
        state.error = null;
      })
      .addCase(deleteShiftThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading.deleteShiftThunk = false;
        state.shifts = state.shifts.filter((s) => s.id !== action.payload);
        state.total -= 1;
      })
      .addCase(deleteShiftThunk.rejected, (state, action) => {
        state.loading.deleteShiftThunk = false;
        state.error = (action.payload as string) || 'Failed to delete shift.';
      });

    // RESTORE
    builder
      .addCase(restoreShiftThunk.pending, (state) => {
        state.loading.restoreShiftThunk = true;
        state.error = null;
      })
      .addCase(restoreShiftThunk.fulfilled, (state, action: PayloadAction<Shift>) => {
        state.loading.restoreShiftThunk = false;
        const index = state.shifts.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) {
          state.shifts[index] = action.payload;
        } else {
          state.shifts.unshift(action.payload);
          state.total += 1;
        }
      })
      .addCase(restoreShiftThunk.rejected, (state, action) => {
        state.loading.restoreShiftThunk = false;
        state.error = (action.payload as string) || 'Failed to restore shift.';
      });
  },
});

// =======================
// EXPORTS
// =======================

// Actions
export const { clearSelectedShift, clearShiftError } = shiftSlice.actions;

// Selectors
export const selectShifts = (state: { shifts: ShiftState }) => state.shifts.shifts;
export const selectSelectedShift = (state: { shifts: ShiftState }) => state.shifts.selectedShift;
export const selectShiftLoading = (state: { shifts: ShiftState }) => state.shifts.loading;
export const selectShiftError = (state: { shifts: ShiftState }) => state.shifts.error;
export const selectShiftPagination = (state: { shifts: ShiftState }) => ({
  total: state.shifts.total,
  currentPage: state.shifts.currentPage,
  pageSize: state.shifts.pageSize,
});

// Reducer
export default shiftSlice.reducer;
