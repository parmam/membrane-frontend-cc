// src/store/types/ShiftTypes.ts
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { RootState } from '../index';
import {
  CreateShiftRequest,
  PaginatedResponse,
  Shift,
  ShiftQueryParams,
  UpdateShiftRequest,
} from '../types/ApiTypes';
import { AppErrorDto } from './ErrorTypes';

export enum ShiftStatus {
  Initial = 'INITIAL',
  Fetching = 'FETCHING',
  Creating = 'CREATING',
  Updating = 'UPDATING',
  Deleting = 'DELETING',
  Restoring = 'RESTORING',
  Success = 'SUCCESS',
  Failed = 'FAILED',
}

export interface ShiftState {
  shifts: Shift[];
  selectedShift: Shift | null;
  total: number;
  currentPage: number;
  pageSize: number;
  status: ShiftStatus;
  error: AppErrorDto | null;
}

export const initialShiftState: ShiftState = {
  shifts: [],
  selectedShift: null,
  total: 0,
  currentPage: 1,
  pageSize: 10,
  status: ShiftStatus.Initial,
  error: null,
};

export const SHIFT_GET_SHIFTS_START = 'shifts/getShifts/start';
export const SHIFT_GET_SHIFTS_SUCCESS = 'shifts/getShifts/success';
export const SHIFT_GET_SHIFTS_FAILED = 'shifts/getShifts/failed';

export const SHIFT_GET_BY_ID_START = 'shifts/getById/start';
export const SHIFT_GET_BY_ID_SUCCESS = 'shifts/getById/success';
export const SHIFT_GET_BY_ID_FAILED = 'shifts/getById/failed';

export const SHIFT_CREATE_START = 'shifts/create/start';
export const SHIFT_CREATE_SUCCESS = 'shifts/create/success';
export const SHIFT_CREATE_FAILED = 'shifts/create/failed';

export const SHIFT_UPDATE_START = 'shifts/update/start';
export const SHIFT_UPDATE_SUCCESS = 'shifts/update/success';
export const SHIFT_UPDATE_FAILED = 'shifts/update/failed';

export const SHIFT_DELETE_START = 'shifts/delete/start';
export const SHIFT_DELETE_SUCCESS = 'shifts/delete/success';
export const SHIFT_DELETE_FAILED = 'shifts/delete/failed';

export const SHIFT_RESTORE_START = 'shifts/restore/start';
export const SHIFT_RESTORE_SUCCESS = 'shifts/restore/success';
export const SHIFT_RESTORE_FAILED = 'shifts/restore/failed';

export const SHIFT_CLEAR_ERROR = 'shifts/clearError';

export type ShiftAction =
  | Action<typeof SHIFT_GET_SHIFTS_START>
  | { type: typeof SHIFT_GET_SHIFTS_SUCCESS; payload: { response: PaginatedResponse<Shift> } }
  | { type: typeof SHIFT_GET_SHIFTS_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof SHIFT_GET_BY_ID_START>
  | { type: typeof SHIFT_GET_BY_ID_SUCCESS; payload: { shift: Shift } }
  | { type: typeof SHIFT_GET_BY_ID_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof SHIFT_CREATE_START>
  | { type: typeof SHIFT_CREATE_SUCCESS; payload: { shift: Shift } }
  | { type: typeof SHIFT_CREATE_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof SHIFT_UPDATE_START>
  | { type: typeof SHIFT_UPDATE_SUCCESS; payload: { shift: Shift } }
  | { type: typeof SHIFT_UPDATE_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof SHIFT_DELETE_START>
  | { type: typeof SHIFT_DELETE_SUCCESS; payload: { id: string } }
  | { type: typeof SHIFT_DELETE_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof SHIFT_RESTORE_START>
  | { type: typeof SHIFT_RESTORE_SUCCESS; payload: { shift: Shift } }
  | { type: typeof SHIFT_RESTORE_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof SHIFT_CLEAR_ERROR>;

export type ShiftThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  ShiftAction
>;
