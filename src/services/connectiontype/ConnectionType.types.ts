// src/services/connectiontype/ConnectionType.types.ts

export interface ConnectionTypeDto {
  id: string; // Or number
  name: string; // e.g., "RTSP", "ONVIF"
  // Add other relevant fields from the API response
  // description?: string;
  // defaultPort?: number;
}

// Response for GET /connection-type is likely an array of ConnectionTypeDto
export type ListConnectionTypesResponseDto = ConnectionTypeDto[];

// Query parameters for GET /connection-type (from Swagger)
export interface GetConnectionTypesQueryParams {
  limit?: number;
  offset?: number;
  withTrashed?: 0 | 1;
  orderBy?: string;
  sort?: 'ASC' | 'DESC';
  id?: string;
  name?: string;
}
