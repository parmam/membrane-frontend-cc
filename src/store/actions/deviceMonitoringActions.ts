// src/store/actions/deviceMonitoringActions.ts
import { DeviceMonitoringService } from '../../api/services/deviceMonitoringService';
import {
  DeviceMonitoring,
  DeviceMonitoringQueryParams,
  GetLastStatusByDeviceRequest,
  GetUptimeFilters,
  LastStatusQueryParams,
  PaginatedResponse,
} from '../types/ApiTypes';
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
  DeviceMonitoringThunk,
} from '../types/DeviceMonitoringTypes';
import { AppErrorDto, parseError } from '../types/ErrorTypes';

// Action Creators
export const getDeviceMonitoringStart = (): DeviceMonitoringAction => ({
  type: DEVICE_MONITORING_GET_DATA_START,
});

export const getDeviceMonitoringSuccess = (
  response: PaginatedResponse<DeviceMonitoring>,
): DeviceMonitoringAction => ({
  type: DEVICE_MONITORING_GET_DATA_SUCCESS,
  payload: { response },
});

export const getDeviceMonitoringFailed = (error: AppErrorDto): DeviceMonitoringAction => ({
  type: DEVICE_MONITORING_GET_DATA_FAILED,
  payload: { error },
});

export const getLastStatusStart = (): DeviceMonitoringAction => ({
  type: DEVICE_MONITORING_GET_LAST_STATUS_START,
});

export const getLastStatusSuccess = (lastStatus: DeviceMonitoring[]): DeviceMonitoringAction => ({
  type: DEVICE_MONITORING_GET_LAST_STATUS_SUCCESS,
  payload: { lastStatus },
});

export const getLastStatusFailed = (error: AppErrorDto): DeviceMonitoringAction => ({
  type: DEVICE_MONITORING_GET_LAST_STATUS_FAILED,
  payload: { error },
});

export const getLastStatusByIdStart = (): DeviceMonitoringAction => ({
  type: DEVICE_MONITORING_GET_LAST_STATUS_BY_ID_START,
});

export const getLastStatusByIdSuccess = (
  lastStatus: DeviceMonitoring[],
): DeviceMonitoringAction => ({
  type: DEVICE_MONITORING_GET_LAST_STATUS_BY_ID_SUCCESS,
  payload: { lastStatus },
});

export const getLastStatusByIdFailed = (error: AppErrorDto): DeviceMonitoringAction => ({
  type: DEVICE_MONITORING_GET_LAST_STATUS_BY_ID_FAILED,
  payload: { error },
});

export const getUptimeStart = (): DeviceMonitoringAction => ({
  type: DEVICE_MONITORING_GET_UPTIME_START,
});

export const getUptimeSuccess = (uptime: unknown): DeviceMonitoringAction => ({
  type: DEVICE_MONITORING_GET_UPTIME_SUCCESS,
  payload: { uptime },
});

export const getUptimeFailed = (error: AppErrorDto): DeviceMonitoringAction => ({
  type: DEVICE_MONITORING_GET_UPTIME_FAILED,
  payload: { error },
});

export const clearDeviceMonitoringError = (): DeviceMonitoringAction => ({
  type: DEVICE_MONITORING_CLEAR_ERROR,
});

// Thunks
export const getDeviceMonitoringThunk =
  (params?: DeviceMonitoringQueryParams): DeviceMonitoringThunk =>
  async (dispatch) => {
    dispatch(getDeviceMonitoringStart());
    try {
      const response = (await DeviceMonitoringService.getDeviceMonitoring(params)) ?? {
        data: [],
        total: 0,
        limit: 10,
        offset: 0,
      };
      dispatch(getDeviceMonitoringSuccess(response));
    } catch (error) {
      dispatch(getDeviceMonitoringFailed(parseError(error)));
    }
  };

export const getLastStatusThunk =
  (params: LastStatusQueryParams): DeviceMonitoringThunk =>
  async (dispatch) => {
    dispatch(getLastStatusStart());
    try {
      const response = (await DeviceMonitoringService.getLastStatus(params)) ?? [];
      dispatch(getLastStatusSuccess(response));
    } catch (error) {
      dispatch(getLastStatusFailed(parseError(error)));
    }
  };

export const getLastStatusByIdThunk =
  (deviceData: GetLastStatusByDeviceRequest): DeviceMonitoringThunk =>
  async (dispatch) => {
    dispatch(getLastStatusByIdStart());
    try {
      const response = (await DeviceMonitoringService.getLastStatusById(deviceData)) ?? [];
      dispatch(getLastStatusByIdSuccess(response));
    } catch (error) {
      dispatch(getLastStatusByIdFailed(parseError(error)));
    }
  };

export const getUptimeThunk =
  (filters: GetUptimeFilters): DeviceMonitoringThunk =>
  async (dispatch) => {
    dispatch(getUptimeStart());
    try {
      const response = await DeviceMonitoringService.getUptime(filters);
      dispatch(getUptimeSuccess(response));
    } catch (error) {
      dispatch(getUptimeFailed(parseError(error)));
    }
  };
