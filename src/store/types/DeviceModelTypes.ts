// src/store/types/DeviceModelTypes.ts
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { RootState } from '../index';
import {
  CreateDeviceModelRequest,
  DeviceModel,
  DeviceModelQueryParams,
  PaginatedResponse,
  UpdateDeviceModelRequest,
} from '../types/ApiTypes';
import { AppErrorDto } from './ErrorTypes';

export enum DeviceModelStatus {
  Initial = 'INITIAL',
  Fetching = 'FETCHING',
  Creating = 'CREATING',
  Updating = 'UPDATING',
  Deleting = 'DELETING',
  Restoring = 'RESTORING',
  Success = 'SUCCESS',
  Failed = 'FAILED',
}

export interface DeviceModelState {
  models: DeviceModel[];
  selectedModel: DeviceModel | null;
  total: number;
  currentPage: number;
  pageSize: number;
  status: DeviceModelStatus;
  error: AppErrorDto | null;
}

export const initialDeviceModelState: DeviceModelState = {
  models: [],
  selectedModel: null,
  total: 0,
  currentPage: 1,
  pageSize: 10,
  status: DeviceModelStatus.Initial,
  error: null,
};

export const DEVICE_MODEL_GET_MODELS_START = 'deviceModels/getModels/start';
export const DEVICE_MODEL_GET_MODELS_SUCCESS = 'deviceModels/getModels/success';
export const DEVICE_MODEL_GET_MODELS_FAILED = 'deviceModels/getModels/failed';

export const DEVICE_MODEL_GET_BY_ID_START = 'deviceModels/getById/start';
export const DEVICE_MODEL_GET_BY_ID_SUCCESS = 'deviceModels/getById/success';
export const DEVICE_MODEL_GET_BY_ID_FAILED = 'deviceModels/getById/failed';

export const DEVICE_MODEL_CREATE_START = 'deviceModels/create/start';
export const DEVICE_MODEL_CREATE_SUCCESS = 'deviceModels/create/success';
export const DEVICE_MODEL_CREATE_FAILED = 'deviceModels/create/failed';

export const DEVICE_MODEL_UPDATE_START = 'deviceModels/update/start';
export const DEVICE_MODEL_UPDATE_SUCCESS = 'deviceModels/update/success';
export const DEVICE_MODEL_UPDATE_FAILED = 'deviceModels/update/failed';

export const DEVICE_MODEL_DELETE_START = 'deviceModels/delete/start';
export const DEVICE_MODEL_DELETE_SUCCESS = 'deviceModels/delete/success';
export const DEVICE_MODEL_DELETE_FAILED = 'deviceModels/delete/failed';

export const DEVICE_MODEL_RESTORE_START = 'deviceModels/restore/start';
export const DEVICE_MODEL_RESTORE_SUCCESS = 'deviceModels/restore/success';
export const DEVICE_MODEL_RESTORE_FAILED = 'deviceModels/restore/failed';

export const DEVICE_MODEL_CLEAR_ERROR = 'deviceModels/clearError';

export type DeviceModelAction =
  | Action<typeof DEVICE_MODEL_GET_MODELS_START>
  | {
      type: typeof DEVICE_MODEL_GET_MODELS_SUCCESS;
      payload: { response: PaginatedResponse<DeviceModel> };
    }
  | { type: typeof DEVICE_MODEL_GET_MODELS_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof DEVICE_MODEL_GET_BY_ID_START>
  | { type: typeof DEVICE_MODEL_GET_BY_ID_SUCCESS; payload: { model: DeviceModel } }
  | { type: typeof DEVICE_MODEL_GET_BY_ID_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof DEVICE_MODEL_CREATE_START>
  | { type: typeof DEVICE_MODEL_CREATE_SUCCESS; payload: { model: DeviceModel } }
  | { type: typeof DEVICE_MODEL_CREATE_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof DEVICE_MODEL_UPDATE_START>
  | { type: typeof DEVICE_MODEL_UPDATE_SUCCESS; payload: { model: DeviceModel } }
  | { type: typeof DEVICE_MODEL_UPDATE_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof DEVICE_MODEL_DELETE_START>
  | { type: typeof DEVICE_MODEL_DELETE_SUCCESS; payload: { id: string } }
  | { type: typeof DEVICE_MODEL_DELETE_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof DEVICE_MODEL_RESTORE_START>
  | { type: typeof DEVICE_MODEL_RESTORE_SUCCESS; payload: { model: DeviceModel } }
  | { type: typeof DEVICE_MODEL_RESTORE_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof DEVICE_MODEL_CLEAR_ERROR>;

export type DeviceModelThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  DeviceModelAction
>;
