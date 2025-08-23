// src/store/types/DeviceFirmwareTypes.ts
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { RootState } from '../index';
import {
  CreateDeviceFirmwareRequest,
  DeviceFirmware,
  DeviceFirmwareQueryParams,
  PaginatedResponse,
  UpdateDeviceFirmwareRequest,
} from '../types/ApiTypes';
import { AppErrorDto } from './ErrorTypes';

export enum DeviceFirmwareStatus {
  Initial = 'INITIAL',
  Fetching = 'FETCHING',
  Creating = 'CREATING',
  Updating = 'UPDATING',
  Deleting = 'DELETING',
  Restoring = 'RESTORING',
  Success = 'SUCCESS',
  Failed = 'FAILED',
}

export interface DeviceFirmwareState {
  firmwares: DeviceFirmware[];
  selectedFirmware: DeviceFirmware | null;
  total: number;
  currentPage: number;
  pageSize: number;
  status: DeviceFirmwareStatus;
  error: AppErrorDto | null;
}

export const initialDeviceFirmwareState: DeviceFirmwareState = {
  firmwares: [],
  selectedFirmware: null,
  total: 0,
  currentPage: 1,
  pageSize: 10,
  status: DeviceFirmwareStatus.Initial,
  error: null,
};

export const DEVICE_FIRMWARE_GET_FIRMWARES_START = 'deviceFirmwares/getFirmwares/start';
export const DEVICE_FIRMWARE_GET_FIRMWARES_SUCCESS = 'deviceFirmwares/getFirmwares/success';
export const DEVICE_FIRMWARE_GET_FIRMWARES_FAILED = 'deviceFirmwares/getFirmwares/failed';

export const DEVICE_FIRMWARE_GET_BY_ID_START = 'deviceFirmwares/getById/start';
export const DEVICE_FIRMWARE_GET_BY_ID_SUCCESS = 'deviceFirmwares/getById/success';
export const DEVICE_FIRMWARE_GET_BY_ID_FAILED = 'deviceFirmwares/getById/failed';

export const DEVICE_FIRMWARE_CREATE_START = 'deviceFirmwares/create/start';
export const DEVICE_FIRMWARE_CREATE_SUCCESS = 'deviceFirmwares/create/success';
export const DEVICE_FIRMWARE_CREATE_FAILED = 'deviceFirmwares/create/failed';

export const DEVICE_FIRMWARE_UPDATE_START = 'deviceFirmwares/update/start';
export const DEVICE_FIRMWARE_UPDATE_SUCCESS = 'deviceFirmwares/update/success';
export const DEVICE_FIRMWARE_UPDATE_FAILED = 'deviceFirmwares/update/failed';

export const DEVICE_FIRMWARE_DELETE_START = 'deviceFirmwares/delete/start';
export const DEVICE_FIRMWARE_DELETE_SUCCESS = 'deviceFirmwares/delete/success';
export const DEVICE_FIRMWARE_DELETE_FAILED = 'deviceFirmwares/delete/failed';

export const DEVICE_FIRMWARE_RESTORE_START = 'deviceFirmwares/restore/start';
export const DEVICE_FIRMWARE_RESTORE_SUCCESS = 'deviceFirmwares/restore/success';
export const DEVICE_FIRMWARE_RESTORE_FAILED = 'deviceFirmwares/restore/failed';

export const DEVICE_FIRMWARE_CLEAR_ERROR = 'deviceFirmwares/clearError';

export type DeviceFirmwareAction =
  | Action<typeof DEVICE_FIRMWARE_GET_FIRMWARES_START>
  | {
      type: typeof DEVICE_FIRMWARE_GET_FIRMWARES_SUCCESS;
      payload: { response: PaginatedResponse<DeviceFirmware> };
    }
  | { type: typeof DEVICE_FIRMWARE_GET_FIRMWARES_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof DEVICE_FIRMWARE_GET_BY_ID_START>
  | { type: typeof DEVICE_FIRMWARE_GET_BY_ID_SUCCESS; payload: { firmware: DeviceFirmware } }
  | { type: typeof DEVICE_FIRMWARE_GET_BY_ID_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof DEVICE_FIRMWARE_CREATE_START>
  | { type: typeof DEVICE_FIRMWARE_CREATE_SUCCESS; payload: { firmware: DeviceFirmware } }
  | { type: typeof DEVICE_FIRMWARE_CREATE_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof DEVICE_FIRMWARE_UPDATE_START>
  | { type: typeof DEVICE_FIRMWARE_UPDATE_SUCCESS; payload: { firmware: DeviceFirmware } }
  | { type: typeof DEVICE_FIRMWARE_UPDATE_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof DEVICE_FIRMWARE_DELETE_START>
  | { type: typeof DEVICE_FIRMWARE_DELETE_SUCCESS; payload: { id: string } }
  | { type: typeof DEVICE_FIRMWARE_DELETE_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof DEVICE_FIRMWARE_RESTORE_START>
  | { type: typeof DEVICE_FIRMWARE_RESTORE_SUCCESS; payload: { firmware: DeviceFirmware } }
  | { type: typeof DEVICE_FIRMWARE_RESTORE_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof DEVICE_FIRMWARE_CLEAR_ERROR>;

export type DeviceFirmwareThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  DeviceFirmwareAction
>;
