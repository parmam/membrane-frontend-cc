// src/services/device/DeviceService.ts
import apiClient from '../apiClient';
import {
  DeviceDto,
  PaginatedDevicesResponseDto,
  StoreDeviceRequestDto,
  UpdateDeviceRequestDto,
  GetDevicesQueryParams
} from './Device.types';

const DEVICE_BASE_URL = '/device'; // From Swagger

export const DeviceService = {
  /**
   * List devices.
   */
  listDevices: async (params?: GetDevicesQueryParams): Promise<PaginatedDevicesResponseDto> => {
    const response = await apiClient.get<PaginatedDevicesResponseDto>(DEVICE_BASE_URL, { params });
    return response.data;
  },

  /**
   * Create a new device.
   */
  createDevice: async (deviceData: StoreDeviceRequestDto): Promise<DeviceDto> => {
    const response = await apiClient.post<DeviceDto>(DEVICE_BASE_URL, deviceData);
    return response.data;
  },

  /**
   * Find a device by ID.
   */
  findDeviceById: async (id: string): Promise<DeviceDto> => {
    const response = await apiClient.get<DeviceDto>(`${DEVICE_BASE_URL}/${id}`);
    return response.data;
  },

  /**
   * Update an existing device.
   */
  updateDevice: async (id: string, updateData: UpdateDeviceRequestDto): Promise<DeviceDto> => {
    const response = await apiClient.put<DeviceDto>(`${DEVICE_BASE_URL}/${id}`, updateData);
    return response.data;
  },

  /**
   * Delete a device.
   */
  deleteDevice: async (id: string): Promise<void> => {
    await apiClient.delete(`${DEVICE_BASE_URL}/${id}`);
  },

  /**
   * Restore a soft-deleted device.
   */
  restoreDevice: async (id: string): Promise<DeviceDto> => {
    const response = await apiClient.put<DeviceDto>(`${DEVICE_BASE_URL}/${id}/restore`);
    return response.data;
  },
};
