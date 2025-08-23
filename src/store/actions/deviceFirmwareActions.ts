// src/store/actions/deviceFirmwareActions.ts
import { DeviceFirmwareService } from '../../api/services/deviceFirmwareService';
import {
  CreateDeviceFirmwareRequest,
  DeviceFirmware,
  DeviceFirmwareQueryParams,
  PaginatedResponse,
  UpdateDeviceFirmwareRequest,
} from '../types/ApiTypes';
import {
  DEVICE_FIRMWARE_CLEAR_ERROR,
  DEVICE_FIRMWARE_CREATE_FAILED,
  DEVICE_FIRMWARE_CREATE_START,
  DEVICE_FIRMWARE_CREATE_SUCCESS,
  DEVICE_FIRMWARE_DELETE_FAILED,
  DEVICE_FIRMWARE_DELETE_START,
  DEVICE_FIRMWARE_DELETE_SUCCESS,
  DEVICE_FIRMWARE_GET_BY_ID_FAILED,
  DEVICE_FIRMWARE_GET_BY_ID_START,
  DEVICE_FIRMWARE_GET_BY_ID_SUCCESS,
  DEVICE_FIRMWARE_GET_FIRMWARES_FAILED,
  DEVICE_FIRMWARE_GET_FIRMWARES_START,
  DEVICE_FIRMWARE_GET_FIRMWARES_SUCCESS,
  DEVICE_FIRMWARE_RESTORE_FAILED,
  DEVICE_FIRMWARE_RESTORE_START,
  DEVICE_FIRMWARE_RESTORE_SUCCESS,
  DEVICE_FIRMWARE_UPDATE_FAILED,
  DEVICE_FIRMWARE_UPDATE_START,
  DEVICE_FIRMWARE_UPDATE_SUCCESS,
  DeviceFirmwareAction,
  DeviceFirmwareThunk,
} from '../types/DeviceFirmwareTypes';
import { parseError } from '../types/ErrorTypes';
import { AppErrorDto } from '../types/ErrorTypes';

// Action Creators
export const getFirmwaresStart = (): DeviceFirmwareAction => ({
  type: DEVICE_FIRMWARE_GET_FIRMWARES_START,
});
export const getFirmwaresSuccess = (
  response: PaginatedResponse<DeviceFirmware>,
): DeviceFirmwareAction => ({
  type: DEVICE_FIRMWARE_GET_FIRMWARES_SUCCESS,
  payload: { response },
});
export const getFirmwaresFailed = (error: AppErrorDto): DeviceFirmwareAction => ({
  type: DEVICE_FIRMWARE_GET_FIRMWARES_FAILED,
  payload: { error },
});

export const getByIdStart = (): DeviceFirmwareAction => ({ type: DEVICE_FIRMWARE_GET_BY_ID_START });
export const getByIdSuccess = (firmware: DeviceFirmware): DeviceFirmwareAction => ({
  type: DEVICE_FIRMWARE_GET_BY_ID_SUCCESS,
  payload: { firmware },
});
export const getByIdFailed = (error: AppErrorDto): DeviceFirmwareAction => ({
  type: DEVICE_FIRMWARE_GET_BY_ID_FAILED,
  payload: { error },
});

export const createStart = (): DeviceFirmwareAction => ({ type: DEVICE_FIRMWARE_CREATE_START });
export const createSuccess = (firmware: DeviceFirmware): DeviceFirmwareAction => ({
  type: DEVICE_FIRMWARE_CREATE_SUCCESS,
  payload: { firmware },
});
export const createFailed = (error: AppErrorDto): DeviceFirmwareAction => ({
  type: DEVICE_FIRMWARE_CREATE_FAILED,
  payload: { error },
});

export const updateStart = (): DeviceFirmwareAction => ({ type: DEVICE_FIRMWARE_UPDATE_START });
export const updateSuccess = (firmware: DeviceFirmware): DeviceFirmwareAction => ({
  type: DEVICE_FIRMWARE_UPDATE_SUCCESS,
  payload: { firmware },
});
export const updateFailed = (error: AppErrorDto): DeviceFirmwareAction => ({
  type: DEVICE_FIRMWARE_UPDATE_FAILED,
  payload: { error },
});

export const deleteStart = (): DeviceFirmwareAction => ({ type: DEVICE_FIRMWARE_DELETE_START });
export const deleteSuccess = (id: string): DeviceFirmwareAction => ({
  type: DEVICE_FIRMWARE_DELETE_SUCCESS,
  payload: { id },
});
export const deleteFailed = (error: AppErrorDto): DeviceFirmwareAction => ({
  type: DEVICE_FIRMWARE_DELETE_FAILED,
  payload: { error },
});

export const restoreStart = (): DeviceFirmwareAction => ({ type: DEVICE_FIRMWARE_RESTORE_START });
export const restoreSuccess = (firmware: DeviceFirmware): DeviceFirmwareAction => ({
  type: DEVICE_FIRMWARE_RESTORE_SUCCESS,
  payload: { firmware },
});
export const restoreFailed = (error: AppErrorDto): DeviceFirmwareAction => ({
  type: DEVICE_FIRMWARE_RESTORE_FAILED,
  payload: { error },
});

