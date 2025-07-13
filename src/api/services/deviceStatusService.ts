// src/api/services/deviceStatusService.ts
import { apiClient as client } from '../client';
import { operations } from '../types';

export const DeviceStatusService = {
  async getDeviceStatuses(
    params?: operations['DeviceStatusController_index']['parameters']['query'],
  ) {
    const response = await client.GET('/device-status', { params: { query: params } });
    return response.data;
  },
};
