// src/services/map/Map.types.ts

// Represents a device placed on a map
export interface DeviceOnMapDto {
  id: string; // This would be deviceMapId
  deviceId: string; // The actual device ID
  posX: number;
  posY: number;
  radius?: number;
  strokeColor?: string;
  strokeWidth?: number;
  // Any other properties returned by the API for a device on a map
}

// For Map details (e.g., GET /map/{id})
export interface MapDetailsDto {
  id: string;
  name: string;
  placeId: string; // From StoreMapRequest, assuming it's stored and returned
  filePath?: string; // Path to the map file (e.g., SVG)
  devicesOnMap?: DeviceOnMapDto[];
  createdAt?: string;
  updatedAt?: string;
  // Add other fields if returned by API
}

// For lists of maps (e.g., GET /map)
export interface MapListItemDto {
  id: string;
  name: string;
  placeId?: string;
  deviceCount?: number; // Example if API provides this
  createdAt?: string;
}

// For paginated map responses (e.g., GET /map)
export interface PaginatedMapsResponseDto {
  data: MapListItemDto[];
  total: number;
  limit: number;
  offset: number;
}

// From Swagger: #/components/schemas/StoreMapRequest
// Note: 'file' is binary, handled via FormData in the service.
export interface StoreMapRequestData { // Renamed to avoid conflict with browser File type
  place: string; // Place ID
  name: string;
  // file: File; // The actual file object for FormData
}

// From Swagger: #/components/schemas/AddDeviceToMapRequest
export interface AddDeviceToMapRequestDto {
  device: string; // Device ID
  posX: number;
  posY: number;
  radius?: number;
  strokeColor?: string;
  strokeWidth?: number;
}

// Response for adding a device to a map (assuming it returns the DeviceOnMapDto or similar)
export type AddDeviceToMapResponseDto = DeviceOnMapDto;


// Query parameters for GET /map
export interface GetMapsQueryParams {
  limit?: number;
  offset?: number;
  withTrashed?: 0 | 1;
  orderBy?: string;
  sort?: 'ASC' | 'DESC';
  id?: string;
  name?: string;
  // Potentially placeId if API supports filtering by it
}
