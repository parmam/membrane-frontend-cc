// src/services/devicevendor/DeviceVendorService.ts
import apiClient from '../apiClient';
import {
  DeviceVendorDto,
  PaginatedDeviceVendorsResponseDto,
  StoreDeviceVendorRequestDto,
  UpdateDeviceVendorRequestDto,
  GetDeviceVendorsQueryParams
} from './DeviceVendor.types';

const VENDOR_BASE_URL = '/device-vendor'; // From Swagger

export const DeviceVendorService = {
  /**
   * List device vendors.
   */
  listDeviceVendors: async (params?: GetDeviceVendorsQueryParams): Promise<PaginatedDeviceVendorsResponseDto> => {
    const response = await apiClient.get<PaginatedDeviceVendorsResponseDto>(VENDOR_BASE_URL, { params });
    return response.data;
  },

  /**
   * Create a new device vendor.
   */
  createDeviceVendor: async (vendorData: StoreDeviceVendorRequestDto): Promise<DeviceVendorDto> => {
    const response = await apiClient.post<DeviceVendorDto>(VENDOR_BASE_URL, vendorData);
    return response.data;
  },

  /**
   * Find a device vendor by ID.
   */
  findDeviceVendorById: async (id: string): Promise<DeviceVendorDto> => {
    const response = await apiClient.get<DeviceVendorDto>(`${VENDOR_BASE_URL}/${id}`);
    return response.data;
  },

  /**
   * Update an existing device vendor.
   */
  updateDeviceVendor: async (id: string, updateData: UpdateDeviceVendorRequestDto): Promise<DeviceVendorDto> => {
    const response = await apiClient.put<DeviceVendorDto>(`${VENDOR_BASE_URL}/${id}`, updateData);
    return response.data;
  },

  /**
   * Delete a device vendor.
   */
  deleteDeviceVendor: async (id: string): Promise<void> => {
    await apiClient.delete(`${VENDOR_BASE_URL}/${id}`);
  },

  /**
   * Restore a soft-deleted device vendor.
   */
  restoreDeviceVendor: async (id: string): Promise<DeviceVendorDto> => {
    const response = await apiClient.put<DeviceVendorDto>(`${VENDOR_BASE_URL}/${id}/restore`);
    return response.data;
  },
};
