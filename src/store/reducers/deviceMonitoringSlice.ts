// src/store/reducers/deviceMonitoringSlice.ts
import { Reducer } from 'redux';

import {
  DEVICE_MONITORING_CLEAR_ERROR,
  DEVICE_MONITORING_GET_DATA_FAILED,
  DEVICE_MONITORING_GET_DATA_START,
  DEVICE_MONITORING_GET_DATA_SUCCESS,
  DEVICE_MONITORING_GET_LAST_STATUS_BY_ID_FAILED,
  DEVICE_MONITORING_GET_LAST_STATUS_BY_ID_START,
  DEVICE_MONITORING_GET_LAST_STATUS_BY_ID_SUCCESS,
  DEVICE_MONITORING_GET_LAST_STATUS_FAILED,
  DEVICE_MONITORING_GET_LAST_STATUS_START,
  DEVICE_MONITORING_GET_LAST_STATUS_SUCCESS,
  DEVICE_MONITORING_GET_UPTIME_FAILED,
  DEVICE_MONITORING_GET_UPTIME_START,
  DEVICE_MONITORING_GET_UPTIME_SUCCESS,
  DeviceMonitoringAction,
  DeviceMonitoringState,
  DeviceMonitoringStatus,
  initialDeviceMonitoringState,
} from '../types/DeviceMonitoringTypes';

export const deviceMonitoringReducer: Reducer<DeviceMonitoringState, DeviceMonitoringAction> = (
  state = initialDeviceMonitoringState,
  action,
) => {
  switch (action.type) {
    case DEVICE_MONITORING_GET_DATA_START:
    case DEVICE_MONITORING_GET_LAST_STATUS_START:
    case DEVICE_MONITORING_GET_LAST_STATUS_BY_ID_START:
    case DEVICE_MONITORING_GET_UPTIME_START:
      return { ...state, status: DeviceMonitoringStatus.Fetching, error: null };

    case DEVICE_MONITORING_GET_DATA_SUCCESS:
      return {
        ...state,
        monitoringData: action.payload.response.data,
        total: action.payload.response.total,
        currentPage: action.payload.response.offset / action.payload.response.limit + 1,
        pageSize: action.payload.response.limit,
        status: DeviceMonitoringStatus.Success,
      };

    case DEVICE_MONITORING_GET_LAST_STATUS_SUCCESS:
    case DEVICE_MONITORING_GET_LAST_STATUS_BY_ID_SUCCESS:
      return {
        ...state,
        lastStatus: action.payload.lastStatus,
        status: DeviceMonitoringStatus.Success,
      };

    case DEVICE_MONITORING_GET_UPTIME_SUCCESS:
      return {
        ...state,
        uptime: action.payload.uptime,
        status: DeviceMonitoringStatus.Success,
      };

    case DEVICE_MONITORING_GET_DATA_FAILED:
    case DEVICE_MONITORING_GET_LAST_STATUS_FAILED:
    case DEVICE_MONITORING_GET_LAST_STATUS_BY_ID_FAILED:
    case DEVICE_MONITORING_GET_UPTIME_FAILED:
      return { ...state, status: DeviceMonitoringStatus.Failed, error: action.payload.error };

    case DEVICE_MONITORING_CLEAR_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};

export default deviceMonitoringReducer;
