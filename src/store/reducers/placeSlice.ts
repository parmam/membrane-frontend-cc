// src/store/reducers/placeSlice.ts
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  createPlaceThunk,
  deletePlaceThunk,
  getPlaceByIdThunk,
  getPlacesThunk,
  restorePlaceThunk,
  updatePlaceThunk,
} from '../actions/placeActions';
import type { PaginatedResponse, Place } from '../types/ApiTypes';
import type { PlaceLoadingState } from '../types/LoadingTypes';

// =======================
// STATE INTERFACE
// =======================

export interface PlaceState {
  // Data
  places: Place[];
  selectedPlace: Place | null;

  // Pagination
  total: number;
  currentPage: number;
  pageSize: number;

  // Loading states
  loading: PlaceLoadingState;

  // Error state
  error: string | null;
}

// =======================
// INITIAL STATE
// =======================

const initialLoadingState: PlaceLoadingState = {
  getPlacesThunk: false,
  getPlaceByIdThunk: false,
  createPlaceThunk: false,
  updatePlaceThunk: false,
  deletePlaceThunk: false,
  restorePlaceThunk: false,
};

const initialState: PlaceState = {
  places: [],
  selectedPlace: null,
  total: 0,
  currentPage: 1,
  pageSize: 10,
  loading: initialLoadingState,
  error: null,
};

// =======================
// SLICE
// =======================

const placeSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    clearSelectedPlace: (state) => {
      state.selectedPlace = null;
    },
    clearPlaceError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // GET ALL (paginated)
    builder
      .addCase(getPlacesThunk.pending, (state) => {
        state.loading.getPlacesThunk = true;
        state.error = null;
      })
      .addCase(
        getPlacesThunk.fulfilled,
        (state, action: PayloadAction<PaginatedResponse<Place>>) => {
          state.loading.getPlacesThunk = false;
          state.places = action.payload.data;
          state.total = action.payload.total;
          state.currentPage = action.payload.offset / action.payload.limit + 1;
          state.pageSize = action.payload.limit;
        },
      )
      .addCase(getPlacesThunk.rejected, (state, action) => {
        state.loading.getPlacesThunk = false;
        state.error = (action.payload as string) || 'Failed to fetch places.';
      });

    // GET BY ID
    builder
      .addCase(getPlaceByIdThunk.pending, (state) => {
        state.loading.getPlaceByIdThunk = true;
        state.error = null;
      })
      .addCase(getPlaceByIdThunk.fulfilled, (state, action: PayloadAction<Place>) => {
        state.loading.getPlaceByIdThunk = false;
        state.selectedPlace = action.payload;
      })
      .addCase(getPlaceByIdThunk.rejected, (state, action) => {
        state.loading.getPlaceByIdThunk = false;
        state.error = (action.payload as string) || 'Failed to fetch place.';
      });

    // CREATE
    builder
      .addCase(createPlaceThunk.pending, (state) => {
        state.loading.createPlaceThunk = true;
        state.error = null;
      })
      .addCase(createPlaceThunk.fulfilled, (state, action: PayloadAction<Place>) => {
        state.loading.createPlaceThunk = false;
        state.places.unshift(action.payload);
        state.total += 1;
      })
      .addCase(createPlaceThunk.rejected, (state, action) => {
        state.loading.createPlaceThunk = false;
        state.error = (action.payload as string) || 'Failed to create place.';
      });

    // UPDATE
    builder
      .addCase(updatePlaceThunk.pending, (state) => {
        state.loading.updatePlaceThunk = true;
        state.error = null;
      })
      .addCase(updatePlaceThunk.fulfilled, (state, action: PayloadAction<Place>) => {
        state.loading.updatePlaceThunk = false;
        const index = state.places.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.places[index] = action.payload;
        }
        if (state.selectedPlace?.id === action.payload.id) {
          state.selectedPlace = action.payload;
        }
      })
      .addCase(updatePlaceThunk.rejected, (state, action) => {
        state.loading.updatePlaceThunk = false;
        state.error = (action.payload as string) || 'Failed to update place.';
      });

    // DELETE
    builder
      .addCase(deletePlaceThunk.pending, (state) => {
        state.loading.deletePlaceThunk = true;
        state.error = null;
      })
      .addCase(deletePlaceThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading.deletePlaceThunk = false;
        state.places = state.places.filter((p) => p.id !== action.payload);
        state.total -= 1;
      })
      .addCase(deletePlaceThunk.rejected, (state, action) => {
        state.loading.deletePlaceThunk = false;
        state.error = (action.payload as string) || 'Failed to delete place.';
      });

    // RESTORE
    builder
      .addCase(restorePlaceThunk.pending, (state) => {
        state.loading.restorePlaceThunk = true;
        state.error = null;
      })
      .addCase(restorePlaceThunk.fulfilled, (state, action: PayloadAction<Place>) => {
        state.loading.restorePlaceThunk = false;
        const index = state.places.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.places[index] = action.payload;
        } else {
          state.places.unshift(action.payload);
          state.total += 1;
        }
      })
      .addCase(restorePlaceThunk.rejected, (state, action) => {
        state.loading.restorePlaceThunk = false;
        state.error = (action.payload as string) || 'Failed to restore place.';
      });
  },
});

// =======================
// EXPORTS
// =======================

// Actions
export const { clearSelectedPlace, clearPlaceError } = placeSlice.actions;

// Selectors
export const selectPlaces = (state: { places: PlaceState }) => state.places.places;
export const selectSelectedPlace = (state: { places: PlaceState }) => state.places.selectedPlace;
export const selectPlaceLoading = (state: { places: PlaceState }) => state.places.loading;
export const selectPlaceError = (state: { places: PlaceState }) => state.places.error;
export const selectPlacePagination = (state: { places: PlaceState }) => ({
  total: state.places.total,
  currentPage: state.places.currentPage,
  pageSize: state.places.pageSize,
});

// Reducer
export default placeSlice.reducer;
