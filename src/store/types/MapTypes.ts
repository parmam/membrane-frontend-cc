// src/store/types/MapTypes.ts
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { RootState } from '../index';
import {
  AddDeviceToMapRequest,
  CreateMapRequest,
  DeviceOnMap,
  Map,
  MapQueryParams,
  PaginatedResponse,
} from '../types/ApiTypes';
import { AppErrorDto } from './ErrorTypes';

export enum MapStatus {
  Initial = 'INITIAL',
  Fetching = 'FETCHING',
  Creating = 'CREATING',
  Deleting = 'DELETING',
  Restoring = 'RESTORING',
  AddingDevice = 'ADDING_DEVICE',
  RemovingDevice = 'REMOVING_DEVICE',
  Success = 'SUCCESS',
  Failed = 'FAILED',
}

export interface MapState {
  maps: Map[];
  selectedMap: Map | null;
  total: number;
  currentPage: number;
  pageSize: number;
  status: MapStatus;
  error: AppErrorDto | null;
}

export const initialMapState: MapState = {
  maps: [],
  selectedMap: null,
  total: 0,
  currentPage: 1,
  pageSize: 10,
  status: MapStatus.Initial,
  error: null,
};

export const MAP_GET_MAPS_START = 'maps/getMaps/start';
export const MAP_GET_MAPS_SUCCESS = 'maps/getMaps/success';
export const MAP_GET_MAPS_FAILED = 'maps/getMaps/failed';

export const MAP_GET_BY_ID_START = 'maps/getById/start';
export const MAP_GET_BY_ID_SUCCESS = 'maps/getById/success';
export const MAP_GET_BY_ID_FAILED = 'maps/getById/failed';

export const MAP_CREATE_START = 'maps/create/start';
export const MAP_CREATE_SUCCESS = 'maps/create/success';
export const MAP_CREATE_FAILED = 'maps/create/failed';

export const MAP_DELETE_START = 'maps/delete/start';
export const MAP_DELETE_SUCCESS = 'maps/delete/success';
export const MAP_DELETE_FAILED = 'maps/delete/failed';

export const MAP_RESTORE_START = 'maps/restore/start';
export const MAP_RESTORE_SUCCESS = 'maps/restore/success';
export const MAP_RESTORE_FAILED = 'maps/restore/failed';

export const MAP_ADD_DEVICE_START = 'maps/addDevice/start';
export const MAP_ADD_DEVICE_SUCCESS = 'maps/addDevice/success';
export const MAP_ADD_DEVICE_FAILED = 'maps/addDevice/failed';

export const MAP_REMOVE_DEVICE_START = 'maps/removeDevice/start';
export const MAP_REMOVE_DEVICE_SUCCESS = 'maps/removeDevice/success';
export const MAP_REMOVE_DEVICE_FAILED = 'maps/removeDevice/failed';

export const MAP_CLEAR_ERROR = 'maps/clearError';

export type MapAction =
  | Action<typeof MAP_GET_MAPS_START>
  | { type: typeof MAP_GET_MAPS_SUCCESS; payload: { response: PaginatedResponse<Map> } }
  | { type: typeof MAP_GET_MAPS_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof MAP_GET_BY_ID_START>
  | { type: typeof MAP_GET_BY_ID_SUCCESS; payload: { map: Map } }
  | { type: typeof MAP_GET_BY_ID_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof MAP_CREATE_START>
  | { type: typeof MAP_CREATE_SUCCESS; payload: { map: Map } }
  | { type: typeof MAP_CREATE_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof MAP_DELETE_START>
  | { type: typeof MAP_DELETE_SUCCESS; payload: { id: string } }
  | { type: typeof MAP_DELETE_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof MAP_RESTORE_START>
  | { type: typeof MAP_RESTORE_SUCCESS; payload: { map: Map } }
  | { type: typeof MAP_RESTORE_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof MAP_ADD_DEVICE_START>
  | { type: typeof MAP_ADD_DEVICE_SUCCESS; payload: { device: DeviceOnMap } }
  | { type: typeof MAP_ADD_DEVICE_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof MAP_REMOVE_DEVICE_START>
  | { type: typeof MAP_REMOVE_DEVICE_SUCCESS; payload: { mapId: string; deviceMapId: string } }
  | { type: typeof MAP_REMOVE_DEVICE_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof MAP_CLEAR_ERROR>;

export type MapThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, MapAction>;
