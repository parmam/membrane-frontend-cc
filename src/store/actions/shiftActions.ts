// src/store/actions/shiftActions.ts
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
import { parseError } from '../types/ErrorTypes';

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
    return rejectWithValue(parseError(error));
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
      return rejectWithValue(parseError(error));
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
      return rejectWithValue(parseError(error));
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
    return rejectWithValue(parseError(error));
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
      return rejectWithValue(parseError(error));
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
      return rejectWithValue(parseError(error));
    }
  },
);
