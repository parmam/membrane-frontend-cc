// src/store/reducers/shiftSlice.ts
import { Reducer } from 'redux';

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
  ShiftState,
  ShiftStatus,
  initialShiftState,
} from '../types/ShiftTypes';

export const shiftReducer: Reducer<ShiftState, ShiftAction> = (
  state = initialShiftState,
  action,
) => {
  switch (action.type) {
    case SHIFT_GET_SHIFTS_START:
      return { ...state, status: ShiftStatus.Fetching, error: null };
    case SHIFT_GET_SHIFTS_SUCCESS:
      return {
        ...state,
        shifts: action.payload.response.data,
        total: action.payload.response.total,
        currentPage: action.payload.response.offset / action.payload.response.limit + 1,
        pageSize: action.payload.response.limit,
        status: ShiftStatus.Success,
      };
    case SHIFT_GET_SHIFTS_FAILED:
      return { ...state, status: ShiftStatus.Failed, error: action.payload.error };

    case SHIFT_GET_BY_ID_START:
      return { ...state, status: ShiftStatus.Fetching, error: null };
    case SHIFT_GET_BY_ID_SUCCESS:
      return {
        ...state,
        selectedShift: action.payload.shift,
        status: ShiftStatus.Success,
      };
    case SHIFT_GET_BY_ID_FAILED:
      return { ...state, status: ShiftStatus.Failed, error: action.payload.error };

    case SHIFT_CREATE_START:
      return { ...state, status: ShiftStatus.Creating, error: null };
    case SHIFT_CREATE_SUCCESS:
      return {
        ...state,
        shifts: [action.payload.shift, ...state.shifts],
        total: state.total + 1,
        status: ShiftStatus.Success,
      };
    case SHIFT_CREATE_FAILED:
      return { ...state, status: ShiftStatus.Failed, error: action.payload.error };

    case SHIFT_UPDATE_START:
      return { ...state, status: ShiftStatus.Updating, error: null };
    case SHIFT_UPDATE_SUCCESS: {
      const updatedShifts = state.shifts.map((et) =>
        et.id === action.payload.shift.id ? action.payload.shift : et,
      );
      return {
        ...state,
        shifts: updatedShifts,
        selectedShift: action.payload.shift,
        status: ShiftStatus.Success,
      };
    }
    case SHIFT_UPDATE_FAILED:
      return { ...state, status: ShiftStatus.Failed, error: action.payload.error };

    case SHIFT_DELETE_START:
      return { ...state, status: ShiftStatus.Deleting, error: null };
    case SHIFT_DELETE_SUCCESS: {
      const filteredShifts = state.shifts.filter((et) => et.id !== action.payload.id);
      return {
        ...state,
        shifts: filteredShifts,
        total: state.total - 1,
        status: ShiftStatus.Success,
      };
    }
    case SHIFT_DELETE_FAILED:
      return { ...state, status: ShiftStatus.Failed, error: action.payload.error };

    case SHIFT_RESTORE_START:
      return { ...state, status: ShiftStatus.Restoring, error: null };
    case SHIFT_RESTORE_SUCCESS:
      return {
        ...state,
        shifts: [action.payload.shift, ...state.shifts],
        total: state.total + 1,
        status: ShiftStatus.Success,
      };
    case SHIFT_RESTORE_FAILED:
      return { ...state, status: ShiftStatus.Failed, error: action.payload.error };

    case SHIFT_CLEAR_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};

export default shiftReducer;
