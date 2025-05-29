// src/services/devicefirmware/convertToDeviceFirmware.ts
import { DeviceFirmwareDto, DeviceFirmwareMetaDto } from './DeviceFirmware.types';

// Frontend model for DeviceFirmwareMeta (can be more specific)
export interface DeviceFirmwareMeta extends DeviceFirmwareMetaDto {
  // rtspStreamUrl?: string; // Example
}

// Frontend model for DeviceFirmware
export interface DeviceFirmware {
  id: string;
  name: string;
  deviceModelId: string;
  driverId: string;
  meta: DeviceFirmwareMeta;
  deviceModelName?: string; // For display
  driverName?: string;      // For display
  createdAt?: Date;
  updatedAt?: Date;
}

export function convertDeviceFirmwareDtoToModel(dto: DeviceFirmwareDto): DeviceFirmware {
  return {
    id: dto.id,
    name: dto.name,
    deviceModelId: dto.deviceModel,
    driverId: dto.driver,
    meta: dto.meta || {}, // Ensure meta is at least an empty object
    deviceModelName: dto.deviceModelName,
    driverName: dto.driverName,
    createdAt: dto.createdAt ? new Date(dto.createdAt) : undefined,
    updatedAt: dto.updatedAt ? new Date(dto.updatedAt) : undefined,
  };
}
