// src/api/services/placeService.ts
import { apiClient as client } from '../client';
import { components, operations } from '../types';

export const PlaceService = {
  async getPlaces(params?: operations['PlaceController_index']['parameters']['query']) {
    const response = await client.GET('/place', { params: { query: params } });
    return response.data;
  },

  async getPlaceById(id: string) {
    const response = await client.GET('/place/{id}', { params: { path: { id } } });
    return response.data;
  },

  async createPlace(placeData: components['schemas']['StorePlaceRequest']) {
    const response = await client.POST('/place', { body: placeData });
    return response.data;
  },

  async updatePlace(id: string, placeData: components['schemas']['UpdatePlaceRequest']) {
    const response = await client.PUT('/place/{id}', {
      params: { path: { id } },
      body: placeData,
    });
    return response.data;
  },

  async deletePlace(id: string) {
    const response = await client.DELETE('/place/{id}', { params: { path: { id } } });
    return response.data;
  },

  async restorePlace(id: string) {
    const response = await client.PUT('/place/{id}/restore', { params: { path: { id } } });
    return response.data;
  },
};
