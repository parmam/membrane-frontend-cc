// src/services/devicevendor/DeviceVendorService.ts
import apiClient from '../apiClient';
import {
  DeviceVendorDto,
  GetDeviceVendorsQueryParams,
  PaginatedDeviceVendorsResponseDto,
  StoreDeviceVendorRequestDto,
  UpdateDeviceVendorRequestDto,
} from './DeviceVendor.types';

const VENDOR_BASE_URL = '/device-vendor'; // From Swagger

export const DeviceVendorService = {
  listDeviceVendors: async (
    params?: GetDeviceVendorsQueryParams,
  ): Promise<PaginatedDeviceVendorsResponseDto> => {
    const response = await apiClient.get<PaginatedDeviceVendorsResponseDto>(VENDOR_BASE_URL, {
      params,
    });
    return response.data;
  },

  createDeviceVendor: async (vendorData: StoreDeviceVendorRequestDto): Promise<DeviceVendorDto> => {
    const response = await apiClient.post<DeviceVendorDto>(VENDOR_BASE_URL, vendorData);
    return response.data;
  },

  findDeviceVendorById: async (id: string): Promise<DeviceVendorDto> => {
    const response = await apiClient.get<DeviceVendorDto>(`${VENDOR_BASE_URL}/${id}`);
    return response.data;
  },

  updateDeviceVendor: async (
    id: string,
    updateData: UpdateDeviceVendorRequestDto,
  ): Promise<DeviceVendorDto> => {
    const response = await apiClient.put<DeviceVendorDto>(`${VENDOR_BASE_URL}/${id}`, updateData);
    return response.data;
  },

  deleteDeviceVendor: async (id: string): Promise<void> => {
    await apiClient.delete(`${VENDOR_BASE_URL}/${id}`);
  },

  restoreDeviceVendor: async (id: string): Promise<DeviceVendorDto> => {
    const response = await apiClient.put<DeviceVendorDto>(`${VENDOR_BASE_URL}/${id}/restore`);
    return response.data;
  },
};
