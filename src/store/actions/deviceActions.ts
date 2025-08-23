// src/store/actions/deviceActions.ts
import { DeviceService } from '../../api/services/deviceService';
import {
  CreateDeviceRequest,
  Device,
  DeviceQueryParams,
  PaginatedResponse,
  UpdateDeviceRequest,
} from '../types/ApiTypes';
import {
  DEVICE_CLEAR_ERROR,
  DEVICE_CREATE_FAILED,
  DEVICE_CREATE_START,
  DEVICE_CREATE_SUCCESS,
  DEVICE_DELETE_FAILED,
  DEVICE_DELETE_START,
  DEVICE_DELETE_SUCCESS,
  DEVICE_GET_BY_ID_FAILED,
  DEVICE_GET_BY_ID_START,
  DEVICE_GET_BY_ID_SUCCESS,
  DEVICE_GET_DEVICES_FAILED,
  DEVICE_GET_DEVICES_START,
  DEVICE_GET_DEVICES_SUCCESS,
  DEVICE_RESTORE_FAILED,
  DEVICE_RESTORE_START,
  DEVICE_RESTORE_SUCCESS,
  DEVICE_UPDATE_FAILED,
  DEVICE_UPDATE_START,
  DEVICE_UPDATE_SUCCESS,
  DeviceAction,
  DeviceThunk,
} from '../types/DeviceTypes';
import { parseError } from '../types/ErrorTypes';
import { AppErrorDto } from '../types/ErrorTypes';

// Action Creators
export const getDevicesStart = (): DeviceAction => ({ type: DEVICE_GET_DEVICES_START });
export const getDevicesSuccess = (response: PaginatedResponse<Device>): DeviceAction => ({
  type: DEVICE_GET_DEVICES_SUCCESS,
  payload: { response },
});
export const getDevicesFailed = (error: AppErrorDto): DeviceAction => ({
  type: DEVICE_GET_DEVICES_FAILED,
  payload: { error },
});

export const getByIdStart = (): DeviceAction => ({ type: DEVICE_GET_BY_ID_START });
export const getByIdSuccess = (device: Device): DeviceAction => ({
  type: DEVICE_GET_BY_ID_SUCCESS,
  payload: { device },
});
export const getByIdFailed = (error: AppErrorDto): DeviceAction => ({
  type: DEVICE_GET_BY_ID_FAILED,
  payload: { error },
});

export const createStart = (): DeviceAction => ({ type: DEVICE_CREATE_START });
export const createSuccess = (device: Device): DeviceAction => ({
  type: DEVICE_CREATE_SUCCESS,
  payload: { device },
});
export const createFailed = (error: AppErrorDto): DeviceAction => ({
  type: DEVICE_CREATE_FAILED,
  payload: { error },
});

export const updateStart = (): DeviceAction => ({ type: DEVICE_UPDATE_START });
export const updateSuccess = (device: Device): DeviceAction => ({
  type: DEVICE_UPDATE_SUCCESS,
  payload: { device },
});
export const updateFailed = (error: AppErrorDto): DeviceAction => ({
  type: DEVICE_UPDATE_FAILED,
  payload: { error },
});

export const deleteStart = (): DeviceAction => ({ type: DEVICE_DELETE_START });
export const deleteSuccess = (id: string): DeviceAction => ({
  type: DEVICE_DELETE_SUCCESS,
  payload: { id },
});
export const deleteFailed = (error: AppErrorDto): DeviceAction => ({
  type: DEVICE_DELETE_FAILED,
  payload: { error },
});

export const restoreStart = (): DeviceAction => ({ type: DEVICE_RESTORE_START });
export const restoreSuccess = (device: Device): DeviceAction => ({
  type: DEVICE_RESTORE_SUCCESS,
  payload: { device },
});
export const restoreFailed = (error: AppErrorDto): DeviceAction => ({
  type: DEVICE_RESTORE_FAILED,
  payload: { error },
});

