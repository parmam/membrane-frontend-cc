// src/services/devicefirmware/DeviceFirmwareService.ts
import apiClient from '../apiClient';
import {
  DeviceFirmwareDto,
  PaginatedDeviceFirmwaresResponseDto,
  StoreDeviceFirmwareRequestDto,
  UpdateDeviceFirmwareRequestDto,
  GetDeviceFirmwaresQueryParams
} from './DeviceFirmware.types';

const FIRMWARE_BASE_URL = '/device-firmware'; // From Swagger

export const DeviceFirmwareService = {
  /**
   * List device firmwares.
   */
  listDeviceFirmwares: async (params?: GetDeviceFirmwaresQueryParams): Promise<PaginatedDeviceFirmwaresResponseDto> => {
    const response = await apiClient.get<PaginatedDeviceFirmwaresResponseDto>(FIRMWARE_BASE_URL, { params });
    return response.data;
  },

  /**
   * Create a new device firmware.
   */
  createDeviceFirmware: async (firmwareData: StoreDeviceFirmwareRequestDto): Promise<DeviceFirmwareDto> => {
    const response = await apiClient.post<DeviceFirmwareDto>(FIRMWARE_BASE_URL, firmwareData);
    return response.data;
  },

  /**
   * Find a device firmware by ID.
   */
  findDeviceFirmwareById: async (id: string): Promise<DeviceFirmwareDto> => {
    const response = await apiClient.get<DeviceFirmwareDto>(`${FIRMWARE_BASE_URL}/${id}`);
    return response.data;
  },

  /**
   * Update an existing device firmware.
   */
  updateDeviceFirmware: async (id: string, updateData: UpdateDeviceFirmwareRequestDto): Promise<DeviceFirmwareDto> => {
    const response = await apiClient.put<DeviceFirmwareDto>(`${FIRMWARE_BASE_URL}/${id}`, updateData);
    return response.data;
  },

  /**
   * Delete a device firmware.
   */
  deleteDeviceFirmware: async (id: string): Promise<void> => {
    await apiClient.delete(`${FIRMWARE_BASE_URL}/${id}`);
  },

  /**
   * Restore a soft-deleted device firmware.
   */
  restoreDeviceFirmware: async (id: string): Promise<DeviceFirmwareDto> => {
    const response = await apiClient.put<DeviceFirmwareDto>(`${FIRMWARE_BASE_URL}/${id}/restore`);
    return response.data;
  },
};
