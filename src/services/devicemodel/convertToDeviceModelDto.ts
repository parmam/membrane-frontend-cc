// src/services/devicemodel/convertToDeviceModelDto.ts
import { StoreDeviceModelRequestDto, UpdateDeviceModelRequestDto, DeviceModelMetaDto } from './DeviceModel.types';

// Frontend form model for creating/editing a DeviceModel
export interface DeviceModelFormModel {
  name: string;
  deviceVendorId: string;
  deviceTypeId: string;
  meta: DeviceModelMetaDto; // Use the same flexible meta type for forms
}

export function convertDeviceModelFormToStoreDto(form: DeviceModelFormModel): StoreDeviceModelRequestDto {
  return {
    name: form.name,
    deviceVendor: form.deviceVendorId,
    deviceType: form.deviceTypeId,
    meta: form.meta,
  };
}

export function convertDeviceModelFormToUpdateDto(form: Partial<DeviceModelFormModel>): UpdateDeviceModelRequestDto {
  const dto: UpdateDeviceModelRequestDto = {};
  if (form.name) dto.name = form.name;
  if (form.deviceVendorId) dto.deviceVendor = form.deviceVendorId;
  if (form.deviceTypeId) dto.deviceType = form.deviceTypeId;
  if (form.meta) dto.meta = form.meta; // Meta can be updated partially or fully
  return dto;
}
