// src/services/driver/Driver.types.ts

export interface DriverDto {
  id: string; // Or number
  name: string; // e.g., "RTSPDigital", "ONVIFDriver"
  // version?: string;
  // Add other relevant fields from the API response based on actual data
  [key: string]: any; // Since Swagger schema is open
}

// Response for GET /driver is likely an array of DriverDto
export type ListDriversResponseDto = DriverDto[];

// Query parameters for GET /driver (from Swagger)
export interface GetDriversQueryParams {
  limit?: number;
  offset?: number;
  withTrashed?: 0 | 1;
  orderBy?: string;
  sort?: 'ASC' | 'DESC';
  id?: string;
  name?: string;
}
