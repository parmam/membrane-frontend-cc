// src/store/types/DeviceTypeTypes.ts
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { RootState } from '../index';
import { DeviceType, PaginatedResponse } from '../types/ApiTypes';
import { AppErrorDto } from './ErrorTypes';

export enum DeviceTypeStatus {
  Initial = 'INITIAL',
  Fetching = 'FETCHING',
  Success = 'SUCCESS',
  Failed = 'FAILED',
}

export interface DeviceTypeState {
  deviceTypes: DeviceType[];
  total: number;
  currentPage: number;
  pageSize: number;
  status: DeviceTypeStatus;
  error: AppErrorDto | null;
}

export const initialDeviceTypeState: DeviceTypeState = {
  deviceTypes: [],
  total: 0,
  currentPage: 1,
  pageSize: 10,
  status: DeviceTypeStatus.Initial,
  error: null,
};

export const DEVICE_TYPE_GET_TYPES_START = 'device_type/getTypes/start';
export const DEVICE_TYPE_GET_TYPES_SUCCESS = 'device_type/getTypes/success';
export const DEVICE_TYPE_GET_TYPES_FAILED = 'device_type/getTypes/failed';

export const DEVICE_TYPE_CLEAR_ERROR = 'device_type/clearError';

export type DeviceTypeAction =
  | Action<typeof DEVICE_TYPE_GET_TYPES_START>
  | {
      type: typeof DEVICE_TYPE_GET_TYPES_SUCCESS;
      payload: { response: PaginatedResponse<DeviceType> };
    }
  | { type: typeof DEVICE_TYPE_GET_TYPES_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof DEVICE_TYPE_CLEAR_ERROR>;

export type DeviceTypeThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  DeviceTypeAction
>;
