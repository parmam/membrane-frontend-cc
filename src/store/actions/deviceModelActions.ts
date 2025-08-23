// src/store/actions/deviceModelActions.ts
import { DeviceModelService } from '../../api/services/deviceModelService';
import {
  CreateDeviceModelRequest,
  DeviceModel,
  DeviceModelQueryParams,
  PaginatedResponse,
  UpdateDeviceModelRequest,
} from '../types/ApiTypes';
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
  DeviceModelThunk,
} from '../types/DeviceModelTypes';
import { parseError } from '../types/ErrorTypes';
import { AppErrorDto } from '../types/ErrorTypes';

// Action Creators
export const getModelsStart = (): DeviceModelAction => ({ type: DEVICE_MODEL_GET_MODELS_START });
export const getModelsSuccess = (response: PaginatedResponse<DeviceModel>): DeviceModelAction => ({
  type: DEVICE_MODEL_GET_MODELS_SUCCESS,
  payload: { response },
});
export const getModelsFailed = (error: AppErrorDto): DeviceModelAction => ({
  type: DEVICE_MODEL_GET_MODELS_FAILED,
  payload: { error },
});

export const getByIdStart = (): DeviceModelAction => ({ type: DEVICE_MODEL_GET_BY_ID_START });
export const getByIdSuccess = (model: DeviceModel): DeviceModelAction => ({
  type: DEVICE_MODEL_GET_BY_ID_SUCCESS,
  payload: { model },
});
export const getByIdFailed = (error: AppErrorDto): DeviceModelAction => ({
  type: DEVICE_MODEL_GET_BY_ID_FAILED,
  payload: { error },
});

export const createStart = (): DeviceModelAction => ({ type: DEVICE_MODEL_CREATE_START });
export const createSuccess = (model: DeviceModel): DeviceModelAction => ({
  type: DEVICE_MODEL_CREATE_SUCCESS,
  payload: { model },
});
export const createFailed = (error: AppErrorDto): DeviceModelAction => ({
  type: DEVICE_MODEL_CREATE_FAILED,
  payload: { error },
});

export const updateStart = (): DeviceModelAction => ({ type: DEVICE_MODEL_UPDATE_START });
export const updateSuccess = (model: DeviceModel): DeviceModelAction => ({
  type: DEVICE_MODEL_UPDATE_SUCCESS,
  payload: { model },
});
export const updateFailed = (error: AppErrorDto): DeviceModelAction => ({
  type: DEVICE_MODEL_UPDATE_FAILED,
  payload: { error },
});

export const deleteStart = (): DeviceModelAction => ({ type: DEVICE_MODEL_DELETE_START });
export const deleteSuccess = (id: string): DeviceModelAction => ({
  type: DEVICE_MODEL_DELETE_SUCCESS,
  payload: { id },
});
export const deleteFailed = (error: AppErrorDto): DeviceModelAction => ({
  type: DEVICE_MODEL_DELETE_FAILED,
  payload: { error },
});

export const restoreStart = (): DeviceModelAction => ({ type: DEVICE_MODEL_RESTORE_START });
export const restoreSuccess = (model: DeviceModel): DeviceModelAction => ({
  type: DEVICE_MODEL_RESTORE_SUCCESS,
  payload: { model },
});
export const restoreFailed = (error: AppErrorDto): DeviceModelAction => ({
  type: DEVICE_MODEL_RESTORE_FAILED,
  payload: { error },
});

export const clearError = (): DeviceModelAction => ({ type: DEVICE_MODEL_CLEAR_ERROR });

// Thunks
export const getDeviceModelsThunk =
  (params?: DeviceModelQueryParams): DeviceModelThunk =>
  async (dispatch) => {
    dispatch(getModelsStart());
    try {
      const response = (await DeviceModelService.getDeviceModels(params)) ?? {
        data: [],
        total: 0,
        limit: 10,
        offset: 0,
      };
      dispatch(getModelsSuccess(response));
    } catch (error) {
      dispatch(getModelsFailed(parseError(error)));
    }
  };

export const getDeviceModelByIdThunk =
  (id: string): DeviceModelThunk =>
  async (dispatch) => {
    dispatch(getByIdStart());
    try {
      const model = (await DeviceModelService.getDeviceModelById(id)) ?? {
        id: '',
        name: '',
        deviceVendor: { id: '', name: '' },
        deviceType: { id: '', name: '' },
        meta: {},
        createdAt: '',
        updatedAt: '',
        deletedAt: '',
      };
      dispatch(getByIdSuccess(model));
    } catch (error) {
      dispatch(getByIdFailed(parseError(error)));
    }
  };

export const createDeviceModelThunk =
  (deviceModelData: CreateDeviceModelRequest): DeviceModelThunk =>
  async (dispatch) => {
    dispatch(createStart());
    try {
      const model = (await DeviceModelService.createDeviceModel(deviceModelData)) ?? {
        id: '',
        name: '',
        deviceVendor: { id: '', name: '' },
        deviceType: { id: '', name: '' },
        meta: {},
        createdAt: '',
        updatedAt: '',
        deletedAt: '',
      };
      dispatch(createSuccess(model));
    } catch (error) {
      dispatch(createFailed(parseError(error)));
    }
  };

export const updateDeviceModelThunk =
  (id: string, deviceModelData: UpdateDeviceModelRequest): DeviceModelThunk =>
  async (dispatch) => {
    dispatch(updateStart());
    try {
      const model = (await DeviceModelService.updateDeviceModel(id, deviceModelData)) ?? {
        id: '',
        name: '',
        deviceVendor: { id: '', name: '' },
        deviceType: { id: '', name: '' },
        meta: {},
        createdAt: '',
        updatedAt: '',
        deletedAt: '',
      };
      dispatch(updateSuccess(model));
    } catch (error) {
      dispatch(updateFailed(parseError(error)));
    }
  };

export const deleteDeviceModelThunk =
  (id: string): DeviceModelThunk =>
  async (dispatch) => {
    dispatch(deleteStart());
    try {
      await DeviceModelService.deleteDeviceModel(id);
      dispatch(deleteSuccess(id));
    } catch (error) {
      dispatch(deleteFailed(parseError(error)));
    }
  };

export const restoreDeviceModelThunk =
  (id: string): DeviceModelThunk =>
  async (dispatch) => {
    dispatch(restoreStart());
    try {
      const model = (await DeviceModelService.restoreDeviceModel(id)) ?? {
        id: '',
        name: '',
        deviceVendor: { id: '', name: '' },
        deviceType: { id: '', name: '' },
        meta: {},
        createdAt: '',
        updatedAt: '',
        deletedAt: '',
      };
      dispatch(restoreSuccess(model));
    } catch (error) {
      dispatch(restoreFailed(parseError(error)));
    }
  };
