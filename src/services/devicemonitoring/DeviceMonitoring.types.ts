// src/services/devicemonitoring/DeviceMonitoring.types.ts

// Structure for individual monitoring entries (assuming for GET /device-monitoring)
// This is speculative as Swagger doesn't detail the response structure for this endpoint.
export interface DeviceMonitoringEntryDto {
  id: string; // Or a composite key, or maybe no ID if it's time-series data
  deviceId: string;
  timestamp: string; // ISO 8601 date-time string
  statusId?: string; // From DeviceStatus
  statusName?: string;
  value?: any; // The actual monitoring value, can be anything
  deviceName?: string;
  // Add other relevant fields based on actual API response
}

// For paginated responses from GET /device-monitoring
export interface PaginatedDeviceMonitoringResponseDto {
  data: DeviceMonitoringEntryDto[];
  total: number;
  limit: number;
  offset: number;
}

// Query parameters for GET /device-monitoring (from Swagger)
export interface GetDeviceMonitoringQueryParams {
  limit?: number;
  offset?: number;
  withTrashed?: 0 | 1; // This seems unusual for monitoring data, but present in Swagger
  orderBy?: string;
  sort?: 'ASC' | 'DESC';
  dateFrom?: string; // e.g., "2024-05-20 17:21:55"
  dateTo?: string;
  deviceType?: string;
  deviceVendor?: string;
  group?: string;
  place?: string;
  critical?: boolean;
  device?: string; // device id
  deviceStatus?: string; // DeviceStatus id
}

// For GET /device-monitoring/lastStatus
export interface GetLastStatusQueryParams {
  date: string; // e.g., "2024-05-20"
  withFco?: boolean;
  place?: string; // Place ID
}

// Response for GET /device-monitoring/lastStatus - Speculative
// The API might return an array of objects, each representing a device's last status
export interface DeviceLastStatusDto {
  deviceId: string;
  deviceName?: string;
  timestamp: string;
  statusId?: string;
  statusName?: string;
  isFco?: boolean;
  placeId?: string;
  placeName?: string;
  // other relevant fields
  [key: string]: any; // If structure is highly variable
}
export type ListDeviceLastStatusResponseDto = DeviceLastStatusDto[];


// From Swagger: #/components/schemas/GetLastStatusByDeviceRequest
export interface GetLastStatusByDeviceRequestDto {
  deviceIds: string[];
  dateFrom?: string; // e.g., "2024-01-01 20:00:00"
  dateTo?: string;   // e.g., "2024-01-01 20:00:00"
}
// Response for POST /device-monitoring/lastStatusByDevice - Speculative
// Might be an array of DeviceLastStatusDto or a map
export type LastStatusByDeviceResponseDto = Record<string, DeviceLastStatusDto | null> | DeviceLastStatusDto[];


// From Swagger: #/components/schemas/GetUptimeFilters
export interface GetUptimeFiltersDto {
  dateFrom: string; // e.g., "2024-01-01 10:00:00"
  dateTo: string;   // e.g., "2024-01-01 20:00:00"
  withFco?: boolean;
  places?: string[]; // Array of Place IDs
}

// Response for POST /device-monitoring/uptime - Speculative
export interface DeviceUptimeDto {
  deviceId?: string; // If per device
  placeId?: string;  // If per place
  uptimePercentage: number; // e.g., 99.9
  onlineDurationSeconds?: number;
  offlineDurationSeconds?: number;
  totalDurationSeconds?: number;
  // other relevant fields
}
export type UptimeResponseDto = DeviceUptimeDto[] | DeviceUptimeDto; // Could be an array or a single object for overall uptime
