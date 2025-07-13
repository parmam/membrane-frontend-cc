// src/api/services/deviceVendorService.ts
import { apiClient as client } from '../client';
import { components, operations } from '../types';

export const DeviceVendorService = {
  async getDeviceVendors(
    params?: operations['DeviceVendorController_index']['parameters']['query'],
  ) {
    const response = await client.GET('/device-vendor', { params: { query: params } });
    return response.data;
  },

  async getDeviceVendorById(id: string) {
    const response = await client.GET('/device-vendor/{id}', { params: { path: { id } } });
    return response.data;
  },

  async createDeviceVendor(deviceVendorData: components['schemas']['StoreDeviceVendorRequest']) {
    const response = await client.POST('/device-vendor', { body: deviceVendorData });
    return response.data;
  },

  async updateDeviceVendor(
    id: string,
    deviceVendorData: components['schemas']['UpdateDeviceVendorRequest'],
  ) {
    const response = await client.PUT('/device-vendor/{id}', {
      params: { path: { id } },
      body: deviceVendorData,
    });
    return response.data;
  },

  async deleteDeviceVendor(id: string) {
    const response = await client.DELETE('/device-vendor/{id}', { params: { path: { id } } });
    return response.data;
  },

  async restoreDeviceVendor(id: string) {
    const response = await client.PUT('/device-vendor/{id}/restore', {
      params: { path: { id } },
    });
    return response.data;
  },
};
