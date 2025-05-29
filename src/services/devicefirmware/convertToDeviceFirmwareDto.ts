// src/services/devicefirmware/convertToDeviceFirmwareDto.ts
import { StoreDeviceFirmwareRequestDto, UpdateDeviceFirmwareRequestDto, DeviceFirmwareMetaDto } from './DeviceFirmware.types';

// Frontend form model for creating/editing a DeviceFirmware
export interface DeviceFirmwareFormModel {
  name: string;
  deviceModelId: string;
  driverId: string;
  meta: DeviceFirmwareMetaDto;
}

export function convertDeviceFirmwareFormToStoreDto(form: DeviceFirmwareFormModel): StoreDeviceFirmwareRequestDto {
  return {
    name: form.name,
    deviceModel: form.deviceModelId,
    driver: form.driverId,
    meta: form.meta,
  };
}

export function convertDeviceFirmwareFormToUpdateDto(form: Partial<DeviceFirmwareFormModel>): UpdateDeviceFirmwareRequestDto {
  const dto: UpdateDeviceFirmwareRequestDto = {};
  if (form.name) dto.name = form.name;
  if (form.deviceModelId) dto.deviceModel = form.deviceModelId;
  if (form.driverId) dto.driver = form.driverId;
  if (form.meta) dto.meta = form.meta;
  return dto;
}
