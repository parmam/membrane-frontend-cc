// src/services/place/Place.types.ts

export interface PlaceDto {
  id: string; // Or number
  name: string;
  // address?: string; // If API supports/returns it
  // mapCount?: number; // If API returns count of maps in place
  createdAt?: string;
  updatedAt?: string;
}

// For paginated responses
export interface PaginatedPlacesResponseDto {
  data: PlaceDto[];
  total: number;
  limit: number;
  offset: number;
}

// From Swagger: #/components/schemas/StorePlaceRequest
export interface StorePlaceRequestDto {
  name: string;
  // address?: string;
}

// From Swagger: #/components/schemas/UpdatePlaceRequest
export interface UpdatePlaceRequestDto {
  name?: string;
  // address?: string;
}

// Query parameters for GET /place (from Swagger)
export interface GetPlacesQueryParams {
  limit?: number;
  offset?: number;
  withTrashed?: 0 | 1;
  orderBy?: string;
  sort?: 'ASC' | 'DESC';
  id?: string;
  name?: string;
}
