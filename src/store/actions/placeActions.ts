// src/store/actions/newPlaceActions.ts
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
    const message = error instanceof Error ? error.message : 'Failed to fetch places';
    return rejectWithValue(message);
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
      const message = error instanceof Error ? error.message : 'Failed to fetch place';
      return rejectWithValue(message);
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
      const message = error instanceof Error ? error.message : 'Failed to create place';
      return rejectWithValue(message);
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
    const message = error instanceof Error ? error.message : 'Failed to update place';
    return rejectWithValue(message);
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
      const message = error instanceof Error ? error.message : 'Failed to delete place';
      return rejectWithValue(message);
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
      const message = error instanceof Error ? error.message : 'Failed to restore place';
      return rejectWithValue(message);
    }
  },
);
