// src/store/types/DriverTypes.ts
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { RootState } from '../index';
import { Driver, DriverQueryParams, PaginatedResponse } from '../types/ApiTypes';
import { AppErrorDto } from './ErrorTypes';

export enum DriverStatus {
  Initial = 'INITIAL',
  Fetching = 'FETCHING',
  Success = 'SUCCESS',
  Failed = 'FAILED',
}

export interface DriverState {
  drivers: Driver[];
  total: number;
  currentPage: number;
  pageSize: number;
  status: DriverStatus;
  error: AppErrorDto | null;
}

export const initialDriverState: DriverState = {
  drivers: [],
  total: 0,
  currentPage: 1,
  pageSize: 10,
  status: DriverStatus.Initial,
  error: null,
};

export const DRIVER_GET_DRIVERS_START = 'drivers/getDrivers/start';
export const DRIVER_GET_DRIVERS_SUCCESS = 'drivers/getDrivers/success';
export const DRIVER_GET_DRIVERS_FAILED = 'drivers/getDrivers/failed';

export const DRIVER_CLEAR_ERROR = 'drivers/clearError';

export type DriverAction =
  | Action<typeof DRIVER_GET_DRIVERS_START>
  | { type: typeof DRIVER_GET_DRIVERS_SUCCESS; payload: { response: PaginatedResponse<Driver> } }
  | { type: typeof DRIVER_GET_DRIVERS_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof DRIVER_CLEAR_ERROR>;

export type DriverThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  DriverAction
>;
