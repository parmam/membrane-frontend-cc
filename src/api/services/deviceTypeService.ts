// src/api/services/deviceTypeService.ts
import { apiClient as client } from '../client';
import { operations } from '../types';

export const DeviceTypeService = {
  async getDeviceTypes(params?: operations['DeviceTypeController_index']['parameters']['query']) {
    const response = await client.GET('/device-type', { params: { query: params } });
    return response.data;
  },
};
