// src/services/devicemodel/DeviceModel.types.ts

export interface DeviceModelMetaDto {
  [key: string]: unknown; // Changed 'any' to 'unknown'
  // channels?: number; // Example from Swagger
}

export interface DeviceModelDto {
  id: string;
  name: string;
  deviceVendor: string; // ID of the DeviceVendor (foreign key)
  deviceType: string; // ID of the DeviceType (foreign key)
  meta: DeviceModelMetaDto;
  deviceVendorName?: string; // Optional: for populated data from backend
  deviceTypeName?: string; // Optional: for populated data from backend
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginatedDeviceModelsResponseDto {
  data: DeviceModelDto[];
  total: number;
  limit: number;
  offset: number;
}

export interface StoreDeviceModelRequestDto {
  name: string;
  deviceVendor: string;
  deviceType: string;
  meta: DeviceModelMetaDto;
}

export interface UpdateDeviceModelRequestDto {
  name?: string;
  deviceVendor?: string;
  deviceType?: string;
  meta?: DeviceModelMetaDto;
}

export interface GetDeviceModelsQueryParams {
  limit?: number;
  offset?: number;
  withTrashed?: 0 | 1;
  orderBy?: string;
  sort?: 'ASC' | 'DESC';
  id?: string;
  name?: string;
  deviceVendor?: string;
  deviceType?: string;
}
