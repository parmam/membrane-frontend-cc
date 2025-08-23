// src/store/reducers/mapSlice.ts
import { Reducer } from 'redux';

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
  MapState,
  MapStatus,
  initialMapState,
} from '../types/MapTypes';

export const mapReducer: Reducer<MapState, MapAction> = (state = initialMapState, action) => {
  switch (action.type) {
    case MAP_GET_MAPS_START:
    case MAP_GET_BY_ID_START:
      return { ...state, status: MapStatus.Fetching, error: null };
    case MAP_CREATE_START:
      return { ...state, status: MapStatus.Creating, error: null };
    case MAP_DELETE_START:
      return { ...state, status: MapStatus.Deleting, error: null };
    case MAP_RESTORE_START:
      return { ...state, status: MapStatus.Restoring, error: null };
    case MAP_ADD_DEVICE_START:
      return { ...state, status: MapStatus.AddingDevice, error: null };
    case MAP_REMOVE_DEVICE_START:
      return { ...state, status: MapStatus.RemovingDevice, error: null };

    case MAP_GET_MAPS_SUCCESS:
      return {
        ...state,
        maps: action.payload.response.data,
        total: action.payload.response.total,
        currentPage: action.payload.response.offset / action.payload.response.limit + 1,
        pageSize: action.payload.response.limit,
        status: MapStatus.Success,
      };
    case MAP_GET_BY_ID_SUCCESS:
      return { ...state, selectedMap: action.payload.map, status: MapStatus.Success };
    case MAP_CREATE_SUCCESS:
      return {
        ...state,
        maps: [action.payload.map, ...state.maps],
        total: state.total + 1,
        status: MapStatus.Success,
      };
    case MAP_DELETE_SUCCESS:
      return {
        ...state,
        maps: state.maps.filter((m) => m.id !== action.payload.id),
        total: state.total - 1,
        status: MapStatus.Success,
      };
    case MAP_RESTORE_SUCCESS:
      return {
        ...state,
        maps: [action.payload.map, ...state.maps],
        total: state.total + 1,
        status: MapStatus.Success,
      };
    case MAP_ADD_DEVICE_SUCCESS: {
      const { device } = action.payload;
      const updatedMap = state.selectedMap
        ? {
            ...state.selectedMap,
            devices: [...(state.selectedMap.devices || []), device],
          }
        : null;
      return { ...state, selectedMap: updatedMap, status: MapStatus.Success };
    }
    case MAP_REMOVE_DEVICE_SUCCESS: {
      const { deviceMapId } = action.payload;
      const updatedMap = state.selectedMap
        ? {
            ...state.selectedMap,
            devices: (state.selectedMap.devices || []).filter((d) => d.id !== deviceMapId),
          }
        : null;
      return { ...state, selectedMap: updatedMap, status: MapStatus.Success };
    }

    case MAP_GET_MAPS_FAILED:
    case MAP_GET_BY_ID_FAILED:
    case MAP_CREATE_FAILED:
    case MAP_DELETE_FAILED:
    case MAP_RESTORE_FAILED:
    case MAP_ADD_DEVICE_FAILED:
    case MAP_REMOVE_DEVICE_FAILED:
      return { ...state, status: MapStatus.Failed, error: action.payload.error };

    case MAP_CLEAR_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};

export default mapReducer;
