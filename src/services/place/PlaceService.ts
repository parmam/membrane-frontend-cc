// src/services/place/PlaceService.ts
import apiClient from '../apiClient';
import {
  GetPlacesQueryParams,
  PaginatedPlacesResponseDto,
  PlaceDto,
  StorePlaceRequestDto,
  UpdatePlaceRequestDto,
} from './Place.types';

const PLACE_BASE_URL = '/place'; // From Swagger

export const PlaceService = {
  listPlaces: async (params?: GetPlacesQueryParams): Promise<PaginatedPlacesResponseDto> => {
    const response = await apiClient.get<PaginatedPlacesResponseDto>(PLACE_BASE_URL, { params });
    return response.data;
  },

  createPlace: async (placeData: StorePlaceRequestDto): Promise<PlaceDto> => {
    const response = await apiClient.post<PlaceDto>(PLACE_BASE_URL, placeData);
    return response.data;
  },

  findPlaceById: async (id: string): Promise<PlaceDto> => {
    const response = await apiClient.get<PlaceDto>(`${PLACE_BASE_URL}/${id}`);
    return response.data;
  },

  updatePlace: async (id: string, updateData: UpdatePlaceRequestDto): Promise<PlaceDto> => {
    const response = await apiClient.put<PlaceDto>(`${PLACE_BASE_URL}/${id}`, updateData);
    return response.data;
  },

  deletePlace: async (id: string): Promise<void> => {
    await apiClient.delete(`${PLACE_BASE_URL}/${id}`);
  },

  restorePlace: async (id: string): Promise<PlaceDto> => {
    const response = await apiClient.put<PlaceDto>(`${PLACE_BASE_URL}/${id}/restore`);
    return response.data;
  },
};
