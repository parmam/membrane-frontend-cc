// src/store/reducers/deviceTypeSlice.ts
import { Reducer } from 'redux';

import {
  DEVICE_TYPE_CLEAR_ERROR,
  DEVICE_TYPE_GET_TYPES_FAILED,
  DEVICE_TYPE_GET_TYPES_START,
  DEVICE_TYPE_GET_TYPES_SUCCESS,
  DeviceTypeAction,
  DeviceTypeState,
  DeviceTypeStatus,
  initialDeviceTypeState,
} from '../types/DeviceTypeTypes';

export const deviceTypeReducer: Reducer<DeviceTypeState, DeviceTypeAction> = (
  state = initialDeviceTypeState,
  action,
) => {
  switch (action.type) {
    case DEVICE_TYPE_GET_TYPES_START:
      return { ...state, status: DeviceTypeStatus.Fetching, error: null };
    case DEVICE_TYPE_GET_TYPES_SUCCESS:
      return {
        ...state,
        deviceTypes: action.payload.response.data,
        total: action.payload.response.total,
        currentPage: action.payload.response.offset / action.payload.response.limit + 1,
        pageSize: action.payload.response.limit,
        status: DeviceTypeStatus.Success,
      };
    case DEVICE_TYPE_GET_TYPES_FAILED:
      return { ...state, status: DeviceTypeStatus.Failed, error: action.payload.error };
    case DEVICE_TYPE_CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};

export default deviceTypeReducer;
