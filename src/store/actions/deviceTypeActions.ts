// src/store/actions/deviceTypeActions.ts
import { DeviceTypeService } from '../../api/services';
import { DeviceType, DeviceTypeQueryParams, PaginatedResponse } from '../types/ApiTypes';
import {
  DEVICE_TYPE_CLEAR_ERROR,
  DEVICE_TYPE_GET_TYPES_FAILED,
  DEVICE_TYPE_GET_TYPES_START,
  DEVICE_TYPE_GET_TYPES_SUCCESS,
  DeviceTypeAction,
  DeviceTypeThunk,
} from '../types/DeviceTypeTypes';
import { AppErrorDto, parseError } from '../types/ErrorTypes';

// Action Creators
export const getDeviceTypesStart = (): DeviceTypeAction => ({
  type: DEVICE_TYPE_GET_TYPES_START,
});

export const getDeviceTypesSuccess = (
  response: PaginatedResponse<DeviceType>,
): DeviceTypeAction => ({
  type: DEVICE_TYPE_GET_TYPES_SUCCESS,
  payload: { response },
});

export const getDeviceTypesFailed = (error: AppErrorDto): DeviceTypeAction => ({
  type: DEVICE_TYPE_GET_TYPES_FAILED,
  payload: { error },
});

export const clearDeviceTypeError = (): DeviceTypeAction => ({
  type: DEVICE_TYPE_CLEAR_ERROR,
});

// Thunks
export const getDeviceTypesThunk =
  (params?: DeviceTypeQueryParams): DeviceTypeThunk =>
  async (dispatch) => {
    dispatch(getDeviceTypesStart());
    try {
      const response = (await DeviceTypeService.getDeviceTypes(params)) ?? {
        data: [],
        total: 0,
        limit: 10,
        offset: 0,
      };
      dispatch(getDeviceTypesSuccess(response));
    } catch (error) {
      dispatch(getDeviceTypesFailed(parseError(error)));
    }
  };
