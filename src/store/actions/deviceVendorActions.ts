// src/store/actions/deviceVendorActions.ts
import { DeviceVendorService } from '../../api/services/deviceVendorService';
import {
  CreateDeviceVendorRequest,
  DeviceVendor,
  DeviceVendorQueryParams,
  PaginatedResponse,
  UpdateDeviceVendorRequest,
} from '../types/ApiTypes';
import {
  DEVICE_VENDOR_CLEAR_ERROR,
  DEVICE_VENDOR_CLEAR_SELECTED,
  DEVICE_VENDOR_CREATE_FAILED,
  DEVICE_VENDOR_CREATE_START,
  DEVICE_VENDOR_CREATE_SUCCESS,
  DEVICE_VENDOR_DELETE_FAILED,
  DEVICE_VENDOR_DELETE_START,
  DEVICE_VENDOR_DELETE_SUCCESS,
  DEVICE_VENDOR_GET_BY_ID_FAILED,
  DEVICE_VENDOR_GET_BY_ID_START,
  DEVICE_VENDOR_GET_BY_ID_SUCCESS,
  DEVICE_VENDOR_GET_VENDORS_FAILED,
  DEVICE_VENDOR_GET_VENDORS_START,
  DEVICE_VENDOR_GET_VENDORS_SUCCESS,
  DEVICE_VENDOR_RESTORE_FAILED,
  DEVICE_VENDOR_RESTORE_START,
  DEVICE_VENDOR_RESTORE_SUCCESS,
  DEVICE_VENDOR_UPDATE_FAILED,
  DEVICE_VENDOR_UPDATE_START,
  DEVICE_VENDOR_UPDATE_SUCCESS,
  DeviceVendorAction,
  DeviceVendorThunk,
} from '../types/DeviceVendorTypes';
import { AppErrorDto, parseError } from '../types/ErrorTypes';

// Action Creators
export const getVendorsStart = (): DeviceVendorAction => ({
  type: DEVICE_VENDOR_GET_VENDORS_START,
});
export const getVendorsSuccess = (
  response: PaginatedResponse<DeviceVendor>,
): DeviceVendorAction => ({
  type: DEVICE_VENDOR_GET_VENDORS_SUCCESS,
  payload: { response },
});
export const getVendorsFailed = (error: AppErrorDto): DeviceVendorAction => ({
  type: DEVICE_VENDOR_GET_VENDORS_FAILED,
  payload: { error },
});

export const getByIdStart = (): DeviceVendorAction => ({
  type: DEVICE_VENDOR_GET_BY_ID_START,
});
export const getByIdSuccess = (vendor: DeviceVendor): DeviceVendorAction => ({
  type: DEVICE_VENDOR_GET_BY_ID_SUCCESS,
  payload: { vendor },
});
export const getByIdFailed = (error: AppErrorDto): DeviceVendorAction => ({
  type: DEVICE_VENDOR_GET_BY_ID_FAILED,
  payload: { error },
});

export const createStart = (): DeviceVendorAction => ({ type: DEVICE_VENDOR_CREATE_START });
export const createSuccess = (vendor: DeviceVendor): DeviceVendorAction => ({
  type: DEVICE_VENDOR_CREATE_SUCCESS,
  payload: { vendor },
});
export const createFailed = (error: AppErrorDto): DeviceVendorAction => ({
  type: DEVICE_VENDOR_CREATE_FAILED,
  payload: { error },
});

export const updateStart = (): DeviceVendorAction => ({ type: DEVICE_VENDOR_UPDATE_START });
export const updateSuccess = (vendor: DeviceVendor): DeviceVendorAction => ({
  type: DEVICE_VENDOR_UPDATE_SUCCESS,
  payload: { vendor },
});
export const updateFailed = (error: AppErrorDto): DeviceVendorAction => ({
  type: DEVICE_VENDOR_UPDATE_FAILED,
  payload: { error },
});

