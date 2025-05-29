// src/services/devicevendor/DeviceVendor.types.ts

export interface DeviceVendorDto {
  id: string; // Or number
  name: string;
  // Add other relevant fields from the API response (e.g., createdAt, updatedAt)
  createdAt?: string;
  updatedAt?: string;
}

// For paginated responses (e.g., GET /device-vendor)
export interface PaginatedDeviceVendorsResponseDto {
  data: DeviceVendorDto[];
  total: number;
  limit: number;
  offset: number;
}

// From Swagger: #/components/schemas/StoreDeviceVendorRequest
export interface StoreDeviceVendorRequestDto {
  name: string;
}

// From Swagger: #/components/schemas/UpdateDeviceVendorRequest
export interface UpdateDeviceVendorRequestDto {
  name?: string; // Name might be optional if only other fields could be updated
}

// Query parameters for GET /device-vendor (from Swagger)
export interface GetDeviceVendorsQueryParams {
  limit?: number;
  offset?: number;
  withTrashed?: 0 | 1;
  orderBy?: string;
  sort?: 'ASC' | 'DESC';
  id?: string;
  name?: string;
}
