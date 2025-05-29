// src/services/devicefirmware/DeviceFirmware.types.ts

// From Swagger: #/components/schemas/DeviceFirmwareMetaDTO
export interface DeviceFirmwareMetaDto {
  [key: string]: any; // Example: rtspStreamUrl, etc.
}

// Represents the DeviceFirmware data
export interface DeviceFirmwareDto {
  id: string; // Or number
  name: string;
  deviceModel: string; // ID of the DeviceModel
  driver: string;      // ID of the Driver
  meta: DeviceFirmwareMetaDto;
  // Potentially populated names for display
  deviceModelName?: string;
  driverName?: string;
  createdAt?: string;
  updatedAt?: string;
}

// For paginated responses
export interface PaginatedDeviceFirmwaresResponseDto {
  data: DeviceFirmwareDto[];
  total: number;
  limit: number;
  offset: number;
}

// From Swagger: #/components/schemas/StoreDeviceFirmwareRequest
export interface StoreDeviceFirmwareRequestDto {
  name: string;
  deviceModel: string; // DeviceModel ID
  driver: string;      // Driver ID
  meta: DeviceFirmwareMetaDto;
}

// From Swagger: #/components/schemas/UpdateDeviceFirmwareRequest
export interface UpdateDeviceFirmwareRequestDto {
  name?: string;
  deviceModel?: string; // DeviceModel ID
  driver?: string;      // Driver ID
  meta?: DeviceFirmwareMetaDto;
}

// Query parameters for GET /device-firmware (from Swagger)
export interface GetDeviceFirmwaresQueryParams {
  limit?: number;
  offset?: number;
  withTrashed?: 0 | 1;
  orderBy?: string;
  sort?: 'ASC' | 'DESC';
  id?: string;
  name?: string;
  deviceModel?: string; // DeviceModel ID for filtering
  driver?: string;      // Driver ID for filtering
}
