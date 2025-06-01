// src/services/place/Place.types.ts

export interface PlaceDto {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginatedPlacesResponseDto {
  data: PlaceDto[];
  total: number;
  limit: number;
  offset: number;
}

export interface StorePlaceRequestDto {
  name: string;
}

export interface UpdatePlaceRequestDto {
  name?: string;
}

export interface GetPlacesQueryParams {
  limit?: number;
  offset?: number;
  withTrashed?: 0 | 1;
  orderBy?: string;
  sort?: 'ASC' | 'DESC';
  id?: string;
  name?: string;
}
