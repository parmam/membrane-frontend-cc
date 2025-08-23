// src/store/reducers/deviceVendorSlice.ts
import { Reducer } from 'redux';

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
  DeviceVendorState,
  DeviceVendorStatus,
  initialDeviceVendorState,
} from '../types/DeviceVendorTypes';

export const deviceVendorReducer: Reducer<DeviceVendorState, DeviceVendorAction> = (
  state = initialDeviceVendorState,
  action,
) => {
  switch (action.type) {
    case DEVICE_VENDOR_GET_VENDORS_START:
    case DEVICE_VENDOR_GET_BY_ID_START:
      return { ...state, status: DeviceVendorStatus.Fetching, error: null };

    case DEVICE_VENDOR_CREATE_START:
      return { ...state, status: DeviceVendorStatus.Creating, error: null };

    case DEVICE_VENDOR_UPDATE_START:
      return { ...state, status: DeviceVendorStatus.Updating, error: null };

    case DEVICE_VENDOR_DELETE_START:
      return { ...state, status: DeviceVendorStatus.Deleting, error: null };

    case DEVICE_VENDOR_RESTORE_START:
      return { ...state, status: DeviceVendorStatus.Restoring, error: null };

    case DEVICE_VENDOR_GET_VENDORS_SUCCESS:
      return {
        ...state,
        vendors: action.payload.response.data,
        total: action.payload.response.total,
        currentPage: action.payload.response.offset / action.payload.response.limit + 1,
        pageSize: action.payload.response.limit,
        status: DeviceVendorStatus.Success,
      };

    case DEVICE_VENDOR_GET_BY_ID_SUCCESS:
      return {
        ...state,
        selectedVendor: action.payload.vendor,
        status: DeviceVendorStatus.Success,
      };

    case DEVICE_VENDOR_CREATE_SUCCESS:
      return {
        ...state,
        vendors: [action.payload.vendor, ...state.vendors],
        total: state.total + 1,
        status: DeviceVendorStatus.Success,
      };

    case DEVICE_VENDOR_UPDATE_SUCCESS: {
      const updatedVendors = state.vendors.map((v) =>
        v.id === action.payload.vendor.id ? action.payload.vendor : v,
      );
      return {
        ...state,
        vendors: updatedVendors,
        selectedVendor:
          state.selectedVendor?.id === action.payload.vendor.id
            ? action.payload.vendor
            : state.selectedVendor,
        status: DeviceVendorStatus.Success,
      };
    }

    case DEVICE_VENDOR_DELETE_SUCCESS: {
      const filteredVendors = state.vendors.filter((v) => v.id !== action.payload.id);
      return {
        ...state,
        vendors: filteredVendors,
        total: state.total - 1,
        status: DeviceVendorStatus.Success,
      };
    }

    case DEVICE_VENDOR_RESTORE_SUCCESS: {
      return {
        ...state,
        vendors: [action.payload.vendor, ...state.vendors],
        total: state.total + 1,
        status: DeviceVendorStatus.Success,
      };
    }

    case DEVICE_VENDOR_GET_VENDORS_FAILED:
    case DEVICE_VENDOR_GET_BY_ID_FAILED:
    case DEVICE_VENDOR_CREATE_FAILED:
    case DEVICE_VENDOR_UPDATE_FAILED:
    case DEVICE_VENDOR_DELETE_FAILED:
    case DEVICE_VENDOR_RESTORE_FAILED:
      return { ...state, status: DeviceVendorStatus.Failed, error: action.payload.error };

    case DEVICE_VENDOR_CLEAR_ERROR:
      return { ...state, error: null };

    case DEVICE_VENDOR_CLEAR_SELECTED:
      return { ...state, selectedVendor: null };

    default:
      return state;
  }
};

export default deviceVendorReducer;
