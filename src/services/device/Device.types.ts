// src/services/device/Device.types.ts

// From Swagger: #/components/schemas/DeviceMetaDTO
export interface DeviceMetaDto {
  // Example from Swagger: connectionData for RTSP, etc.
  // connectionData?: {
  //   username?: string;
  //   password?: string;
  //   ip_address?: string;
  //   port?: number;
  //   channel?: number;
  //   stream?: string | number; // "1" or 1
  //   [key: string]: any; // For other connection types
  // };
  [key: string]: any; // Keep it flexible as per DeviceMetaDTO: {}
}

export interface DeviceDto {
  id: string; // Or number
  integrationId?: string | null; // From GET /device params
  name: string;
  description?: string | null;
  critical: boolean;
  fco: boolean; // Out of operative control
  deviceType: string;    // ID
  deviceVendor: string;  // ID
  deviceModel: string;   // ID
  deviceFirmware: string;// ID
  group: string;         // ID
  place: string;         // ID
  monitoringInterval: number; // in seconds
  enableNotifications: boolean;
  meta: DeviceMetaDto;

  // Potentially populated names for display - these would come from the backend if it joins them
  deviceTypeName?: string;
  deviceVendorName?: string;
  deviceModelName?: string;
  deviceFirmwareVersion?: string; // Or 'name'
  groupName?: string;
  placeName?: string;
  status?: any; // If the API includes current device status

  createdAt?: string;
  updatedAt?: string;
}

// For paginated responses
export interface PaginatedDevicesResponseDto {
  data: DeviceDto[]; // Or a more summarized DeviceListItemDto
  total: number;
  limit: number;
  offset: number;
}

// From Swagger: #/components/schemas/StoreDeviceRequest
export interface StoreDeviceRequestDto {
  name: string;
  description?: string;
  critical: boolean;
  fco?: boolean; // Default false in Swagger, make optional
  deviceType: string;
  deviceVendor: string;
  deviceModel: string;
  deviceFirmware: string;
  group: string;
  place: string;
  monitoringInterval: number;
  enableNotifications: boolean;
  meta: DeviceMetaDto;
  integrationId?: string; // Not in StoreDeviceRequest in Swagger, but good to consider
}

// From Swagger: #/components/schemas/UpdateDeviceRequest
export interface UpdateDeviceRequestDto {
  name?: string;
  description?: string;
  critical?: boolean;
  fco?: boolean;
  deviceType?: string;
  deviceVendor?: string;
  deviceModel?: string;
  deviceFirmware?: string;
  group?: string;
  place?: string;
  monitoringInterval?: number;
  enableNotifications?: boolean;
  meta?: DeviceMetaDto;
  integrationId?: string; // Not in UpdateDeviceRequest in Swagger
}

// Query parameters for GET /device (from Swagger)
export interface GetDevicesQueryParams {
  limit?: number;
  offset?: number;
  withTrashed?: 0 | 1;
  orderBy?: string;
  sort?: 'ASC' | 'DESC';
  id?: string;
  integrationId?: string;
  name?: string;
  critical?: boolean;
  fco?: boolean;
  deviceType?: string;    // ID
  deviceVendor?: string;  // ID
  deviceModel?: string;   // ID
  group?: string;         // ID
  place?: string;         // ID
}
