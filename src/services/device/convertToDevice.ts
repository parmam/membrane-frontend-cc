// src/services/device/convertToDevice.ts
import { DeviceDto, DeviceMetaDto } from './Device.types';

// Frontend model for DeviceMeta (can be more specific based on known meta structures)
export interface DeviceMeta extends DeviceMetaDto {
  // connectionData?: {
  //   username?: string;
  //   password?: string; // Sensitive, ensure not overly exposed in UI models if not needed
  //   ip_address?: string;
  //   port?: number;
  //   channel?: number;
  //   stream?: string | number;
  // };
}

// Frontend model for Device
export interface Device {
  id: string;
  integrationId?: string | null;
  name: string;
  description?: string | null;
  isCritical: boolean;
  isFco: boolean; // Out of operative control
  deviceTypeId: string;
  deviceVendorId: string;
  deviceModelId: string;
  deviceFirmwareId: string;
  groupId: string;
  placeId: string;
  monitoringIntervalSeconds: number;
  notificationsEnabled: boolean;
  meta: DeviceMeta;

  // Optional populated names for display
  deviceTypeName?: string;
  deviceVendorName?: string;
  deviceModelName?: string;
  deviceFirmwareVersion?: string;
  groupName?: string;
  placeName?: string;
  status?: any; // Define if a structured status model is needed

  createdAt?: Date;
  updatedAt?: Date;
}

export function convertDeviceDtoToModel(dto: DeviceDto): Device {
  return {
    id: dto.id,
    integrationId: dto.integrationId,
    name: dto.name,
    description: dto.description,
    isCritical: dto.critical,
    isFco: dto.fco,
    deviceTypeId: dto.deviceType,
    deviceVendorId: dto.deviceVendor,
    deviceModelId: dto.deviceModel,
    deviceFirmwareId: dto.deviceFirmware,
    groupId: dto.group,
    placeId: dto.place,
    monitoringIntervalSeconds: dto.monitoringInterval,
    notificationsEnabled: dto.enableNotifications,
    meta: dto.meta || {}, // Ensure meta is at least an empty object
    deviceTypeName: dto.deviceTypeName,
    deviceVendorName: dto.deviceVendorName,
    deviceModelName: dto.deviceModelName,
    deviceFirmwareVersion: dto.deviceFirmwareVersion,
    groupName: dto.groupName,
    placeName: dto.placeName,
    status: dto.status,
    createdAt: dto.createdAt ? new Date(dto.createdAt) : undefined,
    updatedAt: dto.updatedAt ? new Date(dto.updatedAt) : undefined,
  };
}
