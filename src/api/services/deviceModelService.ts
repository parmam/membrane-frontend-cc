import { apiClient as client } from '../client';
import { components, operations } from '../types';

export const DeviceModelService = {
  async getDeviceModels(params?: operations['DeviceModelController_index']['parameters']['query']) {
    const response = await client.GET('/device-model', { params: { query: params } });
    return response.data;
  },

  async getDeviceModelById(id: string) {
    const response = await client.GET('/device-model/{id}', { params: { path: { id } } });
    return response.data;
  },

  async createDeviceModel(deviceModelData: components['schemas']['StoreDeviceModelRequest']) {
    const response = await client.POST('/device-model', { body: deviceModelData });
    return response.data;
  },

  async updateDeviceModel(
    id: string,
    deviceModelData: components['schemas']['UpdateDeviceModelRequest'],
  ) {
    const response = await client.PUT('/device-model/{id}', {
      params: { path: { id } },
      body: deviceModelData,
    });
    return response.data;
  },

  async deleteDeviceModel(id: string) {
    const response = await client.DELETE('/device-model/{id}', { params: { path: { id } } });
    return response.data;
  },

  async restoreDeviceModel(id: string) {
    const response = await client.PUT('/device-model/{id}/restore', { params: { path: { id } } });
    return response.data;
  },
};
