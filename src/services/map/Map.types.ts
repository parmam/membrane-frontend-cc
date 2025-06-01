// src/services/map/Map.types.ts

export interface DeviceOnMapDto {
  // Inferred from AddDeviceToMapRequest and common usage
  id: string; // This would be the ID of the map-device link (deviceMapId)
  deviceId: string;
  posX: number;
  posY: number;
  radius?: number;
  strokeColor?: string;
  strokeWidth?: number;
}

export interface MapDetailsDto {
  id: string;
  name: string;
  placeId: string; // From StoreMapRequest schema
  filePath?: string; // Assuming the 'file' from StoreMapRequest results in a stored path
  devicesOnMap?: DeviceOnMapDto[]; // Assuming this is part of the map details
  createdAt?: string;
  updatedAt?: string;
}

export interface MapListItemDto {
  id: string;
  name: string;
  placeId?: string;
  // deviceCount?: number; // Could be added if API supports
  createdAt?: string;
}

export interface PaginatedMapsResponseDto {
  data: MapListItemDto[];
  total: number;
  limit: number;
  offset: number;
}

// From Swagger: #/components/schemas/StoreMapRequest
export interface StoreMapRequestData {
  place: string;
  name: string;
  // file: File will be handled as FormData in the service method
}

// From Swagger: #/components/schemas/AddDeviceToMapRequest
export interface AddDeviceToMapRequestDto {
  device: string;
  posX: number;
  posY: number;
  radius?: number;
  strokeColor?: string;
  strokeWidth?: number;
}

// Assuming the response for adding a device might be the created DeviceOnMapDto link
export type AddDeviceToMapResponseDto = DeviceOnMapDto;

export interface GetMapsQueryParams {
  limit?: number;
  offset?: number;
  withTrashed?: 0 | 1;
  orderBy?: string;
  sort?: 'ASC' | 'DESC';
  id?: string;
  name?: string;
}
