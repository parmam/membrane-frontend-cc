// src/store/actions/mapActions.ts
import { MapService } from '../../api/services';
import {
  AddDeviceToMapRequest,
  CreateMapRequest,
  DeviceOnMap,
  Map,
  MapQueryParams,
  PaginatedResponse,
} from '../types/ApiTypes';
import { parseError } from '../types/ErrorTypes';
import { AppErrorDto } from '../types/ErrorTypes';
import {
  MAP_ADD_DEVICE_FAILED,
  MAP_ADD_DEVICE_START,
  MAP_ADD_DEVICE_SUCCESS,
  MAP_CLEAR_ERROR,
  MAP_CREATE_FAILED,
  MAP_CREATE_START,
  MAP_CREATE_SUCCESS,
  MAP_DELETE_FAILED,
  MAP_DELETE_START,
  MAP_DELETE_SUCCESS,
  MAP_GET_BY_ID_FAILED,
  MAP_GET_BY_ID_START,
  MAP_GET_BY_ID_SUCCESS,
  MAP_GET_MAPS_FAILED,
  MAP_GET_MAPS_START,
  MAP_GET_MAPS_SUCCESS,
  MAP_REMOVE_DEVICE_FAILED,
  MAP_REMOVE_DEVICE_START,
  MAP_REMOVE_DEVICE_SUCCESS,
  MAP_RESTORE_FAILED,
  MAP_RESTORE_START,
  MAP_RESTORE_SUCCESS,
  MapAction,
  MapThunk,
} from '../types/MapTypes';

// Action Creators
export const getMapsStart = (): MapAction => ({ type: MAP_GET_MAPS_START });
export const getMapsSuccess = (response: PaginatedResponse<Map>): MapAction => ({
  type: MAP_GET_MAPS_SUCCESS,
  payload: { response },
});
export const getMapsFailed = (error: AppErrorDto): MapAction => ({
  type: MAP_GET_MAPS_FAILED,
  payload: { error },
});

export const getByIdStart = (): MapAction => ({ type: MAP_GET_BY_ID_START });
export const getByIdSuccess = (map: Map): MapAction => ({
  type: MAP_GET_BY_ID_SUCCESS,
  payload: { map },
});
export const getByIdFailed = (error: AppErrorDto): MapAction => ({
  type: MAP_GET_BY_ID_FAILED,
  payload: { error },
});

export const createStart = (): MapAction => ({ type: MAP_CREATE_START });
export const createSuccess = (map: Map): MapAction => ({
  type: MAP_CREATE_SUCCESS,
  payload: { map },
});
export const createFailed = (error: AppErrorDto): MapAction => ({
  type: MAP_CREATE_FAILED,
  payload: { error },
});

export const deleteStart = (): MapAction => ({ type: MAP_DELETE_START });
export const deleteSuccess = (id: string): MapAction => ({
  type: MAP_DELETE_SUCCESS,
  payload: { id },
});
export const deleteFailed = (error: AppErrorDto): MapAction => ({
  type: MAP_DELETE_FAILED,
  payload: { error },
});

export const restoreStart = (): MapAction => ({ type: MAP_RESTORE_START });
export const restoreSuccess = (map: Map): MapAction => ({
  type: MAP_RESTORE_SUCCESS,
  payload: { map },
});
export const restoreFailed = (error: AppErrorDto): MapAction => ({
  type: MAP_RESTORE_FAILED,
  payload: { error },
});

export const addDeviceStart = (): MapAction => ({ type: MAP_ADD_DEVICE_START });
export const addDeviceSuccess = (device: DeviceOnMap): MapAction => ({
  type: MAP_ADD_DEVICE_SUCCESS,
  payload: { device },
});
export const addDeviceFailed = (error: AppErrorDto): MapAction => ({
  type: MAP_ADD_DEVICE_FAILED,
  payload: { error },
});

export const removeDeviceStart = (): MapAction => ({ type: MAP_REMOVE_DEVICE_START });
export const removeDeviceSuccess = (mapId: string, deviceMapId: string): MapAction => ({
  type: MAP_REMOVE_DEVICE_SUCCESS,
  payload: { mapId, deviceMapId },
});
export const removeDeviceFailed = (error: AppErrorDto): MapAction => ({
  type: MAP_REMOVE_DEVICE_FAILED,
  payload: { error },
});

export const clearMapError = (): MapAction => ({ type: MAP_CLEAR_ERROR });

// Thunks
export const getMapsThunk =
  (params?: MapQueryParams): MapThunk =>
  async (dispatch) => {
    dispatch(getMapsStart());
    try {
      const response = (await MapService.getMaps(params)) ?? {
        data: [],
        total: 0,
        limit: 10,
        offset: 0,
      };
      dispatch(getMapsSuccess(response));
    } catch (error) {
      dispatch(getMapsFailed(parseError(error)));
    }
  };

export const getMapByIdThunk =
  (id: string): MapThunk =>
  async (dispatch) => {
    dispatch(getByIdStart());
    try {
      const map = (await MapService.getMapById(id)) ?? { id: '', place: '', name: '' };
      dispatch(getByIdSuccess(map));
    } catch (error) {
      dispatch(getByIdFailed(parseError(error)));
    }
  };

export const createMapThunk =
  (mapData: CreateMapRequest): MapThunk =>
  async (dispatch) => {
    dispatch(createStart());
    try {
      const map = (await MapService.createMap(mapData)) ?? { id: '', place: '', name: '' };
      dispatch(createSuccess(map));
    } catch (error) {
      dispatch(createFailed(parseError(error)));
    }
  };

export const deleteMapThunk =
  (id: string): MapThunk =>
  async (dispatch) => {
    dispatch(deleteStart());
    try {
      await MapService.deleteMap(id);
      dispatch(deleteSuccess(id));
    } catch (error) {
      dispatch(deleteFailed(parseError(error)));
    }
  };

export const restoreMapThunk =
  (id: string): MapThunk =>
  async (dispatch) => {
    dispatch(restoreStart());
    try {
      const map = (await MapService.restoreMap(id)) ?? { id: '', place: '', name: '' };
      dispatch(restoreSuccess(map));
    } catch (error) {
      dispatch(restoreFailed(parseError(error)));
    }
  };

export const addDeviceToMapThunk =
  (id: string, deviceData: AddDeviceToMapRequest): MapThunk =>
  async (dispatch) => {
    dispatch(addDeviceStart());
    try {
      const device = (await MapService.addDeviceToMap(id, deviceData)) ?? {
        id: '',
        device: '',
        posX: 0,
        posY: 0,
        radius: 0,
        strokeColor: '',
        strokeWidth: 0,
      };
      dispatch(addDeviceSuccess(device));
    } catch (error) {
      dispatch(addDeviceFailed(parseError(error)));
    }
  };

export const removeDeviceFromMapThunk =
  (mapId: string, deviceMapId: string): MapThunk =>
  async (dispatch) => {
    dispatch(removeDeviceStart());
    try {
      await MapService.removeDeviceFromMap(mapId, deviceMapId);
      dispatch(removeDeviceSuccess(mapId, deviceMapId));
    } catch (error) {
      dispatch(removeDeviceFailed(parseError(error)));
    }
  };
