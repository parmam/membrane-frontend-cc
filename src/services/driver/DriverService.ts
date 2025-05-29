// src/services/driver/DriverService.ts
import apiClient from '../apiClient';
import {
  ListDriversResponseDto,
  GetDriversQueryParams
} from './Driver.types';

const DRIVER_BASE_URL = '/driver'; // From Swagger

export const DriverService = {
  /**
   * List drivers with pagination and filtering.
   * Corresponds to: GET /driver
   */
  listDrivers: async (params?: GetDriversQueryParams): Promise<ListDriversResponseDto> => {
    const response = await apiClient.get<ListDriversResponseDto>(DRIVER_BASE_URL, { params });
    return response.data;
  },
};
