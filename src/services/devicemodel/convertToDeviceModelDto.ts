// src/services/devicemodel/convertToDeviceModelDto.ts
import {
  DeviceModelMetaDto,
  StoreDeviceModelRequestDto,
  UpdateDeviceModelRequestDto,
} from './DeviceModel.types';

// Frontend form model for creating/editing a DeviceModel
export interface DeviceModelFormModel {
  name: string;
  deviceVendorId: string;
  deviceTypeId: string;
  meta: DeviceModelMetaDto;
}

export function convertDeviceModelFormToStoreDto(
  form: DeviceModelFormModel,
): StoreDeviceModelRequestDto {
  return {
    name: form.name,
    deviceVendor: form.deviceVendorId,
    deviceType: form.deviceTypeId,
    meta: form.meta,
  };
}

export function convertDeviceModelFormToUpdateDto(
  form: Partial<DeviceModelFormModel>,
): UpdateDeviceModelRequestDto {
  const dto: UpdateDeviceModelRequestDto = {};
  if (form.name) dto.name = form.name;
  if (form.deviceVendorId) dto.deviceVendor = form.deviceVendorId;
  if (form.deviceTypeId) dto.deviceType = form.deviceTypeId;
  // Ensure meta is included only if it's actually provided in the partial form model.
  // If meta itself can be partially updated, the backend API structure for PATCH vs PUT for meta would be important.
  // Assuming here that if meta is in the form, the whole meta object is provided for update.
  if (form.meta) dto.meta = form.meta;
  return dto;
}
