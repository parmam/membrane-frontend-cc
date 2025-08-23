// src/store/reducers/deviceModelReducer.ts
import { Reducer } from 'redux';

import { DeviceModel, PaginatedResponse } from '../types/ApiTypes';
import {
  DEVICE_MODEL_CLEAR_ERROR,
  DEVICE_MODEL_CREATE_FAILED,
  DEVICE_MODEL_CREATE_START,
  DEVICE_MODEL_CREATE_SUCCESS,
  DEVICE_MODEL_DELETE_FAILED,
  DEVICE_MODEL_DELETE_START,
  DEVICE_MODEL_DELETE_SUCCESS,
  DEVICE_MODEL_GET_BY_ID_FAILED,
  DEVICE_MODEL_GET_BY_ID_START,
  DEVICE_MODEL_GET_BY_ID_SUCCESS,
  DEVICE_MODEL_GET_MODELS_FAILED,
  DEVICE_MODEL_GET_MODELS_START,
  DEVICE_MODEL_GET_MODELS_SUCCESS,
  DEVICE_MODEL_RESTORE_FAILED,
  DEVICE_MODEL_RESTORE_START,
  DEVICE_MODEL_RESTORE_SUCCESS,
  DEVICE_MODEL_UPDATE_FAILED,
  DEVICE_MODEL_UPDATE_START,
  DEVICE_MODEL_UPDATE_SUCCESS,
  DeviceModelAction,
  DeviceModelState,
  DeviceModelStatus,
  initialDeviceModelState,
} from '../types/DeviceModelTypes';

export const deviceModelReducer: Reducer<DeviceModelState, DeviceModelAction> = (
  state = initialDeviceModelState,
  action,
) => {
  switch (action.type) {
    case DEVICE_MODEL_GET_MODELS_START:
      return { ...state, status: DeviceModelStatus.Fetching, error: null };
    case DEVICE_MODEL_GET_MODELS_SUCCESS:
      return {
        ...state,
        models: action.payload.response.data,
        total: action.payload.response.total,
        currentPage: action.payload.response.offset / action.payload.response.limit + 1,
        pageSize: action.payload.response.limit,
        status: DeviceModelStatus.Success,
      };
    case DEVICE_MODEL_GET_MODELS_FAILED:
      return { ...state, status: DeviceModelStatus.Failed, error: action.payload.error };

    case DEVICE_MODEL_GET_BY_ID_START:
      return { ...state, status: DeviceModelStatus.Fetching, error: null };
    case DEVICE_MODEL_GET_BY_ID_SUCCESS:
      return { ...state, selectedModel: action.payload.model, status: DeviceModelStatus.Success };
    case DEVICE_MODEL_GET_BY_ID_FAILED:
      return { ...state, status: DeviceModelStatus.Failed, error: action.payload.error };

    case DEVICE_MODEL_CREATE_START:
      return { ...state, status: DeviceModelStatus.Creating, error: null };
    case DEVICE_MODEL_CREATE_SUCCESS:
      return {
        ...state,
        models: [action.payload.model, ...state.models],
        total: state.total + 1,
        status: DeviceModelStatus.Success,
      };
    case DEVICE_MODEL_CREATE_FAILED:
      return { ...state, status: DeviceModelStatus.Failed, error: action.payload.error };

    case DEVICE_MODEL_UPDATE_START:
      return { ...state, status: DeviceModelStatus.Updating, error: null };
    case DEVICE_MODEL_UPDATE_SUCCESS: {
      const updatedModels = state.models.map((m) =>
        m.id === action.payload.model.id ? action.payload.model : m,
      );
      return {
        ...state,
        models: updatedModels,
        selectedModel: action.payload.model,
        status: DeviceModelStatus.Success,
      };
    }
    case DEVICE_MODEL_UPDATE_FAILED:
      return { ...state, status: DeviceModelStatus.Failed, error: action.payload.error };

    case DEVICE_MODEL_DELETE_START:
      return { ...state, status: DeviceModelStatus.Deleting, error: null };
    case DEVICE_MODEL_DELETE_SUCCESS: {
      const filteredModels = state.models.filter((m) => m.id !== action.payload.id);
      return {
        ...state,
        models: filteredModels,
        total: state.total - 1,
        status: DeviceModelStatus.Success,
      };
    }
    case DEVICE_MODEL_DELETE_FAILED:
      return { ...state, status: DeviceModelStatus.Failed, error: action.payload.error };

    case DEVICE_MODEL_RESTORE_START:
      return { ...state, status: DeviceModelStatus.Restoring, error: null };
    case DEVICE_MODEL_RESTORE_SUCCESS:
      return {
        ...state,
        models: [action.payload.model, ...state.models],
        total: state.total + 1,
        status: DeviceModelStatus.Success,
      };
    case DEVICE_MODEL_RESTORE_FAILED:
      return { ...state, status: DeviceModelStatus.Failed, error: action.payload.error };

    case DEVICE_MODEL_CLEAR_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};

export default deviceModelReducer;
