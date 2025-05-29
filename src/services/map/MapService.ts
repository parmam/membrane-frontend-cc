// src/services/map/MapService.ts
import apiClient from '../apiClient';
import {
  PaginatedMapsResponseDto,
  MapDetailsDto,
  StoreMapRequestData, // Using the renamed type
  AddDeviceToMapRequestDto,
  AddDeviceToMapResponseDto,
  GetMapsQueryParams,
  DeviceOnMapDto
} from './Map.types';

const MAP_BASE_URL = '/map'; // From Swagger

export const MapService = {
  /**
   * List maps with pagination and filtering.
   * Corresponds to: GET /map
   */
  listMaps: async (params?: GetMapsQueryParams): Promise<PaginatedMapsResponseDto> => {
    const response = await apiClient.get<PaginatedMapsResponseDto>(MAP_BASE_URL, { params });
    return response.data;
  },

  /**
   * Create a new map.
   * Corresponds to: POST /map
   * Handles multipart/form-data for file upload.
   */
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

  /**
   * Find a map by its ID.
   * Corresponds to: GET /map/{id}
   */
  findMapById: async (id: string): Promise<MapDetailsDto> => {
    const response = await apiClient.get<MapDetailsDto>(`${MAP_BASE_URL}/${id}`);
    return response.data;
  },

  /**
   * Delete a map.
   * Corresponds to: DELETE /map/{id}
   */
  deleteMap: async (id: string): Promise<void> => {
    // Swagger indicates 204 No Content response
    await apiClient.delete(`${MAP_BASE_URL}/${id}`);
  },

  /**
   * Restore a soft-deleted map.
   * Corresponds to: PUT /map/{id}/restore
   */
  restoreMap: async (id: string): Promise<MapDetailsDto> => {
    // Assuming API returns the restored map details
    const response = await apiClient.put<MapDetailsDto>(`${MAP_BASE_URL}/${id}/restore`);
    return response.data;
  },

  /**
   * Add a device to a map.
   * Corresponds to: POST /map/{id}/addDeviceToMap
   */
  addDeviceToMap: async (mapId: string, deviceData: AddDeviceToMapRequestDto): Promise<AddDeviceToMapResponseDto> => {
    const response = await apiClient.post<AddDeviceToMapResponseDto>(`${MAP_BASE_URL}/${mapId}/addDeviceToMap`, deviceData);
    return response.data;
  },

  /**
   * Remove a device from a map.
   * Corresponds to: DELETE /map/{mapId}/removeDeviceFromMap/{deviceMapId}
   */
  removeDeviceFromMap: async (mapId: string, deviceMapId: string): Promise<void> => {
    // Swagger indicates 204 No Content response
    await apiClient.delete(`${MAP_BASE_URL}/${mapId}/removeDeviceFromMap/${deviceMapId}`);
  },
};
