// src/store/actions/newShiftActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';

import { ShiftService } from '../../api/services';
import type {
  CreateShiftRequest,
  PaginatedResponse,
  Shift,
  ShiftQueryParams,
  ThunkApiConfig,
  UpdateShiftRequest,
} from '../types/ApiTypes';

// =======================
// GET SHIFTS (PAGINATED)
// =======================

export const getShiftsThunk = createAsyncThunk<
  PaginatedResponse<Shift>,
  ShiftQueryParams | undefined,
  ThunkApiConfig
>('shifts/getShiftsThunk', async (params, { rejectWithValue }) => {
  try {
    const response = await ShiftService.getShifts(params);
    return response as unknown as PaginatedResponse<Shift>;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch shifts';
    return rejectWithValue(message);
  }
});

// =======================
// GET SHIFT BY ID
// =======================

export const getShiftByIdThunk = createAsyncThunk<Shift, string, ThunkApiConfig>(
  'shifts/getShiftByIdThunk',
  async (id, { rejectWithValue }) => {
    try {
      const response = await ShiftService.getShiftById(id);
      return response as unknown as Shift;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch shift';
      return rejectWithValue(message);
    }
  },
);

// =======================
// CREATE SHIFT
// =======================

export const createShiftThunk = createAsyncThunk<Shift, CreateShiftRequest, ThunkApiConfig>(
  'shifts/createShiftThunk',
  async (shiftData, { rejectWithValue }) => {
    try {
      const response = await ShiftService.createShift(shiftData);
      return response as unknown as Shift;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create shift';
      return rejectWithValue(message);
    }
  },
);

// =======================
// UPDATE SHIFT
// =======================

export const updateShiftThunk = createAsyncThunk<
  Shift,
  { id: string; shiftData: UpdateShiftRequest },
  ThunkApiConfig
>('shifts/updateShiftThunk', async ({ id, shiftData }, { rejectWithValue }) => {
  try {
    const response = await ShiftService.updateShift(id, shiftData);
    return response as unknown as Shift;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update shift';
    return rejectWithValue(message);
  }
});

// =======================
// DELETE SHIFT
// =======================

export const deleteShiftThunk = createAsyncThunk<string, string, ThunkApiConfig>(
  'shifts/deleteShiftThunk',
  async (id, { rejectWithValue }) => {
    try {
      await ShiftService.deleteShift(id);
      return id;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete shift';
      return rejectWithValue(message);
    }
  },
);

// =======================
// RESTORE SHIFT
// =======================

export const restoreShiftThunk = createAsyncThunk<Shift, string, ThunkApiConfig>(
  'shifts/restoreShiftThunk',
  async (id, { rejectWithValue }) => {
    try {
      const response = await ShiftService.restoreShift(id);
      return response as unknown as Shift;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to restore shift';
      return rejectWithValue(message);
    }
  },
);
