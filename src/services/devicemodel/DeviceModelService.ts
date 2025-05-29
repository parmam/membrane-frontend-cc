// src/services/devicemodel/DeviceModelService.ts
import apiClient from '../apiClient';
import {
  DeviceModelDto,
  PaginatedDeviceModelsResponseDto,
  StoreDeviceModelRequestDto,
  UpdateDeviceModelRequestDto,
  GetDeviceModelsQueryParams
} from './DeviceModel.types';

const MODEL_BASE_URL = '/device-model'; // From Swagger

export const DeviceModelService = {
  /**
   * List device models.
   */
  listDeviceModels: async (params?: GetDeviceModelsQueryParams): Promise<PaginatedDeviceModelsResponseDto> => {
    const response = await apiClient.get<PaginatedDeviceModelsResponseDto>(MODEL_BASE_URL, { params });
    return response.data;
  },

  /**
   * Create a new device model.
   */
  createDeviceModel: async (modelData: StoreDeviceModelRequestDto): Promise<DeviceModelDto> => {
    const response = await apiClient.post<DeviceModelDto>(MODEL_BASE_URL, modelData);
    return response.data;
  },

  /**
   * Find a device model by ID.
   */
  findDeviceModelById: async (id: string): Promise<DeviceModelDto> => {
    const response = await apiClient.get<DeviceModelDto>(`${MODEL_BASE_URL}/${id}`);
    return response.data;
  },

  /**
   * Update an existing device model.
   */
  updateDeviceModel: async (id: string, updateData: UpdateDeviceModelRequestDto): Promise<DeviceModelDto> => {
    const response = await apiClient.put<DeviceModelDto>(`${MODEL_BASE_URL}/${id}`, updateData);
    return response.data;
  },

  /**
   * Delete a device model.
   */
  deleteDeviceModel: async (id: string): Promise<void> => {
    await apiClient.delete(`${MODEL_BASE_URL}/${id}`);
  },

  /**
   * Restore a soft-deleted device model.
   */
  restoreDeviceModel: async (id: string): Promise<DeviceModelDto> => {
    const response = await apiClient.put<DeviceModelDto>(`${MODEL_BASE_URL}/${id}/restore`);
    return response.data;
  },
};
