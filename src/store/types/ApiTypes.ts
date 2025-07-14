// src/store/types/ApiTypes.ts
import type { components, operations } from '../../api/types';
import { AppErrorDto } from './ErrorTypes';

// ========================
// COMMON TYPES
// ========================

export interface PaginationParams {
  limit?: number;
  offset?: number;
  withTrashed?: number;
  orderBy?: string;
  sort?: 'ASC' | 'DESC';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  limit: number;
  offset: number;
}

// ========================
// USER TYPES
// ========================

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePictureUrl?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  roles?: Role[];
  places?: Place[];
}

export type UserQueryParams = operations['UserController_index']['parameters']['query'];
export type CreateUserRequest = components['schemas']['StoreUserRequest'];
export type UpdateUserRequest = components['schemas']['UpdateUserRequest'];
export type HasPermissionRequest = components['schemas']['HasPermissionToRequest'];
export type SearchUserByCredentialsRequest =
  components['schemas']['SearchUserByCredentialsRequest'];

// ========================
// ROLE TYPES
// ========================

export interface Role {
  id: string;
  name: string;
  permissions?: Permission[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export type RoleQueryParams = operations['RoleController_index']['parameters']['query'];
export type CreateRoleRequest = components['schemas']['StoreRoleRequest'];
export type UpdateRoleRequest = components['schemas']['UpdateRoleRequest'];

// ========================
// PERMISSION TYPES
// ========================

export interface Permission {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export type PermissionQueryParams = operations['PermissionController_index']['parameters']['query'];

// ========================
// CONNECTION TYPE TYPES
// ========================

export interface ConnectionType {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export type ConnectionTypeQueryParams =
  operations['ConnectionTypeController_index']['parameters']['query'];

// ========================
// DEVICE MODEL TYPES
// ========================

export interface DeviceModel {
  id: string;
  name: string;
  deviceVendor: DeviceVendor;
  deviceType: DeviceType;
  meta?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export type DeviceModelQueryParams =
  operations['DeviceModelController_index']['parameters']['query'];
export type CreateDeviceModelRequest = components['schemas']['StoreDeviceModelRequest'];
export type UpdateDeviceModelRequest = components['schemas']['UpdateDeviceModelRequest'];

// ========================
// DEVICE FIRMWARE TYPES
// ========================

export interface DeviceFirmware {
  id: string;
  name?: string;
  deviceModel?: DeviceModel;
  driver?: Driver;
  meta?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export type DeviceFirmwareQueryParams =
  operations['DeviceFirmwareController_index']['parameters']['query'];
export type CreateDeviceFirmwareRequest = components['schemas']['StoreDeviceFirmwareRequest'];
export type UpdateDeviceFirmwareRequest = components['schemas']['UpdateDeviceFirmwareRequest'];

// ========================
// DEVICE TYPES
// ========================

export interface Device {
  id: string;
  integrationId?: string;
  name: string;
  description?: string;
  critical: boolean;
  fco: boolean;
  deviceType: string;
  deviceVendor: string;
  deviceModel: string;
  deviceFirmware: string;
  group: string;
  place: string;
  monitoringInterval: number;
  enableNotifications: boolean;
  meta?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export type DeviceQueryParams = operations['DeviceController_index']['parameters']['query'];
export type CreateDeviceRequest = components['schemas']['StoreDeviceRequest'];
export type UpdateDeviceRequest = components['schemas']['UpdateDeviceRequest'];

// ========================
// DRIVER TYPES
// ========================

export interface Driver {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export type DriverQueryParams = operations['DriverController_index']['parameters']['query'];

// ========================
// EVENT TYPE TYPES
// ========================

export interface EventType {
  id: string;
  integrationId?: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export type EventTypeQueryParams = operations['EventTypeController_index']['parameters']['query'];
export type CreateEventTypeRequest = components['schemas']['StoreEventTypeRequest'];
export type UpdateEventTypeRequest = components['schemas']['UpdateEventTypeRequest'];

// ========================
// SHIFT TYPES
// ========================

export interface Shift {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export type ShiftQueryParams = operations['ShiftController_index']['parameters']['query'];
export type CreateShiftRequest = components['schemas']['StoreShiftRequest'];
export type UpdateShiftRequest = components['schemas']['UpdateShiftRequest'];

// ========================
// EVENT TYPES
// ========================

export interface Event {
  id: string;
  eventType?: string;
  shift?: string;
  device?: string;
  timestamp?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export type EventQueryParams = operations['EventController_index']['parameters']['query'];
export type CreateEventRequest = components['schemas']['StoreEventRequest'];
export type UpdateEventRequest = components['schemas']['UpdateEventRequest'];

// ========================
// FILE TYPES
// ========================

export interface FileEntity {
  id: string;
  fileName: string;
  originalName?: string;
  mimeType?: string;
  size?: number;
  path?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export type FileQueryParams = operations['FileController_index']['parameters']['query'];

// ========================
// MAP TYPES
// ========================

export interface Map {
  id: string;
  place: string;
  name: string;
  filePath?: string;
  devices?: DeviceOnMap[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface DeviceOnMap {
  id: string;
  device: string;
  posX: number;
  posY: number;
  radius: number;
  strokeColor: string;
  strokeWidth: number;
}

export type MapQueryParams = operations['MapController_index']['parameters']['query'];
export type CreateMapRequest = components['schemas']['StoreMapRequest'];
export type AddDeviceToMapRequest = components['schemas']['AddDeviceToMapRequest'];

// ========================
// DEVICE MONITORING TYPES
// ========================

export interface DeviceMonitoring {
  id: string;
  deviceId: string;
  deviceStatusId: string;
  timestamp: string;
  data?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export type DeviceMonitoringQueryParams =
  operations['DeviceMonitoringController_index']['parameters']['query'];
export type LastStatusQueryParams =
  operations['DeviceMonitoringController_getLastStatus']['parameters']['query'];
export type GetLastStatusByDeviceRequest = components['schemas']['GetLastStatusByDeviceRequest'];
export type GetUptimeFilters = components['schemas']['GetUptimeFilters'];

// ========================
// DEVICE STATUS TYPES
// ========================

export interface DeviceStatus {
  id: string;
  name: string;
  description?: string;
  color?: string;
  createdAt: string;
  updatedAt: string;
}

export type DeviceStatusQueryParams =
  operations['DeviceStatusController_index']['parameters']['query'];

// ========================
// DEVICE TYPE TYPES
// ========================

export interface DeviceType {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export type DeviceTypeQueryParams = operations['DeviceTypeController_index']['parameters']['query'];

// ========================
// DEVICE VENDOR TYPES
// ========================

export interface DeviceVendor {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export type DeviceVendorQueryParams =
  operations['DeviceVendorController_index']['parameters']['query'];
export type CreateDeviceVendorRequest = components['schemas']['StoreDeviceVendorRequest'];
export type UpdateDeviceVendorRequest = components['schemas']['UpdateDeviceVendorRequest'];

// ========================
// GROUP TYPES
// ========================

export interface Group {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export type GroupQueryParams = operations['GroupController_index']['parameters']['query'];
export type CreateGroupRequest = components['schemas']['StoreGroupRequest'];
export type UpdateGroupRequest = components['schemas']['UpdateGroupRequest'];

// ========================
// PLACE TYPES
// ========================

export interface Place {
  id: string;
  name: string;
  description?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export type PlaceQueryParams = operations['PlaceController_index']['parameters']['query'];
export type CreatePlaceRequest = components['schemas']['StorePlaceRequest'];
export type UpdatePlaceRequest = components['schemas']['UpdatePlaceRequest'];

// ========================
// AUTH TYPES
// ========================

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}

// ========================
// ERROR TYPES
// ========================

export interface ApiError {
  message: string;
  statusCode?: number;
  timestamp?: string;
  path?: string;
  details?: string[];
}

// ========================
// ASYNC THUNK RETURN TYPES
// ========================

export interface ThunkApiConfig {
  rejectValue: AppErrorDto;
}

// Pagination helpers
export interface PaginationMeta {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export function calculatePaginationMeta(
  total: number,
  limit: number = 10,
  offset: number = 0,
): PaginationMeta {
  const pageSize = limit;
  const page = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(total / limit);

  return {
    total,
    page,
    pageSize,
    totalPages,
  };
}
