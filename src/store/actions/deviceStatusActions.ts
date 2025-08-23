// src/store/actions/deviceStatusActions.ts
import { DeviceStatusService } from '../../api/services';
import { DeviceStatus, DeviceStatusQueryParams, PaginatedResponse } from '../types/ApiTypes';
import {
  DEVICE_STATUS_CLEAR_ERROR,
  DEVICE_STATUS_GET_STATUSES_FAILED,
  DEVICE_STATUS_GET_STATUSES_START,
  DEVICE_STATUS_GET_STATUSES_SUCCESS,
  DeviceStatusAction,
  DeviceStatusThunk,
} from '../types/DeviceStatusTypes';
import { AppErrorDto, parseError } from '../types/ErrorTypes';

// Action Creators
export const getDeviceStatusesStart = (): DeviceStatusAction => ({
  type: DEVICE_STATUS_GET_STATUSES_START,
});

export const getDeviceStatusesSuccess = (
  response: PaginatedResponse<DeviceStatus>,
): DeviceStatusAction => ({
  type: DEVICE_STATUS_GET_STATUSES_SUCCESS,
  payload: { response },
});

export const getDeviceStatusesFailed = (error: AppErrorDto): DeviceStatusAction => ({
  type: DEVICE_STATUS_GET_STATUSES_FAILED,
  payload: { error },
});

export const clearDeviceStatusError = (): DeviceStatusAction => ({
  type: DEVICE_STATUS_CLEAR_ERROR,
});

// Thunks
export const getDeviceStatusesThunk =
  (params?: DeviceStatusQueryParams): DeviceStatusThunk =>
  async (dispatch) => {
    dispatch(getDeviceStatusesStart());
    try {
      const response = (await DeviceStatusService.getDeviceStatuses(params)) ?? {
        data: [],
        total: 0,
        limit: 10,
        offset: 0,
      };
      dispatch(getDeviceStatusesSuccess(response));
    } catch (error) {
      dispatch(getDeviceStatusesFailed(parseError(error)));
    }
  };
