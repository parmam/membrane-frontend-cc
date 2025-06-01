// src/services/devicevendor/convertToDeviceVendorDto.ts
import { StoreDeviceVendorRequestDto, UpdateDeviceVendorRequestDto } from './DeviceVendor.types';

export interface DeviceVendorFormModel {
  name: string;
}

export function convertDeviceVendorFormToStoreDto(
  form: DeviceVendorFormModel,
): StoreDeviceVendorRequestDto {
  return {
    name: form.name,
  };
}

export function convertDeviceVendorFormToUpdateDto(
  form: Partial<DeviceVendorFormModel>,
): UpdateDeviceVendorRequestDto {
  const dto: UpdateDeviceVendorRequestDto = {};
  if (form.name !== undefined) dto.name = form.name;
  return dto;
}