export const clearError = (): DeviceAction => ({ type: DEVICE_CLEAR_ERROR });

// Thunks
export const getDevicesThunk =
  (params?: DeviceQueryParams): DeviceThunk =>
  async (dispatch) => {
    dispatch(getDevicesStart());
    try {
      const response = (await DeviceService.getDevices(params)) ?? {
        data: [],
        total: 0,
        limit: 10,
        offset: 0,
      };
      dispatch(getDevicesSuccess(response));
    } catch (error) {
      dispatch(getDevicesFailed(parseError(error)));
    }
  };

export const getDeviceByIdThunk =
  (id: string): DeviceThunk =>
  async (dispatch) => {
    dispatch(getByIdStart());
    try {
      const device = (await DeviceService.getDeviceById(id)) ?? {
        id: '',
        integrationId: '',
        name: '',
        description: '',
        critical: false,
        fco: false,
        deviceType: '',
        deviceVendor: '',
        deviceModel: '',
        deviceFirmware: '',
        group: '',
        place: '',
        monitoringInterval: 0,
        enableNotifications: false,
        meta: {},
        createdAt: '',
        updatedAt: '',
        deletedAt: '',
      };
      dispatch(getByIdSuccess(device));
    } catch (error) {
      dispatch(getByIdFailed(parseError(error)));
    }
  };

export const createDeviceThunk =
  (deviceData: CreateDeviceRequest): DeviceThunk =>
  async (dispatch) => {
    dispatch(createStart());
    try {
      const device = (await DeviceService.createDevice(deviceData)) ?? {
        id: '',
        integrationId: '',
        name: '',
        description: '',
        critical: false,
        fco: false,
        deviceType: '',
        deviceVendor: '',
        deviceModel: '',
        deviceFirmware: '',
        group: '',
        place: '',
        monitoringInterval: 0,
        enableNotifications: false,
        meta: {},
        createdAt: '',
        updatedAt: '',
        deletedAt: '',
      };
      dispatch(createSuccess(device));
    } catch (error) {
      dispatch(createFailed(parseError(error)));
    }
  };

export const updateDeviceThunk =
  (id: string, deviceData: UpdateDeviceRequest): DeviceThunk =>
  async (dispatch) => {
    dispatch(updateStart());
    try {
      const device = (await DeviceService.updateDevice(id, deviceData)) ?? {
        id: '',
        integrationId: '',
        name: '',
        description: '',
        critical: false,
        fco: false,
        deviceType: '',
        deviceVendor: '',
        deviceModel: '',
        deviceFirmware: '',
        group: '',
        place: '',
        monitoringInterval: 0,
        enableNotifications: false,
        meta: {},
        createdAt: '',
        updatedAt: '',
        deletedAt: '',
      };
      dispatch(updateSuccess(device));
    } catch (error) {
      dispatch(updateFailed(parseError(error)));
    }
  };

export const deleteDeviceThunk =
  (id: string): DeviceThunk =>
  async (dispatch) => {
    dispatch(deleteStart());
    try {
      await DeviceService.deleteDevice(id);
      dispatch(deleteSuccess(id));
    } catch (error) {
      dispatch(deleteFailed(parseError(error)));
    }
  };

export const restoreDeviceThunk =
  (id: string): DeviceThunk =>
  async (dispatch) => {
    dispatch(restoreStart());
    try {
      const device = (await DeviceService.restoreDevice(id)) ?? {
        id: '',
        integrationId: '',
        name: '',
        description: '',
        critical: false,
        fco: false,
        deviceType: '',
        deviceVendor: '',
        deviceModel: '',
        deviceFirmware: '',
        group: '',
        place: '',
        monitoringInterval: 0,
        enableNotifications: false,
        meta: {},
        createdAt: '',
        updatedAt: '',
        deletedAt: '',
      };
      dispatch(restoreSuccess(device));
    } catch (error) {
      dispatch(restoreFailed(parseError(error)));
    }
  };
