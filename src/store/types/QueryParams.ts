// src/store/types/QueryParams.ts

// Base query parameters interface
export interface BaseQueryParams {
  limit?: number;
  offset?: number;
  withTrashed?: 0 | 1;
  orderBy?: string;
  sort?: 'ASC' | 'DESC';
}

// Specific query parameters for different entities
export interface UserQueryParams extends BaseQueryParams {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  createdAt?: string;
  createdBy?: string;
  deletedBy?: string;
  deletedAt?: string;
}

export interface DeviceQueryParams extends BaseQueryParams {
  id?: string;
  name?: string;
  deviceModel?: string;
  group?: string;
  place?: string;
  isActive?: boolean;
}

export interface DeviceMonitoringQueryParams extends BaseQueryParams {
  device?: string;
  deviceStatus?: string;
  startDate?: string;
  endDate?: string;
  isCritical?: boolean;
  place?: string;
  group?: string;
  deviceType?: string;
  deviceVendor?: string;
}

export interface DeviceModelQueryParams extends BaseQueryParams {
  id?: string;
  name?: string;
  deviceVendor?: string;
  deviceType?: string;
}

export interface DeviceStatusQueryParams extends BaseQueryParams {
  id?: string;
  name?: string;
  isActive?: boolean;
}

export interface DeviceVendorQueryParams extends BaseQueryParams {
  id?: string;
  name?: string;
}

export interface DeviceTypeQueryParams extends BaseQueryParams {
  name?: string;
  category?: string;
  isActive?: boolean;
}

export interface GroupQueryParams extends BaseQueryParams {
  id?: string;
  name?: string;
}

export interface PlaceQueryParams extends BaseQueryParams {
  id?: string;
  name?: string;
}

export interface RoleQueryParams extends BaseQueryParams {
  id?: string;
  name?: string;
}

export interface MapQueryParams extends BaseQueryParams {
  id?: string;
  name?: string;
}

export interface ConnectionTypeQueryParams extends BaseQueryParams {
  id?: string;
  name?: string;
}

export interface DriverQueryParams extends BaseQueryParams {
  id?: string;
  name?: string;
}

// Query parameter validators
export function validateBaseQueryParams(params: BaseQueryParams): boolean {
  if (params.limit !== undefined && (params.limit < 1 || params.limit > 1000)) {
    return false;
  }

  if (params.offset !== undefined && params.offset < 0) {
    return false;
  }

  if (params.withTrashed !== undefined && ![0, 1].includes(params.withTrashed)) {
    return false;
  }

  if (params.sort !== undefined && !['ASC', 'DESC'].includes(params.sort)) {
    return false;
  }

  return true;
}

export function validateUserQueryParams(params: UserQueryParams): boolean {
  if (!validateBaseQueryParams(params)) {
    return false;
  }

  // Email validation
  if (params.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(params.email)) {
    return false;
  }

  // Date validation
  if (params.createdAt && isNaN(Date.parse(params.createdAt))) {
    return false;
  }

  if (params.deletedAt && isNaN(Date.parse(params.deletedAt))) {
    return false;
  }

  return true;
}

export function validateDeviceQueryParams(params: DeviceQueryParams): boolean {
  if (!validateBaseQueryParams(params)) {
    return false;
  }

  if (params.isActive !== undefined && typeof params.isActive !== 'boolean') {
    return false;
  }

  return true;
}

export function validateDeviceMonitoringQueryParams(params: DeviceMonitoringQueryParams): boolean {
  if (!validateBaseQueryParams(params)) {
    return false;
  }

  if (params.startDate && isNaN(Date.parse(params.startDate))) {
    return false;
  }

  if (params.endDate && isNaN(Date.parse(params.endDate))) {
    return false;
  }

  if (params.startDate && params.endDate && new Date(params.startDate) > new Date(params.endDate)) {
    return false;
  }

  if (params.isCritical !== undefined && typeof params.isCritical !== 'boolean') {
    return false;
  }

  return true;
}

// Helper function to sanitize query parameters
export function sanitizeQueryParams<T extends BaseQueryParams>(
  params: T,
  allowedFields: (keyof T)[],
): Partial<T> {
  const sanitized: Partial<T> = {};

  for (const field of allowedFields) {
    if (params[field] !== undefined) {
      sanitized[field] = params[field];
    }
  }

  return sanitized;
}

// Type-safe query parameter builders
export function buildUserQueryParams(params: Partial<UserQueryParams>): UserQueryParams {
  const defaults: UserQueryParams = {
    limit: 10,
    offset: 0,
    sort: 'DESC',
    orderBy: 'createdAt',
  };

  return { ...defaults, ...params };
}

export function buildDeviceQueryParams(params: Partial<DeviceQueryParams>): DeviceQueryParams {
  const defaults: DeviceQueryParams = {
    limit: 10,
    offset: 0,
    sort: 'ASC',
    orderBy: 'name',
  };

  return { ...defaults, ...params };
}

export function buildDeviceMonitoringQueryParams(
  params: Partial<DeviceMonitoringQueryParams>,
): DeviceMonitoringQueryParams {
  const defaults: DeviceMonitoringQueryParams = {
    limit: 10,
    offset: 0,
    sort: 'DESC',
    orderBy: 'timestamp',
  };

  return { ...defaults, ...params };
}
