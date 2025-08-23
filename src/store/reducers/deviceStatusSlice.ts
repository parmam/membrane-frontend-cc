// src/store/reducers/deviceStatusSlice.ts
import { Reducer } from 'redux';

import {
  DEVICE_STATUS_CLEAR_ERROR,
  DEVICE_STATUS_GET_STATUSES_FAILED,
  DEVICE_STATUS_GET_STATUSES_START,
  DEVICE_STATUS_GET_STATUSES_SUCCESS,
  DeviceStatusAction,
  DeviceStatusState,
  DeviceStatusStatus,
  initialDeviceStatusState,
} from '../types/DeviceStatusTypes';

export const deviceStatusReducer: Reducer<DeviceStatusState, DeviceStatusAction> = (
  state = initialDeviceStatusState,
  action,
) => {
  switch (action.type) {
    case DEVICE_STATUS_GET_STATUSES_START:
      return { ...state, status: DeviceStatusStatus.Fetching, error: null };
    case DEVICE_STATUS_GET_STATUSES_SUCCESS:
      return {
        ...state,
        deviceStatuses: action.payload.response.data,
        total: action.payload.response.total,
        currentPage: action.payload.response.offset / action.payload.response.limit + 1,
        pageSize: action.payload.response.limit,
        status: DeviceStatusStatus.Success,
      };
    case DEVICE_STATUS_GET_STATUSES_FAILED:
      return { ...state, status: DeviceStatusStatus.Failed, error: action.payload.error };
    case DEVICE_STATUS_CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};

export default deviceStatusReducer;
