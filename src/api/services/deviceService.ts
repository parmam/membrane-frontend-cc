import { apiClient as client } from '../client';
import { components, operations } from '../types';

export const DeviceService = {
  async getDevices(params?: operations['DeviceController_index']['parameters']['query']) {
    const response = await client.GET('/device', { params: { query: params } });
    return response.data;
  },

  async getDeviceById(id: string) {
    const response = await client.GET('/device/{id}', { params: { path: { id } } });
    return response.data;
  },

  async createDevice(deviceData: components['schemas']['StoreDeviceRequest']) {
    const response = await client.POST('/device', { body: deviceData });
    return response.data;
  },

  async updateDevice(id: string, deviceData: components['schemas']['UpdateDeviceRequest']) {
    const response = await client.PUT('/device/{id}', {
      params: { path: { id } },
      body: deviceData,
    });
    return response.data;
  },

  async deleteDevice(id: string) {
    const response = await client.DELETE('/device/{id}', { params: { path: { id } } });
    return response.data;
  },

  async restoreDevice(id: string) {
    const response = await client.PUT('/device/{id}/restore', { params: { path: { id } } });
    return response.data;
  },
};
