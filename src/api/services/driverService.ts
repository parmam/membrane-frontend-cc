import { apiClient as client } from '../client';
import { operations } from '../types';

export const DriverService = {
  async getDrivers(params?: operations['DriverController_index']['parameters']['query']) {
    const response = await client.GET('/driver', { params: { query: params } });
    return response.data;
  },
};
