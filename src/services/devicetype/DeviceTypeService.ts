// src/services/devicetype/DeviceTypeService.ts
import apiClient from '../apiClient';
import { GetDeviceTypesQueryParams, ListDeviceTypesResponseDto } from './DeviceType.types';

const DEVICE_TYPE_BASE_URL = '/device-type'; // From Swagger

export const DeviceTypeService = {
  listDeviceTypes: async (
    params?: GetDeviceTypesQueryParams,
  ): Promise<ListDeviceTypesResponseDto> => {
    const response = await apiClient.get<ListDeviceTypesResponseDto>(DEVICE_TYPE_BASE_URL, {
      params,
    });
    return response.data;
  },
};
