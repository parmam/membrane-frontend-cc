// src/store/actions/placeActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';

import { PlaceService } from '../../api/services';
import type {
  CreatePlaceRequest,
  PaginatedResponse,
  Place,
  PlaceQueryParams,
  ThunkApiConfig,
  UpdatePlaceRequest,
} from '../types/ApiTypes';
import { parseError } from '../types/ErrorTypes';

// =======================
// GET PLACES (PAGINATED)
// =======================

export const getPlacesThunk = createAsyncThunk<
  PaginatedResponse<Place>,
  PlaceQueryParams | undefined,
  ThunkApiConfig
>('places/getPlacesThunk', async (params, { rejectWithValue }) => {
  try {
    const response = await PlaceService.getPlaces(params);
    return response as unknown as PaginatedResponse<Place>;
  } catch (error) {
    return rejectWithValue(parseError(error));
  }
});

// =======================
// GET PLACE BY ID
// =======================

export const getPlaceByIdThunk = createAsyncThunk<Place, string, ThunkApiConfig>(
  'places/getPlaceByIdThunk',
  async (id, { rejectWithValue }) => {
    try {
      const response = await PlaceService.getPlaceById(id);
      return response as unknown as Place;
    } catch (error) {
      return rejectWithValue(parseError(error));
    }
  },
);

// =======================
// CREATE PLACE
// =======================

export const createPlaceThunk = createAsyncThunk<Place, CreatePlaceRequest, ThunkApiConfig>(
  'places/createPlaceThunk',
  async (placeData, { rejectWithValue }) => {
    try {
      const response = await PlaceService.createPlace(placeData);
      return response as unknown as Place;
    } catch (error) {
      return rejectWithValue(parseError(error));
    }
  },
);

// =======================
// UPDATE PLACE
// =======================

export const updatePlaceThunk = createAsyncThunk<
  Place,
  { id: string; placeData: UpdatePlaceRequest },
  ThunkApiConfig
>('places/updatePlaceThunk', async ({ id, placeData }, { rejectWithValue }) => {
  try {
    const response = await PlaceService.updatePlace(id, placeData);
    return response as unknown as Place;
  } catch (error) {
    return rejectWithValue(parseError(error));
  }
});

// =======================
// DELETE PLACE
// =======================

export const deletePlaceThunk = createAsyncThunk<string, string, ThunkApiConfig>(
  'places/deletePlaceThunk',
  async (id, { rejectWithValue }) => {
    try {
      await PlaceService.deletePlace(id);
      return id;
    } catch (error) {
      return rejectWithValue(parseError(error));
    }
  },
);

// =======================
// RESTORE PLACE
// =======================

export const restorePlaceThunk = createAsyncThunk<Place, string, ThunkApiConfig>(
  'places/restorePlaceThunk',
  async (id, { rejectWithValue }) => {
    try {
      const response = await PlaceService.restorePlace(id);
      return response as unknown as Place;
    } catch (error) {
      return rejectWithValue(parseError(error));
    }
  },
);
