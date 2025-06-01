// src/services/driver/Driver.types.ts
export interface DriverDto {
  id: string;
  name: string;
  // Add any other properties if specified by API response (Swagger schema is open)
  [key: string]: unknown; // Changed 'any' to 'unknown'
}

export type ListDriversResponseDto = DriverDto[];

export interface GetDriversQueryParams {
  limit?: number;
  offset?: number;
  withTrashed?: 0 | 1;
  orderBy?: string;
  sort?: 'ASC' | 'DESC';
  id?: string;
  name?: string;
}
