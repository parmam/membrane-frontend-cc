// src/store/reducers/deviceReducer.ts
import { Reducer } from 'redux';

import { Device, PaginatedResponse } from '../types/ApiTypes';
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
  DeviceState,
  DeviceStatus,
  initialDeviceState,
} from '../types/DeviceTypes';

export const deviceReducer: Reducer<DeviceState, DeviceAction> = (
  state = initialDeviceState,
  action,
) => {
  switch (action.type) {
    case DEVICE_GET_DEVICES_START:
      return { ...state, status: DeviceStatus.Fetching, error: null };
    case DEVICE_GET_DEVICES_SUCCESS:
      return {
        ...state,
        devices: action.payload.response.data,
        total: action.payload.response.total,
        currentPage: action.payload.response.offset / action.payload.response.limit + 1,
        pageSize: action.payload.response.limit,
        status: DeviceStatus.Success,
      };
    case DEVICE_GET_DEVICES_FAILED:
      return { ...state, status: DeviceStatus.Failed, error: action.payload.error };

    case DEVICE_GET_BY_ID_START:
      return { ...state, status: DeviceStatus.Fetching, error: null };
    case DEVICE_GET_BY_ID_SUCCESS:
      return { ...state, selectedDevice: action.payload.device, status: DeviceStatus.Success };
    case DEVICE_GET_BY_ID_FAILED:
      return { ...state, status: DeviceStatus.Failed, error: action.payload.error };

    case DEVICE_CREATE_START:
      return { ...state, status: DeviceStatus.Creating, error: null };
    case DEVICE_CREATE_SUCCESS:
      return {
        ...state,
        devices: [action.payload.device, ...state.devices],
        total: state.total + 1,
        status: DeviceStatus.Success,
      };
    case DEVICE_CREATE_FAILED:
      return { ...state, status: DeviceStatus.Failed, error: action.payload.error };

    case DEVICE_UPDATE_START:
      return { ...state, status: DeviceStatus.Updating, error: null };
    case DEVICE_UPDATE_SUCCESS: {
      const updatedDevices = state.devices.map((d) =>
        d.id === action.payload.device.id ? action.payload.device : d,
      );
      return {
        ...state,
        devices: updatedDevices,
        selectedDevice: action.payload.device,
        status: DeviceStatus.Success,
      };
    }
    case DEVICE_UPDATE_FAILED:
      return { ...state, status: DeviceStatus.Failed, error: action.payload.error };

    case DEVICE_DELETE_START:
      return { ...state, status: DeviceStatus.Deleting, error: null };
    case DEVICE_DELETE_SUCCESS: {
      const filteredDevices = state.devices.filter((d) => d.id !== action.payload.id);
      return {
        ...state,
        devices: filteredDevices,
        total: state.total - 1,
        status: DeviceStatus.Success,
      };
    }
    case DEVICE_DELETE_FAILED:
      return { ...state, status: DeviceStatus.Failed, error: action.payload.error };

    case DEVICE_RESTORE_START:
      return { ...state, status: DeviceStatus.Restoring, error: null };
    case DEVICE_RESTORE_SUCCESS:
      return {
        ...state,
        devices: [action.payload.device, ...state.devices],
        total: state.total + 1,
        status: DeviceStatus.Success,
      };
    case DEVICE_RESTORE_FAILED:
      return { ...state, status: DeviceStatus.Failed, error: action.payload.error };

    case DEVICE_CLEAR_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};