export const deleteStart = (): DeviceVendorAction => ({ type: DEVICE_VENDOR_DELETE_START });
export const deleteSuccess = (id: string): DeviceVendorAction => ({
  type: DEVICE_VENDOR_DELETE_SUCCESS,
  payload: { id },
});
export const deleteFailed = (error: AppErrorDto): DeviceVendorAction => ({
  type: DEVICE_VENDOR_DELETE_FAILED,
  payload: { error },
});

export const restoreStart = (): DeviceVendorAction => ({ type: DEVICE_VENDOR_RESTORE_START });
export const restoreSuccess = (vendor: DeviceVendor): DeviceVendorAction => ({
  type: DEVICE_VENDOR_RESTORE_SUCCESS,
  payload: { vendor },
});
export const restoreFailed = (error: AppErrorDto): DeviceVendorAction => ({
  type: DEVICE_VENDOR_RESTORE_FAILED,
  payload: { error },
});

export const clearError = (): DeviceVendorAction => ({ type: DEVICE_VENDOR_CLEAR_ERROR });
export const clearSelected = (): DeviceVendorAction => ({ type: DEVICE_VENDOR_CLEAR_SELECTED });

// Thunks
export const getDeviceVendorsThunk =
  (params?: DeviceVendorQueryParams): DeviceVendorThunk =>
  async (dispatch) => {
    dispatch(getVendorsStart());
    try {
      const response = (await DeviceVendorService.getDeviceVendors(params)) ?? {
        data: [],
        total: 0,
        limit: 10,
        offset: 0,
      };
      dispatch(getVendorsSuccess(response));
    } catch (error) {
      dispatch(getVendorsFailed(parseError(error)));
    }
  };

export const getDeviceVendorByIdThunk =
  (id: string): DeviceVendorThunk =>
  async (dispatch) => {
    dispatch(getByIdStart());
    try {
      const vendor = (await DeviceVendorService.getDeviceVendorById(id)) ?? {
        id: '',
        name: '',
        createdAt: '',
        updatedAt: '',
      };
      dispatch(getByIdSuccess(vendor));
    } catch (error) {
      dispatch(getByIdFailed(parseError(error)));
    }
  };

export const createDeviceVendorThunk =
  (vendorData: CreateDeviceVendorRequest): DeviceVendorThunk =>
  async (dispatch) => {
    dispatch(createStart());
    try {
      const vendor = (await DeviceVendorService.createDeviceVendor(vendorData)) ?? {
        id: '',
        name: '',
        createdAt: '',
        updatedAt: '',
      };
      dispatch(createSuccess(vendor));
    } catch (error) {
      dispatch(createFailed(parseError(error)));
    }
  };

export const updateDeviceVendorThunk =
  (id: string, vendorData: UpdateDeviceVendorRequest): DeviceVendorThunk =>
  async (dispatch) => {
    dispatch(updateStart());
    try {
      const vendor = (await DeviceVendorService.updateDeviceVendor(id, vendorData)) ?? {
        id: '',
        name: '',
        createdAt: '',
        updatedAt: '',
      };
      dispatch(updateSuccess(vendor));
    } catch (error) {
      dispatch(updateFailed(parseError(error)));
    }
  };

export const deleteDeviceVendorThunk =
  (id: string): DeviceVendorThunk =>
  async (dispatch) => {
    dispatch(deleteStart());
    try {
      await DeviceVendorService.deleteDeviceVendor(id);
      dispatch(deleteSuccess(id));
    } catch (error) {
      dispatch(deleteFailed(parseError(error)));
    }
  };

export const restoreDeviceVendorThunk =
  (id: string): DeviceVendorThunk =>
  async (dispatch) => {
    dispatch(restoreStart());
    try {
      const vendor = (await DeviceVendorService.restoreDeviceVendor(id)) ?? {
        id: '',
        name: '',
        createdAt: '',
        updatedAt: '',
      };
      dispatch(restoreSuccess(vendor));
    } catch (error) {
      dispatch(restoreFailed(parseError(error)));
    }
  };
