import { apiClient as client } from '../client';
import { components, operations } from '../types';

export const DeviceFirmwareService = {
  async getDeviceFirmwares(
    params?: operations['DeviceFirmwareController_index']['parameters']['query'],
  ) {
    const response = await client.GET('/device-firmware', { params: { query: params } });
    return response.data;
  },

  async getDeviceFirmwareById(id: string) {
    const response = await client.GET('/device-firmware/{id}', { params: { path: { id } } });
    return response.data;
  },

  async createDeviceFirmware(
    deviceFirmwareData: components['schemas']['StoreDeviceFirmwareRequest'],
  ) {
    const response = await client.POST('/device-firmware', { body: deviceFirmwareData });
    return response.data;
  },

  async updateDeviceFirmware(
    id: string,
    deviceFirmwareData: components['schemas']['UpdateDeviceFirmwareRequest'],
  ) {
    const response = await client.PUT('/device-firmware/{id}', {
      params: { path: { id } },
      body: deviceFirmwareData,
    });
    return response.data;
  },

  async deleteDeviceFirmware(id: string) {
    const response = await client.DELETE('/device-firmware/{id}', { params: { path: { id } } });
    return response.data;
  },

  async restoreDeviceFirmware(id: string) {
    const response = await client.PUT('/device-firmware/{id}/restore', {
      params: { path: { id } },
    });
    return response.data;
  },
};
