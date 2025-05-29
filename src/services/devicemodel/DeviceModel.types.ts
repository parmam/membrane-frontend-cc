// src/services/devicemodel/DeviceModel.types.ts

// From Swagger: #/components/schemas/DeviceModelMetaDTO
// An open object, so we can use a Record or a more specific interface if known.
export interface DeviceModelMetaDto {
  [key: string]: any; // Or define known properties like channels, etc.
  // Example: channels?: number;
}

// Represents the DeviceModel data
export interface DeviceModelDto {
  id: string; // Or number
  name: string;
  deviceVendor: string; // ID of the DeviceVendor
  deviceType: string;  // ID of the DeviceType
  meta: DeviceModelMetaDto;
  // Assuming these might be returned by the API
  deviceVendorName?: string; // Populated name for display
  deviceTypeName?: string;   // Populated name for display
  createdAt?: string;
  updatedAt?: string;
}

// For paginated responses (e.g., GET /device-model)
export interface PaginatedDeviceModelsResponseDto {
  data: DeviceModelDto[]; // Or a more summarized version for lists
  total: number;
  limit: number;
  offset: number;
}

// From Swagger: #/components/schemas/StoreDeviceModelRequest
export interface StoreDeviceModelRequestDto {
  name: string;
  deviceVendor: string; // DeviceVendor ID
  deviceType: string;   // DeviceType ID
  meta: DeviceModelMetaDto;
}

// From Swagger: #/components/schemas/UpdateDeviceModelRequest
export interface UpdateDeviceModelRequestDto {
  name?: string;
  deviceVendor?: string; // DeviceVendor ID
  deviceType?: string;   // DeviceType ID
  meta?: DeviceModelMetaDto;
}

// Query parameters for GET /device-model (from Swagger)
export interface GetDeviceModelsQueryParams {
  limit?: number;
  offset?: number;
  withTrashed?: 0 | 1;
  orderBy?: string;
  sort?: 'ASC' | 'DESC';
  id?: string;
  name?: string;
  deviceVendor?: string; // DeviceVendor ID for filtering
  deviceType?: string;   // DeviceType ID for filtering
}
