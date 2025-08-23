// src/store/actions/driverActions.ts
import { DriverService } from '../../api/services';
import { Driver, DriverQueryParams, PaginatedResponse } from '../types/ApiTypes';
import {
  DRIVER_CLEAR_ERROR,
  DRIVER_GET_DRIVERS_FAILED,
  DRIVER_GET_DRIVERS_START,
  DRIVER_GET_DRIVERS_SUCCESS,
  DriverAction,
  DriverThunk,
} from '../types/DriverTypes';
import { parseError } from '../types/ErrorTypes';
import { AppErrorDto } from '../types/ErrorTypes';

// Action Creators
export const getDriversStart = (): DriverAction => ({
  type: DRIVER_GET_DRIVERS_START,
});

export const getDriversSuccess = (response: PaginatedResponse<Driver>): DriverAction => ({
  type: DRIVER_GET_DRIVERS_SUCCESS,
  payload: { response },
});

export const getDriversFailed = (error: AppErrorDto): DriverAction => ({
  type: DRIVER_GET_DRIVERS_FAILED,
  payload: { error },
});

export const clearDriverError = (): DriverAction => ({
  type: DRIVER_CLEAR_ERROR,
});

// Thunks
export const getDriversThunk =
  (params?: DriverQueryParams): DriverThunk =>
  async (dispatch) => {
    dispatch(getDriversStart());
    try {
      const response = (await DriverService.getDrivers(params)) ?? {
        data: [],
        total: 0,
        limit: 10,
        offset: 0,
      };
      dispatch(getDriversSuccess(response));
    } catch (error) {
      dispatch(getDriversFailed(parseError(error)));
    }
  };
