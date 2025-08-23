// src/store/types/DeviceStatusTypes.ts
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { RootState } from '../index';
import { DeviceStatus, PaginatedResponse } from '../types/ApiTypes';
import { AppErrorDto } from './ErrorTypes';

export enum DeviceStatusStatus {
  Initial = 'INITIAL',
  Fetching = 'FETCHING',
  Success = 'SUCCESS',
  Failed = 'FAILED',
}

export interface DeviceStatusState {
  deviceStatuses: DeviceStatus[];
  total: number;
  currentPage: number;
  pageSize: number;
  status: DeviceStatusStatus;
  error: AppErrorDto | null;
}

export const initialDeviceStatusState: DeviceStatusState = {
  deviceStatuses: [],
  total: 0,
  currentPage: 1,
  pageSize: 10,
  status: DeviceStatusStatus.Initial,
  error: null,
};

export const DEVICE_STATUS_GET_STATUSES_START = 'device_status/getStatuses/start';
export const DEVICE_STATUS_GET_STATUSES_SUCCESS = 'device_status/getStatuses/success';
export const DEVICE_STATUS_GET_STATUSES_FAILED = 'device_status/getStatuses/failed';

export const DEVICE_STATUS_CLEAR_ERROR = 'device_status/clearError';

export type DeviceStatusAction =
  | Action<typeof DEVICE_STATUS_GET_STATUSES_START>
  | {
      type: typeof DEVICE_STATUS_GET_STATUSES_SUCCESS;
      payload: { response: PaginatedResponse<DeviceStatus> };
    }
  | { type: typeof DEVICE_STATUS_GET_STATUSES_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof DEVICE_STATUS_CLEAR_ERROR>;

export type DeviceStatusThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  DeviceStatusAction
>;
