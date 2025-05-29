// src/services/devicemodel/convertToDeviceModel.ts
import { DeviceModelDto, DeviceModelMetaDto } from './DeviceModel.types';

// Frontend model for DeviceModelMeta (can be more specific if needed)
export interface DeviceModelMeta extends DeviceModelMetaDto {
  // channels?: number; // Example of a known property
}

// Frontend model for DeviceModel
export interface DeviceModel {
  id: string;
  name: string;
  deviceVendorId: string;
  deviceTypeId: string;
  meta: DeviceModelMeta;
  deviceVendorName?: string; // For display
  deviceTypeName?: string;   // For display
  createdAt?: Date;
  updatedAt?: Date;
}

export function convertDeviceModelDtoToModel(dto: DeviceModelDto): DeviceModel {
  return {
    id: dto.id,
    name: dto.name,
    deviceVendorId: dto.deviceVendor,
    deviceTypeId: dto.deviceType,
    meta: dto.meta || {}, // Ensure meta is at least an empty object
    deviceVendorName: dto.deviceVendorName,
    deviceTypeName: dto.deviceTypeName,
    createdAt: dto.createdAt ? new Date(dto.createdAt) : undefined,
    updatedAt: dto.updatedAt ? new Date(dto.updatedAt) : undefined,
  };
}
