import { apiClient as client } from '../client';
import { components, operations } from '../types';

export const MapService = {
  async getMaps(params?: operations['MapController_index']['parameters']['query']) {
    const response = await client.GET('/map', { params: { query: params } });
    return response.data;
  },

  async getMapById(id: string) {
    const response = await client.GET('/map/{id}', { params: { path: { id } } });
    return response.data;
  },

  async createMap(mapData: components['schemas']['StoreMapRequest']) {
    const response = await client.POST('/map', { body: mapData });
    return response.data;
  },

  async deleteMap(id: string) {
    const response = await client.DELETE('/map/{id}', { params: { path: { id } } });
    return response.data;
  },

  async restoreMap(id: string) {
    const response = await client.PUT('/map/{id}/restore', { params: { path: { id } } });
    return response.data;
  },

  async addDeviceToMap(id: string, deviceData: components['schemas']['AddDeviceToMapRequest']) {
    const response = await client.POST('/map/{id}/addDeviceToMap', {
      params: { path: { id } },
      body: deviceData,
    });
    return response.data;
  },

  async removeDeviceFromMap(mapId: string, deviceMapId: string) {
    const response = await client.DELETE('/map/{mapId}/removeDeviceFromMap/{deviceMapId}', {
      params: { path: { mapId, deviceMapId } },
    });
    return response.data;
  },
};
