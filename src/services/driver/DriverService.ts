// src/services/driver/DriverService.ts
import apiClient from '../apiClient';
import { GetDriversQueryParams, ListDriversResponseDto } from './Driver.types';

const DRIVER_BASE_URL = '/driver';

export const DriverService = {
  listDrivers: async (params?: GetDriversQueryParams): Promise<ListDriversResponseDto> => {
    const response = await apiClient.get<ListDriversResponseDto>(DRIVER_BASE_URL, { params });
    return response.data;
  },
};
