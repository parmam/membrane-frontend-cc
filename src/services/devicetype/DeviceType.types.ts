// src/services/devicetype/DeviceType.types.ts

export interface DeviceTypeDto {
  id: string; // Or number
  name: string; // e.g., "Camera", "DVR", "Sensor"
  // description?: string;
  // Add other relevant fields from the API response
}

// Response for GET /device-type is likely an array of DeviceTypeDto
export type ListDeviceTypesResponseDto = DeviceTypeDto[];

// Query parameters for GET /device-type (from Swagger)
export interface GetDeviceTypesQueryParams {
  limit?: number;
  offset?: number;
  withTrashed?: 0 | 1;
  orderBy?: string;
  sort?: 'ASC' | 'DESC';
  name?: string;
  // Note: Swagger for DeviceType has 'id' under parameters, but it's not typical for a list query.
  // It might be a typo or for a specific lookup not part of the index.
  // For now, I'll include it if it's in the general query params for the index endpoint.
  // id?: string;
}
