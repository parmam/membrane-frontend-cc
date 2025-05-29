// src/services/place/PlaceService.ts
import apiClient from '../apiClient';
import {
  PlaceDto,
  PaginatedPlacesResponseDto,
  StorePlaceRequestDto,
  UpdatePlaceRequestDto,
  GetPlacesQueryParams
} from './Place.types';

const PLACE_BASE_URL = '/place'; // From Swagger

export const PlaceService = {
  /**
   * List places.
   */
  listPlaces: async (params?: GetPlacesQueryParams): Promise<PaginatedPlacesResponseDto> => {
    const response = await apiClient.get<PaginatedPlacesResponseDto>(PLACE_BASE_URL, { params });
    return response.data;
  },

  /**
   * Create a new place.
   */
  createPlace: async (placeData: StorePlaceRequestDto): Promise<PlaceDto> => {
    const response = await apiClient.post<PlaceDto>(PLACE_BASE_URL, placeData);
    return response.data;
  },

  /**
   * Find a place by ID.
   */
  findPlaceById: async (id: string): Promise<PlaceDto> => {
    const response = await apiClient.get<PlaceDto>(`${PLACE_BASE_URL}/${id}`);
    return response.data;
  },

  /**
   * Update an existing place.
   */
  updatePlace: async (id: string, updateData: UpdatePlaceRequestDto): Promise<PlaceDto> => {
    const response = await apiClient.put<PlaceDto>(`${PLACE_BASE_URL}/${id}`, updateData);
    return response.data;
  },

  /**
   * Delete a place.
   */
  deletePlace: async (id: string): Promise<void> => {
    await apiClient.delete(`${PLACE_BASE_URL}/${id}`);
  },

  /**
   * Restore a soft-deleted place.
   */
  restorePlace: async (id: string): Promise<PlaceDto> => {
    const response = await apiClient.put<PlaceDto>(`${PLACE_BASE_URL}/${id}/restore`);
    return response.data;
  },
};
