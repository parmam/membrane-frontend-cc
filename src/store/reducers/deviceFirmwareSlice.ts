// src/store/reducers/deviceFirmwareReducer.ts
import { Reducer } from 'redux';

import { DeviceFirmware, PaginatedResponse } from '../types/ApiTypes';
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
  DeviceFirmwareState,
  DeviceFirmwareStatus,
  initialDeviceFirmwareState,
} from '../types/DeviceFirmwareTypes';

export const deviceFirmwareReducer: Reducer<DeviceFirmwareState, DeviceFirmwareAction> = (
  state = initialDeviceFirmwareState,
  action,
) => {
  switch (action.type) {
    case DEVICE_FIRMWARE_GET_FIRMWARES_START:
      return { ...state, status: DeviceFirmwareStatus.Fetching, error: null };
    case DEVICE_FIRMWARE_GET_FIRMWARES_SUCCESS:
      return {
        ...state,
        firmwares: action.payload.response.data,
        total: action.payload.response.total,
        currentPage: action.payload.response.offset / action.payload.response.limit + 1,
        pageSize: action.payload.response.limit,
        status: DeviceFirmwareStatus.Success,
      };
    case DEVICE_FIRMWARE_GET_FIRMWARES_FAILED:
      return { ...state, status: DeviceFirmwareStatus.Failed, error: action.payload.error };

    case DEVICE_FIRMWARE_GET_BY_ID_START:
      return { ...state, status: DeviceFirmwareStatus.Fetching, error: null };
    case DEVICE_FIRMWARE_GET_BY_ID_SUCCESS:
      return {
        ...state,
        selectedFirmware: action.payload.firmware,
        status: DeviceFirmwareStatus.Success,
      };
    case DEVICE_FIRMWARE_GET_BY_ID_FAILED:
      return { ...state, status: DeviceFirmwareStatus.Failed, error: action.payload.error };

    case DEVICE_FIRMWARE_CREATE_START:
      return { ...state, status: DeviceFirmwareStatus.Creating, error: null };
    case DEVICE_FIRMWARE_CREATE_SUCCESS:
      return {
        ...state,
        firmwares: [action.payload.firmware, ...state.firmwares],
        total: state.total + 1,
        status: DeviceFirmwareStatus.Success,
      };
    case DEVICE_FIRMWARE_CREATE_FAILED:
      return { ...state, status: DeviceFirmwareStatus.Failed, error: action.payload.error };

    case DEVICE_FIRMWARE_UPDATE_START:
      return { ...state, status: DeviceFirmwareStatus.Updating, error: null };
    case DEVICE_FIRMWARE_UPDATE_SUCCESS: {
      const updatedFirmwares = state.firmwares.map((f) =>
        f.id === action.payload.firmware.id ? action.payload.firmware : f,
      );
      return {
        ...state,
        firmwares: updatedFirmwares,
        selectedFirmware: action.payload.firmware,
        status: DeviceFirmwareStatus.Success,
      };
    }
    case DEVICE_FIRMWARE_UPDATE_FAILED:
      return { ...state, status: DeviceFirmwareStatus.Failed, error: action.payload.error };

    case DEVICE_FIRMWARE_DELETE_START:
      return { ...state, status: DeviceFirmwareStatus.Deleting, error: null };
    case DEVICE_FIRMWARE_DELETE_SUCCESS: {
      const filteredFirmwares = state.firmwares.filter((f) => f.id !== action.payload.id);
      return {
        ...state,
        firmwares: filteredFirmwares,
        total: state.total - 1,
        status: DeviceFirmwareStatus.Success,
      };
    }
    case DEVICE_FIRMWARE_DELETE_FAILED:
      return { ...state, status: DeviceFirmwareStatus.Failed, error: action.payload.error };

    case DEVICE_FIRMWARE_RESTORE_START:
      return { ...state, status: DeviceFirmwareStatus.Restoring, error: null };
    case DEVICE_FIRMWARE_RESTORE_SUCCESS:
      return {
        ...state,
        firmwares: [action.payload.firmware, ...state.firmwares],
        total: state.total + 1,
        status: DeviceFirmwareStatus.Success,
      };
    case DEVICE_FIRMWARE_RESTORE_FAILED:
      return { ...state, status: DeviceFirmwareStatus.Failed, error: action.payload.error };

    case DEVICE_FIRMWARE_CLEAR_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};
