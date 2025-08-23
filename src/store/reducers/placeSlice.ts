// src/store/reducers/placeSlice.ts
import { Reducer } from 'redux';

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
  PlaceState,
  PlaceStatus,
  initialPlaceState,
} from '../types/PlaceTypes';

export const placeReducer: Reducer<PlaceState, PlaceAction> = (
  state = initialPlaceState,
  action,
) => {
  switch (action.type) {
    case PLACE_GET_PLACES_START:
    case PLACE_GET_BY_ID_START:
      return { ...state, status: PlaceStatus.Fetching, error: null };
    case PLACE_CREATE_START:
      return { ...state, status: PlaceStatus.Creating, error: null };
    case PLACE_UPDATE_START:
      return { ...state, status: PlaceStatus.Updating, error: null };
    case PLACE_DELETE_START:
      return { ...state, status: PlaceStatus.Deleting, error: null };
    case PLACE_RESTORE_START:
      return { ...state, status: PlaceStatus.Restoring, error: null };

    case PLACE_GET_PLACES_SUCCESS:
      return {
        ...state,
        places: action.payload.response.data,
        total: action.payload.response.total,
        currentPage: action.payload.response.offset / action.payload.response.limit + 1,
        pageSize: action.payload.response.limit,
        status: PlaceStatus.Success,
      };
    case PLACE_GET_BY_ID_SUCCESS:
      return { ...state, selectedPlace: action.payload.place, status: PlaceStatus.Success };
    case PLACE_CREATE_SUCCESS:
      return {
        ...state,
        places: [action.payload.place, ...state.places],
        total: state.total + 1,
        status: PlaceStatus.Success,
      };
    case PLACE_UPDATE_SUCCESS: {
      const updatedPlaces = state.places.map((p) =>
        p.id === action.payload.place.id ? action.payload.place : p,
      );
      return {
        ...state,
        places: updatedPlaces,
        selectedPlace: action.payload.place,
        status: PlaceStatus.Success,
      };
    }
    case PLACE_DELETE_SUCCESS: {
      const filteredPlaces = state.places.filter((p) => p.id !== action.payload.id);
      return {
        ...state,
        places: filteredPlaces,
        total: state.total - 1,
        status: PlaceStatus.Success,
      };
    }
    case PLACE_RESTORE_SUCCESS:
      return {
        ...state,
        places: [action.payload.place, ...state.places],
        total: state.total + 1,
        status: PlaceStatus.Success,
      };

    case PLACE_GET_PLACES_FAILED:
    case PLACE_GET_BY_ID_FAILED:
    case PLACE_CREATE_FAILED:
    case PLACE_UPDATE_FAILED:
    case PLACE_DELETE_FAILED:
    case PLACE_RESTORE_FAILED:
      return { ...state, status: PlaceStatus.Failed, error: action.payload.error };

    case PLACE_CLEAR_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};

export default placeReducer;
