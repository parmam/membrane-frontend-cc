// src/store/actions/placeActions.ts
import { PlaceService } from '../../api/services';
import {
  CreatePlaceRequest,
  PaginatedResponse,
  Place,
  PlaceQueryParams,
  UpdatePlaceRequest,
} from '../types/ApiTypes';
import { parseError } from '../types/ErrorTypes';
import { AppErrorDto } from '../types/ErrorTypes';
import {
  PLACE_CLEAR_ERROR,
  PLACE_CREATE_FAILED,
  PLACE_CREATE_START,
  PLACE_CREATE_SUCCESS,
  PLACE_DELETE_FAILED,
  PLACE_DELETE_START,
  PLACE_DELETE_SUCCESS,
  PLACE_GET_BY_ID_FAILED,
  PLACE_GET_BY_ID_START,
  PLACE_GET_BY_ID_SUCCESS,
  PLACE_GET_PLACES_FAILED,
  PLACE_GET_PLACES_START,
  PLACE_GET_PLACES_SUCCESS,
  PLACE_RESTORE_FAILED,
  PLACE_RESTORE_START,
  PLACE_RESTORE_SUCCESS,
  PLACE_UPDATE_FAILED,
  PLACE_UPDATE_START,
  PLACE_UPDATE_SUCCESS,
  PlaceAction,
  PlaceThunk,
} from '../types/PlaceTypes';

// Action Creators
export const getPlacesStart = (): PlaceAction => ({ type: PLACE_GET_PLACES_START });
export const getPlacesSuccess = (response: PaginatedResponse<Place>): PlaceAction => ({
  type: PLACE_GET_PLACES_SUCCESS,
  payload: { response },
});
export const getPlacesFailed = (error: AppErrorDto): PlaceAction => ({
  type: PLACE_GET_PLACES_FAILED,
  payload: { error },
});

export const getByIdStart = (): PlaceAction => ({ type: PLACE_GET_BY_ID_START });
export const getByIdSuccess = (place: Place): PlaceAction => ({
  type: PLACE_GET_BY_ID_SUCCESS,
  payload: { place },
});
export const getByIdFailed = (error: AppErrorDto): PlaceAction => ({
  type: PLACE_GET_BY_ID_FAILED,
  payload: { error },
});

export const createStart = (): PlaceAction => ({ type: PLACE_CREATE_START });
export const createSuccess = (place: Place): PlaceAction => ({
  type: PLACE_CREATE_SUCCESS,
  payload: { place },
});
export const createFailed = (error: AppErrorDto): PlaceAction => ({
  type: PLACE_CREATE_FAILED,
  payload: { error },
});

export const updateStart = (): PlaceAction => ({ type: PLACE_UPDATE_START });
export const updateSuccess = (place: Place): PlaceAction => ({
  type: PLACE_UPDATE_SUCCESS,
  payload: { place },
});
export const updateFailed = (error: AppErrorDto): PlaceAction => ({
  type: PLACE_UPDATE_FAILED,
  payload: { error },
});

export const deleteStart = (): PlaceAction => ({ type: PLACE_DELETE_START });
export const deleteSuccess = (id: string): PlaceAction => ({
  type: PLACE_DELETE_SUCCESS,
  payload: { id },
});
export const deleteFailed = (error: AppErrorDto): PlaceAction => ({
  type: PLACE_DELETE_FAILED,
  payload: { error },
});

export const restoreStart = (): PlaceAction => ({ type: PLACE_RESTORE_START });
export const restoreSuccess = (place: Place): PlaceAction => ({
  type: PLACE_RESTORE_SUCCESS,
  payload: { place },
});
export const restoreFailed = (error: AppErrorDto): PlaceAction => ({
  type: PLACE_RESTORE_FAILED,
  payload: { error },
});

export const clearPlaceError = (): PlaceAction => ({ type: PLACE_CLEAR_ERROR });

// Thunks
export const getPlacesThunk =
  (params?: PlaceQueryParams): PlaceThunk =>
  async (dispatch) => {
    dispatch(getPlacesStart());
    try {
      const response = (await PlaceService.getPlaces(params)) ?? {
        data: [],
        total: 0,
        limit: 10,
        offset: 0,
      };
      dispatch(getPlacesSuccess(response));
    } catch (error) {
      dispatch(getPlacesFailed(parseError(error)));
    }
  };

export const getPlaceByIdThunk =
  (id: string): PlaceThunk =>
  async (dispatch) => {
    dispatch(getByIdStart());
    try {
      const place = (await PlaceService.getPlaceById(id)) ?? {
        id: '',
        name: '',
        createdAt: '',
        updatedAt: '',
      };
      dispatch(getByIdSuccess(place));
    } catch (error) {
      dispatch(getByIdFailed(parseError(error)));
    }
  };

export const createPlaceThunk =
  (placeData: CreatePlaceRequest): PlaceThunk =>
  async (dispatch) => {
    dispatch(createStart());
    try {
      const place = (await PlaceService.createPlace(placeData)) ?? {
        id: '',
        name: '',
        createdAt: '',
        updatedAt: '',
      };
      dispatch(createSuccess(place));
    } catch (error) {
      dispatch(createFailed(parseError(error)));
    }
  };

export const updatePlaceThunk =
  (id: string, placeData: UpdatePlaceRequest): PlaceThunk =>
  async (dispatch) => {
    dispatch(updateStart());
    try {
      const place = (await PlaceService.updatePlace(id, placeData)) ?? {
        id: '',
        name: '',
        createdAt: '',
        updatedAt: '',
      };
      dispatch(updateSuccess(place));
    } catch (error) {
      dispatch(updateFailed(parseError(error)));
    }
  };

export const deletePlaceThunk =
  (id: string): PlaceThunk =>
  async (dispatch) => {
    dispatch(deleteStart());
    try {
      await PlaceService.deletePlace(id);
      dispatch(deleteSuccess(id));
    } catch (error) {
      dispatch(deleteFailed(parseError(error)));
    }
  };

export const restorePlaceThunk =
  (id: string): PlaceThunk =>
  async (dispatch) => {
    dispatch(restoreStart());
    try {
      const place = (await PlaceService.restorePlace(id)) ?? {
        id: '',
        name: '',
        createdAt: '',
        updatedAt: '',
      };
      dispatch(restoreSuccess(place));
    } catch (error) {
      dispatch(restoreFailed(parseError(error)));
    }
  };
