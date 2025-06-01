// src/services/devicemodel/convertToDeviceModel.ts
import { DeviceModelDto, DeviceModelMetaDto } from './DeviceModel.types';

// Frontend model for DeviceModel
export interface DeviceModel {
  id: string;
  name: string;
  deviceVendorId: string;
  deviceTypeId: string;
  meta: DeviceModelMetaDto; // Changed from DeviceModelMeta to DeviceModelMetaDto
  deviceVendorName?: string;
  deviceTypeName?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export function convertDeviceModelDtoToModel(dto: DeviceModelDto): DeviceModel {
  return {
    id: dto.id,
    name: dto.name,
    deviceVendorId: dto.deviceVendor,
    deviceTypeId: dto.deviceType,
    meta: dto.meta || {},
    deviceVendorName: dto.deviceVendorName,
    deviceTypeName: dto.deviceTypeName,
    createdAt: dto.createdAt ? new Date(dto.createdAt) : undefined,
    updatedAt: dto.updatedAt ? new Date(dto.updatedAt) : undefined,
  };
}
