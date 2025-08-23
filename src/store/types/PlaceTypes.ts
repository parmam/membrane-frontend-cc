// src/store/types/PlaceTypes.ts
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { RootState } from '../index';
import {
  CreatePlaceRequest,
  PaginatedResponse,
  Place,
  PlaceQueryParams,
  UpdatePlaceRequest,
} from '../types/ApiTypes';
import { AppErrorDto } from './ErrorTypes';

export enum PlaceStatus {
  Initial = 'INITIAL',
  Fetching = 'FETCHING',
  Creating = 'CREATING',
  Updating = 'UPDATING',
  Deleting = 'DELETING',
  Restoring = 'RESTORING',
  Success = 'SUCCESS',
  Failed = 'FAILED',
}

export interface PlaceState {
  places: Place[];
  selectedPlace: Place | null;
  total: number;
  currentPage: number;
  pageSize: number;
  status: PlaceStatus;
  error: AppErrorDto | null;
}

export const initialPlaceState: PlaceState = {
  places: [],
  selectedPlace: null,
  total: 0,
  currentPage: 1,
  pageSize: 10,
  status: PlaceStatus.Initial,
  error: null,
};

export const PLACE_GET_PLACES_START = 'places/getPlaces/start';
export const PLACE_GET_PLACES_SUCCESS = 'places/getPlaces/success';
export const PLACE_GET_PLACES_FAILED = 'places/getPlaces/failed';

export const PLACE_GET_BY_ID_START = 'places/getById/start';
export const PLACE_GET_BY_ID_SUCCESS = 'places/getById/success';
export const PLACE_GET_BY_ID_FAILED = 'places/getById/failed';

export const PLACE_CREATE_START = 'places/create/start';
export const PLACE_CREATE_SUCCESS = 'places/create/success';
export const PLACE_CREATE_FAILED = 'places/create/failed';

export const PLACE_UPDATE_START = 'places/update/start';
export const PLACE_UPDATE_SUCCESS = 'places/update/success';
export const PLACE_UPDATE_FAILED = 'places/update/failed';

export const PLACE_DELETE_START = 'places/delete/start';
export const PLACE_DELETE_SUCCESS = 'places/delete/success';
export const PLACE_DELETE_FAILED = 'places/delete/failed';

export const PLACE_RESTORE_START = 'places/restore/start';
export const PLACE_RESTORE_SUCCESS = 'places/restore/success';
export const PLACE_RESTORE_FAILED = 'places/restore/failed';

export const PLACE_CLEAR_ERROR = 'places/clearError';

export type PlaceAction =
  | Action<typeof PLACE_GET_PLACES_START>
  | { type: typeof PLACE_GET_PLACES_SUCCESS; payload: { response: PaginatedResponse<Place> } }
  | { type: typeof PLACE_GET_PLACES_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof PLACE_GET_BY_ID_START>
  | { type: typeof PLACE_GET_BY_ID_SUCCESS; payload: { place: Place } }
  | { type: typeof PLACE_GET_BY_ID_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof PLACE_CREATE_START>
  | { type: typeof PLACE_CREATE_SUCCESS; payload: { place: Place } }
  | { type: typeof PLACE_CREATE_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof PLACE_UPDATE_START>
  | { type: typeof PLACE_UPDATE_SUCCESS; payload: { place: Place } }
  | { type: typeof PLACE_UPDATE_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof PLACE_DELETE_START>
  | { type: typeof PLACE_DELETE_SUCCESS; payload: { id: string } }
  | { type: typeof PLACE_DELETE_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof PLACE_RESTORE_START>
  | { type: typeof PLACE_RESTORE_SUCCESS; payload: { place: Place } }
  | { type: typeof PLACE_RESTORE_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof PLACE_CLEAR_ERROR>;

export type PlaceThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  PlaceAction
>;
