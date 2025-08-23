// src/store/types/DeviceMonitoringTypes.ts
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { RootState } from '../index';
import { DeviceMonitoring, PaginatedResponse } from '../types/ApiTypes';
import { AppErrorDto } from './ErrorTypes';

export enum DeviceMonitoringStatus {
  Initial = 'INITIAL',
  Fetching = 'FETCHING',
  Success = 'SUCCESS',
  Failed = 'FAILED',
}

export interface DeviceMonitoringState {
  monitoringData: DeviceMonitoring[];
  lastStatus: DeviceMonitoring[];
  uptime: unknown;
  total: number;
  currentPage: number;
  pageSize: number;
  status: DeviceMonitoringStatus;
  error: AppErrorDto | null;
}

export const initialDeviceMonitoringState: DeviceMonitoringState = {
  monitoringData: [],
  lastStatus: [],
  uptime: null,
  total: 0,
  currentPage: 1,
  pageSize: 10,
  status: DeviceMonitoringStatus.Initial,
  error: null,
};

export const DEVICE_MONITORING_GET_DATA_START = 'device_monitoring/getData/start';
export const DEVICE_MONITORING_GET_DATA_SUCCESS = 'device_monitoring/getData/success';
export const DEVICE_MONITORING_GET_DATA_FAILED = 'device_monitoring/getData/failed';

export const DEVICE_MONITORING_GET_LAST_STATUS_START = 'device_monitoring/getLastStatus/start';
export const DEVICE_MONITORING_GET_LAST_STATUS_SUCCESS = 'device_monitoring/getLastStatus/success';
export const DEVICE_MONITORING_GET_LAST_STATUS_FAILED = 'device_monitoring/getLastStatus/failed';

export const DEVICE_MONITORING_GET_LAST_STATUS_BY_ID_START =
  'device_monitoring/getLastStatusById/start';
export const DEVICE_MONITORING_GET_LAST_STATUS_BY_ID_SUCCESS =
  'device_monitoring/getLastStatusById/success';
export const DEVICE_MONITORING_GET_LAST_STATUS_BY_ID_FAILED =
  'device_monitoring/getLastStatusById/failed';

export const DEVICE_MONITORING_GET_UPTIME_START = 'device_monitoring/getUptime/start';
export const DEVICE_MONITORING_GET_UPTIME_SUCCESS = 'device_monitoring/getUptime/success';
export const DEVICE_MONITORING_GET_UPTIME_FAILED = 'device_monitoring/getUptime/failed';

export const DEVICE_MONITORING_GET_INITIAL_DATA_START = 'device_monitoring/getInitialData/start';
export const DEVICE_MONITORING_GET_INITIAL_DATA_SUCCESS =
  'device_monitoring/getInitialData/success';
export const DEVICE_MONITORING_GET_INITIAL_DATA_FAILED = 'device_monitoring/getInitialData/failed';

export const DEVICE_MONITORING_CLEAR_ERROR = 'device_monitoring/clearError';

export type DeviceMonitoringAction =
  | Action<typeof DEVICE_MONITORING_GET_DATA_START>
  | {
      type: typeof DEVICE_MONITORING_GET_DATA_SUCCESS;
      payload: { response: PaginatedResponse<DeviceMonitoring> };
    }
  | { type: typeof DEVICE_MONITORING_GET_DATA_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof DEVICE_MONITORING_GET_LAST_STATUS_START>
  | {
      type: typeof DEVICE_MONITORING_GET_LAST_STATUS_SUCCESS;
      payload: { lastStatus: DeviceMonitoring[] };
    }
  | { type: typeof DEVICE_MONITORING_GET_LAST_STATUS_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof DEVICE_MONITORING_GET_LAST_STATUS_BY_ID_START>
  | {
      type: typeof DEVICE_MONITORING_GET_LAST_STATUS_BY_ID_SUCCESS;
      payload: { lastStatus: DeviceMonitoring[] };
    }
  | { type: typeof DEVICE_MONITORING_GET_LAST_STATUS_BY_ID_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof DEVICE_MONITORING_GET_UPTIME_START>
  | {
      type: typeof DEVICE_MONITORING_GET_UPTIME_SUCCESS;
      payload: { uptime: unknown };
    }
  | { type: typeof DEVICE_MONITORING_GET_UPTIME_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof DEVICE_MONITORING_GET_INITIAL_DATA_START>
  | Action<typeof DEVICE_MONITORING_GET_INITIAL_DATA_SUCCESS>
  | { type: typeof DEVICE_MONITORING_GET_INITIAL_DATA_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof DEVICE_MONITORING_CLEAR_ERROR>;

export type DeviceMonitoringThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  DeviceMonitoringAction
>;
