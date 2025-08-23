// src/store/types/DeviceTypes.ts
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { RootState } from '../index';
import {
  CreateDeviceRequest,
  Device,
  DeviceQueryParams,
  PaginatedResponse,
  UpdateDeviceRequest,
} from '../types/ApiTypes';
import { AppErrorDto } from './ErrorTypes';

export enum DeviceStatus {
  Initial = 'INITIAL',
  Fetching = 'FETCHING',
  Creating = 'CREATING',
  Updating = 'UPDATING',
  Deleting = 'DELETING',
  Restoring = 'RESTORING',
  Success = 'SUCCESS',
  Failed = 'FAILED',
}

export interface DeviceState {
  devices: Device[];
  selectedDevice: Device | null;
  total: number;
  currentPage: number;
  pageSize: number;
  status: DeviceStatus;
  error: AppErrorDto | null;
}

export const initialDeviceState: DeviceState = {
  devices: [],
  selectedDevice: null,
  total: 0,
  currentPage: 1,
  pageSize: 10,
  status: DeviceStatus.Initial,
  error: null,
};

export const DEVICE_GET_DEVICES_START = 'devices/getDevices/start';
export const DEVICE_GET_DEVICES_SUCCESS = 'devices/getDevices/success';
export const DEVICE_GET_DEVICES_FAILED = 'devices/getDevices/failed';

export const DEVICE_GET_BY_ID_START = 'devices/getById/start';
export const DEVICE_GET_BY_ID_SUCCESS = 'devices/getById/success';
export const DEVICE_GET_BY_ID_FAILED = 'devices/getById/failed';

export const DEVICE_CREATE_START = 'devices/create/start';
export const DEVICE_CREATE_SUCCESS = 'devices/create/success';
export const DEVICE_CREATE_FAILED = 'devices/create/failed';

export const DEVICE_UPDATE_START = 'devices/update/start';
export const DEVICE_UPDATE_SUCCESS = 'devices/update/success';
export const DEVICE_UPDATE_FAILED = 'devices/update/failed';

export const DEVICE_DELETE_START = 'devices/delete/start';
export const DEVICE_DELETE_SUCCESS = 'devices/delete/success';
export const DEVICE_DELETE_FAILED = 'devices/delete/failed';

export const DEVICE_RESTORE_START = 'devices/restore/start';
export const DEVICE_RESTORE_SUCCESS = 'devices/restore/success';
export const DEVICE_RESTORE_FAILED = 'devices/restore/failed';

export const DEVICE_CLEAR_ERROR = 'devices/clearError';

export type DeviceAction =
  | Action<typeof DEVICE_GET_DEVICES_START>
  | { type: typeof DEVICE_GET_DEVICES_SUCCESS; payload: { response: PaginatedResponse<Device> } }
  | { type: typeof DEVICE_GET_DEVICES_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof DEVICE_GET_BY_ID_START>
  | { type: typeof DEVICE_GET_BY_ID_SUCCESS; payload: { device: Device } }
  | { type: typeof DEVICE_GET_BY_ID_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof DEVICE_CREATE_START>
  | { type: typeof DEVICE_CREATE_SUCCESS; payload: { device: Device } }
  | { type: typeof DEVICE_CREATE_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof DEVICE_UPDATE_START>
  | { type: typeof DEVICE_UPDATE_SUCCESS; payload: { device: Device } }
  | { type: typeof DEVICE_UPDATE_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof DEVICE_DELETE_START>
  | { type: typeof DEVICE_DELETE_SUCCESS; payload: { id: string } }
  | { type: typeof DEVICE_DELETE_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof DEVICE_RESTORE_START>
  | { type: typeof DEVICE_RESTORE_SUCCESS; payload: { device: Device } }
  | { type: typeof DEVICE_RESTORE_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof DEVICE_CLEAR_ERROR>;

export type DeviceThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  DeviceAction
>;
