// src/services/devicetype/DeviceTypeService.ts
import apiClient from '../apiClient';
import {
  ListDeviceTypesResponseDto,
  GetDeviceTypesQueryParams
} from './DeviceType.types';

const DEVICE_TYPE_BASE_URL = '/device-type'; // From Swagger

export const DeviceTypeService = {
  /**
   * List device types with pagination and filtering.
   * Corresponds to: GET /device-type
   */
  listDeviceTypes: async (params?: GetDeviceTypesQueryParams): Promise<ListDeviceTypesResponseDto> => {
    const response = await apiClient.get<ListDeviceTypesResponseDto>(DEVICE_TYPE_BASE_URL, { params });
    return response.data;
  },
};
