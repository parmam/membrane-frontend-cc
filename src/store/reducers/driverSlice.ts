// src/store/reducers/driverSlice.ts
import { Reducer } from 'redux';

import { Driver, PaginatedResponse } from '../types/ApiTypes';
import {
  DRIVER_CLEAR_ERROR,
  DRIVER_GET_DRIVERS_FAILED,
  DRIVER_GET_DRIVERS_START,
  DRIVER_GET_DRIVERS_SUCCESS,
  DriverAction,
  DriverState,
  DriverStatus,
  initialDriverState,
} from '../types/DriverTypes';
import { AppErrorDto } from '../types/ErrorTypes';

export const driverReducer: Reducer<DriverState, DriverAction> = (
  state = initialDriverState,
  action,
) => {
  switch (action.type) {
    case DRIVER_GET_DRIVERS_START:
      return { ...state, status: DriverStatus.Fetching, error: null };
    case DRIVER_GET_DRIVERS_SUCCESS:
      return {
        ...state,
        drivers: action.payload.response.data,
        total: action.payload.response.total,
        currentPage: action.payload.response.offset / action.payload.response.limit + 1,
        pageSize: action.payload.response.limit,
        status: DriverStatus.Success,
      };
    case DRIVER_GET_DRIVERS_FAILED:
      return { ...state, status: DriverStatus.Failed, error: action.payload.error };
    case DRIVER_CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};

export default driverReducer;
