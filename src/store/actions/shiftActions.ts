// src/store/actions/shiftActions.ts
import { ShiftService } from '../../api/services';
import {
  CreateShiftRequest,
  PaginatedResponse,
  Shift,
  ShiftQueryParams,
  UpdateShiftRequest,
} from '../types/ApiTypes';
import { AppErrorDto, parseError } from '../types/ErrorTypes';
import {
  SHIFT_CLEAR_ERROR,
  SHIFT_CREATE_FAILED,
  SHIFT_CREATE_START,
  SHIFT_CREATE_SUCCESS,
  SHIFT_DELETE_FAILED,
  SHIFT_DELETE_START,
  SHIFT_DELETE_SUCCESS,
  SHIFT_GET_BY_ID_FAILED,
  SHIFT_GET_BY_ID_START,
  SHIFT_GET_BY_ID_SUCCESS,
  SHIFT_GET_SHIFTS_FAILED,
  SHIFT_GET_SHIFTS_START,
  SHIFT_GET_SHIFTS_SUCCESS,
  SHIFT_RESTORE_FAILED,
  SHIFT_RESTORE_START,
  SHIFT_RESTORE_SUCCESS,
  SHIFT_UPDATE_FAILED,
  SHIFT_UPDATE_START,
  SHIFT_UPDATE_SUCCESS,
  ShiftAction,
  ShiftThunk,
} from '../types/ShiftTypes';

// Action Creators
export const getShiftsStart = (): ShiftAction => ({ type: SHIFT_GET_SHIFTS_START });
export const getShiftsSuccess = (response: PaginatedResponse<Shift>): ShiftAction => ({
  type: SHIFT_GET_SHIFTS_SUCCESS,
  payload: { response },
});
export const getShiftsFailed = (error: AppErrorDto): ShiftAction => ({
  type: SHIFT_GET_SHIFTS_FAILED,
  payload: { error },
});

export const getByIdStart = (): ShiftAction => ({ type: SHIFT_GET_BY_ID_START });
export const getByIdSuccess = (shift: Shift): ShiftAction => ({
  type: SHIFT_GET_BY_ID_SUCCESS,
  payload: { shift },
});
export const getByIdFailed = (error: AppErrorDto): ShiftAction => ({
  type: SHIFT_GET_BY_ID_FAILED,
  payload: { error },
});

export const createStart = (): ShiftAction => ({ type: SHIFT_CREATE_START });
export const createSuccess = (shift: Shift): ShiftAction => ({
  type: SHIFT_CREATE_SUCCESS,
  payload: { shift },
});
export const createFailed = (error: AppErrorDto): ShiftAction => ({
  type: SHIFT_CREATE_FAILED,
  payload: { error },
});

export const updateStart = (): ShiftAction => ({ type: SHIFT_UPDATE_START });
export const updateSuccess = (shift: Shift): ShiftAction => ({
  type: SHIFT_UPDATE_SUCCESS,
  payload: { shift },
});
export const updateFailed = (error: AppErrorDto): ShiftAction => ({
  type: SHIFT_UPDATE_FAILED,
  payload: { error },
});

export const deleteStart = (): ShiftAction => ({ type: SHIFT_DELETE_START });
export const deleteSuccess = (id: string): ShiftAction => ({
  type: SHIFT_DELETE_SUCCESS,
  payload: { id },
});
export const deleteFailed = (error: AppErrorDto): ShiftAction => ({
  type: SHIFT_DELETE_FAILED,
  payload: { error },
});

export const restoreStart = (): ShiftAction => ({ type: SHIFT_RESTORE_START });
export const restoreSuccess = (shift: Shift): ShiftAction => ({
  type: SHIFT_RESTORE_SUCCESS,
  payload: { shift },
});
export const restoreFailed = (error: AppErrorDto): ShiftAction => ({
  type: SHIFT_RESTORE_FAILED,
  payload: { error },
});

export const clearShiftError = (): ShiftAction => ({ type: SHIFT_CLEAR_ERROR });

// Thunks
export const getShiftsThunk =
  (params?: ShiftQueryParams): ShiftThunk =>
  async (dispatch) => {
    dispatch(getShiftsStart());
    try {
      const response = (await ShiftService.getShifts(params)) ?? {
        data: [],
        total: 0,
        limit: 10,
        offset: 0,
      };
      dispatch(getShiftsSuccess(response));
    } catch (error) {
      dispatch(getShiftsFailed(parseError(error)));
    }
  };

export const getShiftByIdThunk =
  (id: string): ShiftThunk =>
  async (dispatch) => {
    dispatch(getByIdStart());
    try {
      const shift = (await ShiftService.getShiftById(id)) ?? {
        id: '',
        name: '',
        description: '',
        createdAt: '',
        updatedAt: '',
        deletedAt: '',
      };
      dispatch(getByIdSuccess(shift));
    } catch (error) {
      dispatch(getByIdFailed(parseError(error)));
    }
  };

export const createShiftThunk =
  (shiftData: CreateShiftRequest): ShiftThunk =>
  async (dispatch) => {
    dispatch(createStart());
    try {
      const shift = (await ShiftService.createShift(shiftData)) ?? {
        id: '',
        name: '',
        description: '',
        createdAt: '',
        updatedAt: '',
        deletedAt: '',
      };
      dispatch(createSuccess(shift));
    } catch (error) {
      dispatch(createFailed(parseError(error)));
    }
  };

export const updateShiftThunk =
  (id: string, shiftData: UpdateShiftRequest): ShiftThunk =>
  async (dispatch) => {
    dispatch(updateStart());
    try {
      const shift = (await ShiftService.updateShift(id, shiftData)) ?? {
        id: '',
        name: '',
        description: '',
        createdAt: '',
        updatedAt: '',
        deletedAt: '',
      };
      dispatch(updateSuccess(shift));
    } catch (error) {
      dispatch(updateFailed(parseError(error)));
    }
  };

export const deleteShiftThunk =
  (id: string): ShiftThunk =>
  async (dispatch) => {
    dispatch(deleteStart());
    try {
      await ShiftService.deleteShift(id);
      dispatch(deleteSuccess(id));
    } catch (error) {
      dispatch(deleteFailed(parseError(error)));
    }
  };

export const restoreShiftThunk =
  (id: string): ShiftThunk =>
  async (dispatch) => {
    dispatch(restoreStart());
    try {
      const shift = (await ShiftService.restoreShift(id)) ?? {
        id: '',
        name: '',
        description: '',
        createdAt: '',
        updatedAt: '',
        deletedAt: '',
      };
      dispatch(restoreSuccess(shift));
    } catch (error) {
      dispatch(restoreFailed(parseError(error)));
    }
  };