export const clearError = (): DeviceFirmwareAction => ({ type: DEVICE_FIRMWARE_CLEAR_ERROR });

// Thunks
export const getDeviceFirmwaresThunk =
  (params?: DeviceFirmwareQueryParams): DeviceFirmwareThunk =>
  async (dispatch) => {
    dispatch(getFirmwaresStart());
    try {
      const response = (await DeviceFirmwareService.getDeviceFirmwares(params)) ?? {
        data: [],
        total: 0,
        limit: 10,
        offset: 0,
      };
      dispatch(getFirmwaresSuccess(response));
    } catch (error) {
      dispatch(getFirmwaresFailed(parseError(error)));
    }
  };

export const getDeviceFirmwareByIdThunk =
  (id: string): DeviceFirmwareThunk =>
  async (dispatch) => {
    dispatch(getByIdStart());
    try {
      const firmware = (await DeviceFirmwareService.getDeviceFirmwareById(id)) ?? {
        id: '',
        name: '',
        deviceModel: {
          id: '',
          name: '',
          deviceVendor: { id: '', name: '', createdAt: '', updatedAt: '', deletedAt: '' },
          deviceType: { id: '', name: '', createdAt: '', updatedAt: '' },
          meta: {},
          createdAt: '',
          updatedAt: '',
          deletedAt: '',
        },
        driver: { id: '', name: '', createdAt: '', updatedAt: '' },
        meta: {},
        createdAt: '',
        updatedAt: '',
        deletedAt: '',
      };
      dispatch(getByIdSuccess(firmware));
    } catch (error) {
      dispatch(getByIdFailed(parseError(error)));
    }
  };

export const createDeviceFirmwareThunk =
  (firmwareData: CreateDeviceFirmwareRequest): DeviceFirmwareThunk =>
  async (dispatch) => {
    dispatch(createStart());
    try {
      const firmware = (await DeviceFirmwareService.createDeviceFirmware(firmwareData)) ?? {
        id: '',
        name: '',
        deviceModel: {
          id: '',
          name: '',
          deviceVendor: { id: '', name: '', createdAt: '', updatedAt: '', deletedAt: '' },
          deviceType: { id: '', name: '', createdAt: '', updatedAt: '' },
          meta: {},
          createdAt: '',
          updatedAt: '',
          deletedAt: '',
        },
        driver: { id: '', name: '', createdAt: '', updatedAt: '' },
        meta: {},
        createdAt: '',
        updatedAt: '',
        deletedAt: '',
      };
      dispatch(createSuccess(firmware));
    } catch (error) {
      dispatch(createFailed(parseError(error)));
    }
  };

export const updateDeviceFirmwareThunk =
  (id: string, firmwareData: UpdateDeviceFirmwareRequest): DeviceFirmwareThunk =>
  async (dispatch) => {
    dispatch(updateStart());
    try {
      const firmware = (await DeviceFirmwareService.updateDeviceFirmware(id, firmwareData)) ?? {
        id: '',
        name: '',
        deviceModel: {
          id: '',
          name: '',
          deviceVendor: { id: '', name: '', createdAt: '', updatedAt: '', deletedAt: '' },
          deviceType: { id: '', name: '', createdAt: '', updatedAt: '' },
          meta: {},
          createdAt: '',
          updatedAt: '',
          deletedAt: '',
        },
        driver: { id: '', name: '', createdAt: '', updatedAt: '' },
        meta: {},
        createdAt: '',
        updatedAt: '',
        deletedAt: '',
      };
      dispatch(updateSuccess(firmware));
    } catch (error) {
      dispatch(updateFailed(parseError(error)));
    }
  };

export const deleteDeviceFirmwareThunk =
  (id: string): DeviceFirmwareThunk =>
  async (dispatch) => {
    dispatch(deleteStart());
    try {
      await DeviceFirmwareService.deleteDeviceFirmware(id);
      dispatch(deleteSuccess(id));
    } catch (error) {
      dispatch(deleteFailed(parseError(error)));
    }
  };

export const restoreDeviceFirmwareThunk =
  (id: string): DeviceFirmwareThunk =>
  async (dispatch) => {
    dispatch(restoreStart());
    try {
      const firmware = (await DeviceFirmwareService.restoreDeviceFirmware(id)) ?? {
        id: '',
        name: '',
        deviceModel: {
          id: '',
          name: '',
          deviceVendor: { id: '', name: '', createdAt: '', updatedAt: '', deletedAt: '' },
          deviceType: { id: '', name: '', createdAt: '', updatedAt: '' },
          meta: {},
          createdAt: '',
          updatedAt: '',
          deletedAt: '',
        },
        driver: { id: '', name: '', createdAt: '', updatedAt: '' },
        meta: {},
        createdAt: '',
        updatedAt: '',
        deletedAt: '',
      };
      dispatch(restoreSuccess(firmware));
    } catch (error) {
      dispatch(restoreFailed(parseError(error)));
    }
  };
