// src/services/devicemodel/DeviceModelService.ts
import apiClient from '../apiClient';
import {
  DeviceModelDto,
  GetDeviceModelsQueryParams,
  PaginatedDeviceModelsResponseDto,
  StoreDeviceModelRequestDto,
  UpdateDeviceModelRequestDto,
} from './DeviceModel.types';

const MODEL_BASE_URL = '/device-model'; // From Swagger

export const DeviceModelService = {
  listDeviceModels: async (
    params?: GetDeviceModelsQueryParams,
  ): Promise<PaginatedDeviceModelsResponseDto> => {
    const response = await apiClient.get<PaginatedDeviceModelsResponseDto>(MODEL_BASE_URL, {
      params,
    });
    return response.data;
  },

  createDeviceModel: async (modelData: StoreDeviceModelRequestDto): Promise<DeviceModelDto> => {
    const response = await apiClient.post<DeviceModelDto>(MODEL_BASE_URL, modelData);
    return response.data;
  },

  findDeviceModelById: async (id: string): Promise<DeviceModelDto> => {
    const response = await apiClient.get<DeviceModelDto>(`${MODEL_BASE_URL}/${id}`);
    return response.data;
  },

  updateDeviceModel: async (
    id: string,
    updateData: UpdateDeviceModelRequestDto,
  ): Promise<DeviceModelDto> => {
    const response = await apiClient.put<DeviceModelDto>(`${MODEL_BASE_URL}/${id}`, updateData);
    return response.data;
  },

  deleteDeviceModel: async (id: string): Promise<void> => {
    await apiClient.delete(`${MODEL_BASE_URL}/${id}`);
  },

  restoreDeviceModel: async (id: string): Promise<DeviceModelDto> => {
    const response = await apiClient.put<DeviceModelDto>(`${MODEL_BASE_URL}/${id}/restore`);
    return response.data;
  },
};
