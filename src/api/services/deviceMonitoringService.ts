// src/api/services/deviceMonitoringService.ts
import { apiClient as client } from '../client';
import { components, operations } from '../types';

export const DeviceMonitoringService = {
  async getDeviceMonitoring(
    params?: operations['DeviceMonitoringController_index']['parameters']['query'],
  ) {
    const response = await client.GET('/device-monitoring', { params: { query: params } });
    return response.data;
  },

  async getLastStatus(
    params: operations['DeviceMonitoringController_getLastStatus']['parameters']['query'],
  ) {
    const response = await client.GET('/device-monitoring/lastStatus', {
      params: { query: params },
    });
    return response.data;
  },

  async getLastStatusById(deviceData: components['schemas']['GetLastStatusByDeviceRequest']) {
    const response = await client.POST('/device-monitoring/lastStatusByDevice', {
      body: deviceData,
    });
    return response.data;
  },

  async getUptime(filters: components['schemas']['GetUptimeFilters']) {
    const response = await client.POST('/device-monitoring/uptime', { body: filters });
    return response.data;
  },
};
