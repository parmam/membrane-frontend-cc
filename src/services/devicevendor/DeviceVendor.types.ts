// src/services/devicevendor/DeviceVendor.types.ts

export interface DeviceVendorDto {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginatedDeviceVendorsResponseDto {
  data: DeviceVendorDto[];
  total: number;
  limit: number;
  offset: number;
}

export interface StoreDeviceVendorRequestDto {
  name: string;
}

export interface UpdateDeviceVendorRequestDto {
  name?: string;
}

export interface GetDeviceVendorsQueryParams {
  limit?: number;
  offset?: number;
  withTrashed?: 0 | 1;
  orderBy?: string;
  sort?: 'ASC' | 'DESC';
  id?: string;
  name?: string;
}
