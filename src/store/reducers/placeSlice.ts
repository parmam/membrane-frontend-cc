// src/store/reducers/placeSlice.ts
import { PlaceDto } from '@/services/place/Place.types';
import { Place as PlaceModel } from '@/services/place/convertToPlace';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface PlaceState {
  list: PlaceModel[];
  selectedPlace: PlaceModel | null;
  isLoading: boolean;
  error: string | null;
  totalPlaces: number;
  currentPage: number;
  pageSize: number;
}

const initialState: PlaceState = {
  list: [],
  selectedPlace: null,
  isLoading: false,
  error: null,
  totalPlaces: 0,
  currentPage: 1,
  pageSize: 10,
};

const placeSlice = createSlice({
  name: 'places', // Plural name for the slice
  initialState,
  reducers: {
    placeRequestStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    placeRequestFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    listPlacesSuccess: (
      state,
      action: PayloadAction<{
        places: PlaceModel[];
        total: number;
        page: number;
        pageSize: number;
      }>,
    ) => {
      state.isLoading = false;
      state.list = action.payload.places;
      state.totalPlaces = action.payload.total;
      state.currentPage = action.payload.page;
      state.pageSize = action.payload.pageSize;
      state.error = null;
    },
    getPlaceSuccess: (state, action: PayloadAction<PlaceModel>) => {
      state.isLoading = false;
      state.selectedPlace = action.payload;
      state.error = null;
    },
    createPlaceSuccess: (state, action: PayloadAction<PlaceModel>) => {
      state.isLoading = false;
      state.selectedPlace = action.payload; // Or add to list, then refetch/invalidate
      state.error = null;
    },
    updatePlaceSuccess: (state, action: PayloadAction<PlaceModel>) => {
      state.isLoading = false;
      state.selectedPlace = action.payload;
      state.list = state.list.map((place) =>
        place.id === action.payload.id ? { ...place, ...action.payload } : place,
      );
      state.error = null;
    },
    deletePlaceSuccess: (state, action: PayloadAction<string /* placeId */>) => {
      state.isLoading = false;
      state.list = state.list.filter((place) => place.id !== action.payload);
      if (state.selectedPlace?.id === action.payload) {
        state.selectedPlace = null;
      }
      state.error = null;
    },
  },
});

export const {
  placeRequestStart,
  placeRequestFailure,
  listPlacesSuccess,
  getPlaceSuccess,
  createPlaceSuccess,
  updatePlaceSuccess,
  deletePlaceSuccess,
} = placeSlice.actions;

export default placeSlice.reducer;
