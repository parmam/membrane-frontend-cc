// src/services/map/MapService.ts
import apiClient from '../apiClient';
import {
  AddDeviceToMapRequestDto,
  AddDeviceToMapResponseDto,
  GetMapsQueryParams,
  MapDetailsDto,
  PaginatedMapsResponseDto,
  StoreMapRequestData,
} from './Map.types';

const MAP_BASE_URL = '/map'; // From Swagger

export const MapService = {
  listMaps: async (params?: GetMapsQueryParams): Promise<PaginatedMapsResponseDto> => {
    const response = await apiClient.get<PaginatedMapsResponseDto>(MAP_BASE_URL, { params });
    return response.data;
  },

  createMap: async (mapData: StoreMapRequestData, file: File): Promise<MapDetailsDto> => {
    const formData = new FormData();
    formData.append('place', mapData.place);
    formData.append('name', mapData.name);
    formData.append('file', file);

    const response = await apiClient.post<MapDetailsDto>(MAP_BASE_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  findMapById: async (id: string): Promise<MapDetailsDto> => {
    const response = await apiClient.get<MapDetailsDto>(`${MAP_BASE_URL}/${id}`);
    return response.data;
  },

  deleteMap: async (id: string): Promise<void> => {
    await apiClient.delete(`${MAP_BASE_URL}/${id}`);
  },

  restoreMap: async (id: string): Promise<MapDetailsDto> => {
    const response = await apiClient.put<MapDetailsDto>(`${MAP_BASE_URL}/${id}/restore`);
    return response.data;
  },

  addDeviceToMap: async (
    mapId: string,
    deviceData: AddDeviceToMapRequestDto,
  ): Promise<AddDeviceToMapResponseDto> => {
    const response = await apiClient.post<AddDeviceToMapResponseDto>(
      `${MAP_BASE_URL}/${mapId}/addDeviceToMap`,
      deviceData,
    );
    return response.data;
  },

  removeDeviceFromMap: async (mapId: string, deviceMapId: string): Promise<void> => {
    await apiClient.delete(`${MAP_BASE_URL}/${mapId}/removeDeviceFromMap/${deviceMapId}`);
  },
};
