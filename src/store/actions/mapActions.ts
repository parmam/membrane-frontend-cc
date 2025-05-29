// src/store/actions/mapActions.ts
import {
  // File needs to be handled separately for createMap
  AddDeviceToMapRequestDto,
  DeviceOnMapDto,
  // Assuming this is the response type for addDeviceToMap
  GetMapsQueryParams,
  MapDetailsDto,
  PaginatedMapsResponseDto,
  StoreMapRequestData, // Data part for createMap
} from '@/services/map/Map.types';
import { MapService } from '@/services/map/MapService';
import {
  DeviceOnMapModel,
  MapListModel,
  MapModel,
  convertDeviceOnMapDtoToModel,
  // Assuming this exists if AddDeviceToMapResponseDto is DeviceOnMapDto
  convertMapDetailsDtoToModel,
  convertMapListItemDtoToModel,
} from '@/services/map/convertToMap';

import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  addDeviceToMapSuccess,
  createMapSuccess,
  deleteMapSuccess,
  getMapSuccess,
  listMapsSuccess,
  mapRequestFailure,
  mapRequestStart,
  removeDeviceFromMapSuccess,
  updateMapSuccess, // We'll need an updateMap service method if it exists, or use getMapSuccess after update
} from '../reducers/mapSlice';

export const fetchMaps = createAsyncThunk(
  'maps/fetchMaps',
  async (params: GetMapsQueryParams = {}, { dispatch }) => {
    dispatch(mapRequestStart());
    try {
      const response: PaginatedMapsResponseDto = await MapService.listMaps(params);
      const mapModels: MapListModel[] = response.data.map(convertMapListItemDtoToModel);
      dispatch(
        listMapsSuccess({
          maps: mapModels,
          total: response.total,
          page: (params.offset || 0) / (params.limit || 10) + 1,
          pageSize: params.limit || 10,
        }),
      );
      return { maps: mapModels, total: response.total };
    } catch (error: unknown) {
      let errorMessage = 'Failed to fetch maps';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(mapRequestFailure(errorMessage));
      throw error;
    }
  },
);

export const fetchMapById = createAsyncThunk(
  'maps/fetchMapById',
  async (mapId: string, { dispatch }) => {
    dispatch(mapRequestStart());
    try {
      const mapDto: MapDetailsDto = await MapService.findMapById(mapId);
      const mapModel: MapModel = convertMapDetailsDtoToModel(mapDto);
      dispatch(getMapSuccess(mapModel));
      return mapModel;
    } catch (error: unknown) {
      let errorMessage = 'Failed to fetch map details';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(mapRequestFailure(errorMessage));
      throw error;
    }
  },
);

// Note: Map creation involves FormData, which is handled in the service.
// The thunk will receive the data part and the File object.
export const createMap = createAsyncThunk(
  'maps/createMap',
  async ({ mapData, file }: { mapData: StoreMapRequestData; file: File }, { dispatch }) => {
    dispatch(mapRequestStart());
    try {
      const createdMapDto: MapDetailsDto = await MapService.createMap(mapData, file);
      const createdMapModel: MapModel = convertMapDetailsDtoToModel(createdMapDto);
      dispatch(createMapSuccess(createdMapModel));
      return createdMapModel;
    } catch (error: unknown) {
      let errorMessage = 'Failed to create map';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(mapRequestFailure(errorMessage));
      throw error;
    }
  },
);

// The Swagger doesn't explicitly list an "update map details" endpoint, only restore and add/remove devices.
// If an update endpoint for map properties (name, placeId) existed, it would be here.
// For now, restoreMap can serve as an example of an update-like operation.
export const restoreMap = createAsyncThunk(
  'maps/restoreMap',
  async (mapId: string, { dispatch }) => {
    dispatch(mapRequestStart());
    try {
      const restoredMapDto: MapDetailsDto = await MapService.restoreMap(mapId);
      const restoredMapModel: MapModel = convertMapDetailsDtoToModel(restoredMapDto);
      // Assuming restore brings it back to a state that can be considered an update
      dispatch(updateMapSuccess(restoredMapModel));
      return restoredMapModel;
    } catch (error: unknown) {
      let errorMessage = 'Failed to restore map';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(mapRequestFailure(errorMessage));
      throw error;
    }
  },
);

export const deleteMap = createAsyncThunk('maps/deleteMap', async (mapId: string, { dispatch }) => {
  dispatch(mapRequestStart());
  try {
    await MapService.deleteMap(mapId);
    dispatch(deleteMapSuccess(mapId));
    return mapId;
  } catch (error: unknown) {
    let errorMessage = 'Failed to delete map';
    if (typeof error === 'object' && error !== null && 'response' in error) {
      const axiosError = error as { response?: { data?: { message?: string } }; message?: string };
      errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    dispatch(mapRequestFailure(errorMessage));
    throw error;
  }
});

export const addDeviceToMap = createAsyncThunk(
  'maps/addDeviceToMap',
  async (
    { mapId, deviceData }: { mapId: string; deviceData: AddDeviceToMapRequestDto },
    { dispatch },
  ) => {
    dispatch(mapRequestStart());
    try {
      // Assuming AddDeviceToMapResponseDto is equivalent to DeviceOnMapDto
      const addedDeviceDto: DeviceOnMapDto = await MapService.addDeviceToMap(mapId, deviceData);
      const addedDeviceModel: DeviceOnMapModel = convertDeviceOnMapDtoToModel(addedDeviceDto);
      dispatch(addDeviceToMapSuccess({ mapId, deviceOnMap: addedDeviceModel }));
      return { mapId, deviceOnMap: addedDeviceModel };
    } catch (error: unknown) {
      let errorMessage = 'Failed to add device to map';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(mapRequestFailure(errorMessage));
      throw error;
    }
  },
);

export const removeDeviceFromMap = createAsyncThunk(
  'maps/removeDeviceFromMap',
  async ({ mapId, deviceMapId }: { mapId: string; deviceMapId: string }, { dispatch }) => {
    dispatch(mapRequestStart());
    try {
      await MapService.removeDeviceFromMap(mapId, deviceMapId);
      dispatch(removeDeviceFromMapSuccess({ mapId, deviceMapId }));
      return { mapId, deviceMapId };
    } catch (error: unknown) {
      let errorMessage = 'Failed to remove device from map';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(mapRequestFailure(errorMessage));
      throw error;
    }
  },
);
