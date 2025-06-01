// src/services/devicevendor/convertToDeviceVendor.ts
import { DeviceVendorDto } from './DeviceVendor.types';

export interface DeviceVendor {
  id: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export function convertDeviceVendorDtoToModel(dto: DeviceVendorDto): DeviceVendor {
  return {
    id: dto.id,
    name: dto.name,
    createdAt: dto.createdAt ? new Date(dto.createdAt) : undefined,
    updatedAt: dto.updatedAt ? new Date(dto.updatedAt) : undefined,
  };
}
