// src/store/types/DeviceVendorTypes.ts
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { RootState } from '../index';
import { DeviceVendor, PaginatedResponse } from '../types/ApiTypes';
import { AppErrorDto } from './ErrorTypes';

export enum DeviceVendorStatus {
  Initial = 'INITIAL',
  Fetching = 'FETCHING',
  Creating = 'CREATING',
  Updating = 'UPDATING',
  Deleting = 'DELETING',
  Restoring = 'RESTORING',
  Success = 'SUCCESS',
  Failed = 'FAILED',
}

export interface DeviceVendorState {
  vendors: DeviceVendor[];
  selectedVendor: DeviceVendor | null;
  total: number;
  currentPage: number;
  pageSize: number;
  status: DeviceVendorStatus;
  error: AppErrorDto | null;
}

export const initialDeviceVendorState: DeviceVendorState = {
  vendors: [],
  selectedVendor: null,
  total: 0,
  currentPage: 1,
  pageSize: 10,
  status: DeviceVendorStatus.Initial,
  error: null,
};

export const DEVICE_VENDOR_GET_VENDORS_START = 'device_vendor/getVendors/start';
export const DEVICE_VENDOR_GET_VENDORS_SUCCESS = 'device_vendor/getVendors/success';
export const DEVICE_VENDOR_GET_VENDORS_FAILED = 'device_vendor/getVendors/failed';

export const DEVICE_VENDOR_GET_BY_ID_START = 'device_vendor/getById/start';
export const DEVICE_VENDOR_GET_BY_ID_SUCCESS = 'device_vendor/getById/success';
export const DEVICE_VENDOR_GET_BY_ID_FAILED = 'device_vendor/getById/failed';

export const DEVICE_VENDOR_CREATE_START = 'device_vendor/create/start';
export const DEVICE_VENDOR_CREATE_SUCCESS = 'device_vendor/create/success';
export const DEVICE_VENDOR_CREATE_FAILED = 'device_vendor/create/failed';

export const DEVICE_VENDOR_UPDATE_START = 'device_vendor/update/start';
export const DEVICE_VENDOR_UPDATE_SUCCESS = 'device_vendor/update/success';
export const DEVICE_VENDOR_UPDATE_FAILED = 'device_vendor/update/failed';

export const DEVICE_VENDOR_DELETE_START = 'device_vendor/delete/start';
export const DEVICE_VENDOR_DELETE_SUCCESS = 'device_vendor/delete/success';
export const DEVICE_VENDOR_DELETE_FAILED = 'device_vendor/delete/failed';

export const DEVICE_VENDOR_RESTORE_START = 'device_vendor/restore/start';
export const DEVICE_VENDOR_RESTORE_SUCCESS = 'device_vendor/restore/success';
export const DEVICE_VENDOR_RESTORE_FAILED = 'device_vendor/restore/failed';

export const DEVICE_VENDOR_CLEAR_ERROR = 'device_vendor/clearError';
export const DEVICE_VENDOR_CLEAR_SELECTED = 'device_vendor/clearSelected';

export type DeviceVendorAction =
  | Action<typeof DEVICE_VENDOR_GET_VENDORS_START>
  | {
      type: typeof DEVICE_VENDOR_GET_VENDORS_SUCCESS;
      payload: { response: PaginatedResponse<DeviceVendor> };
    }
  | { type: typeof DEVICE_VENDOR_GET_VENDORS_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof DEVICE_VENDOR_GET_BY_ID_START>
  | { type: typeof DEVICE_VENDOR_GET_BY_ID_SUCCESS; payload: { vendor: DeviceVendor } }
  | { type: typeof DEVICE_VENDOR_GET_BY_ID_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof DEVICE_VENDOR_CREATE_START>
  | { type: typeof DEVICE_VENDOR_CREATE_SUCCESS; payload: { vendor: DeviceVendor } }
  | { type: typeof DEVICE_VENDOR_CREATE_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof DEVICE_VENDOR_UPDATE_START>
  | { type: typeof DEVICE_VENDOR_UPDATE_SUCCESS; payload: { vendor: DeviceVendor } }
  | { type: typeof DEVICE_VENDOR_UPDATE_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof DEVICE_VENDOR_DELETE_START>
  | { type: typeof DEVICE_VENDOR_DELETE_SUCCESS; payload: { id: string } }
  | { type: typeof DEVICE_VENDOR_DELETE_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof DEVICE_VENDOR_RESTORE_START>
  | { type: typeof DEVICE_VENDOR_RESTORE_SUCCESS; payload: { vendor: DeviceVendor } }
  | { type: typeof DEVICE_VENDOR_RESTORE_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof DEVICE_VENDOR_CLEAR_ERROR>
  | Action<typeof DEVICE_VENDOR_CLEAR_SELECTED>;

export type DeviceVendorThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  DeviceVendorAction
>;
