// src/store/actions/placeActions.ts
import {
  GetPlacesQueryParams,
  PaginatedPlacesResponseDto,
  PlaceDto,
  StorePlaceRequestDto,
  UpdatePlaceRequestDto,
} from '@/services/place/Place.types';
import { PlaceService } from '@/services/place/PlaceService';
import { Place as PlaceModel, convertPlaceDtoToModel } from '@/services/place/convertToPlace';

import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  createPlaceSuccess,
  deletePlaceSuccess,
  getPlaceSuccess,
  listPlacesSuccess,
  placeRequestFailure,
  placeRequestStart,
  updatePlaceSuccess,
} from '../reducers/placeSlice';

export const fetchPlaces = createAsyncThunk(
  'places/fetchPlaces',
  async (params: GetPlacesQueryParams = {}, { dispatch }) => {
    dispatch(placeRequestStart());
    try {
      const response: PaginatedPlacesResponseDto = await PlaceService.listPlaces(params);
      const placeModels: PlaceModel[] = response.data.map(convertPlaceDtoToModel);
      dispatch(
        listPlacesSuccess({
          places: placeModels,
          total: response.total,
          page: (params.offset || 0) / (params.limit || 10) + 1,
          pageSize: params.limit || 10,
        }),
      );
      return { places: placeModels, total: response.total };
    } catch (error: unknown) {
      // Changed from any to unknown
      let errorMessage = 'Failed to fetch places';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(placeRequestFailure(errorMessage));
      throw error;
    }
  },
);

export const fetchPlaceById = createAsyncThunk(
  'places/fetchPlaceById',
  async (placeId: string, { dispatch }) => {
    dispatch(placeRequestStart());
    try {
      const placeDto: PlaceDto = await PlaceService.findPlaceById(placeId);
      const placeModel: PlaceModel = convertPlaceDtoToModel(placeDto);
      dispatch(getPlaceSuccess(placeModel));
      return placeModel;
    } catch (error: unknown) {
      // Changed from any to unknown
      let errorMessage = 'Failed to fetch place details';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(placeRequestFailure(errorMessage));
      throw error;
    }
  },
);

export const createPlace = createAsyncThunk(
  'places/createPlace',
  async (placeData: StorePlaceRequestDto, { dispatch }) => {
    dispatch(placeRequestStart());
    try {
      const createdPlaceDto: PlaceDto = await PlaceService.createPlace(placeData);
      const createdPlaceModel: PlaceModel = convertPlaceDtoToModel(createdPlaceDto);
      dispatch(createPlaceSuccess(createdPlaceModel));
      return createdPlaceModel;
    } catch (error: unknown) {
      // Changed from any to unknown
      let errorMessage = 'Failed to create place';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(placeRequestFailure(errorMessage));
      throw error;
    }
  },
);

export const updatePlace = createAsyncThunk(
  'places/updatePlace',
  async (
    { placeId, placeData }: { placeId: string; placeData: UpdatePlaceRequestDto },
    { dispatch },
  ) => {
    dispatch(placeRequestStart());
    try {
      const updatedPlaceDto: PlaceDto = await PlaceService.updatePlace(placeId, placeData);
      const updatedPlaceModel: PlaceModel = convertPlaceDtoToModel(updatedPlaceDto);
      dispatch(updatePlaceSuccess(updatedPlaceModel));
      return updatedPlaceModel;
    } catch (error: unknown) {
      // Changed from any to unknown
      let errorMessage = 'Failed to update place';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(placeRequestFailure(errorMessage));
      throw error;
    }
  },
);

export const deletePlace = createAsyncThunk(
  'places/deletePlace',
  async (placeId: string, { dispatch }) => {
    dispatch(placeRequestStart());
    try {
      await PlaceService.deletePlace(placeId);
      dispatch(deletePlaceSuccess(placeId));
      return placeId;
    } catch (error: unknown) {
      // Changed from any to unknown
      let errorMessage = 'Failed to delete place';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(placeRequestFailure(errorMessage));
      throw error;
    }
  },
);

export const restorePlace = createAsyncThunk(
  'places/restorePlace',
  async (placeId: string, { dispatch }) => {
    dispatch(placeRequestStart());
    try {
      const restoredPlaceDto: PlaceDto = await PlaceService.restorePlace(placeId);
      const restoredPlaceModel: PlaceModel = convertPlaceDtoToModel(restoredPlaceDto);
      dispatch(updatePlaceSuccess(restoredPlaceModel)); // Reuse update success for simplicity
      return restoredPlaceModel;
    } catch (error: unknown) {
      // Changed from any to unknown
      let errorMessage = 'Failed to restore place';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(placeRequestFailure(errorMessage));
      throw error;
    }
  },
);
