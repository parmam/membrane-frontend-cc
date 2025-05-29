// src/services/device/convertToDeviceDto.ts
import { StoreDeviceRequestDto, UpdateDeviceRequestDto, DeviceMetaDto } from './Device.types';

// Frontend form model for creating/editing a Device
export interface DeviceFormModel {
  name: string;
  description?: string | null;
  isCritical: boolean;
  isFco?: boolean; // Default to false if undefined in form
  deviceTypeId: string;
  deviceVendorId: string;
  deviceModelId: string;
  deviceFirmwareId: string;
  groupId: string;
  placeId: string;
  monitoringIntervalSeconds: number;
  notificationsEnabled: boolean;
  meta: DeviceMetaDto;
  integrationId?: string | null;
}

export function convertDeviceFormToStoreDto(form: DeviceFormModel): StoreDeviceRequestDto {
  return {
    name: form.name,
    description: form.description ?? undefined, // Ensure null becomes undefined if API expects that
    critical: form.isCritical,
    fco: form.isFco ?? false,
    deviceType: form.deviceTypeId,
    deviceVendor: form.deviceVendorId,
    deviceModel: form.deviceModelId,
    deviceFirmware: form.deviceFirmwareId,
    group: form.groupId,
    place: form.placeId,
    monitoringInterval: form.monitoringIntervalSeconds,
    enableNotifications: form.notificationsEnabled,
    meta: form.meta,
    integrationId: form.integrationId ?? undefined,
  };
}

export function convertDeviceFormToUpdateDto(form: Partial<DeviceFormModel>): UpdateDeviceRequestDto {
  const dto: UpdateDeviceRequestDto = {};
  if (form.name !== undefined) dto.name = form.name;
  if (form.description !== undefined) dto.description = form.description ?? undefined;
  if (form.isCritical !== undefined) dto.critical = form.isCritical;
  if (form.isFco !== undefined) dto.fco = form.isFco ?? false;
  if (form.deviceTypeId !== undefined) dto.deviceType = form.deviceTypeId;
  if (form.deviceVendorId !== undefined) dto.deviceVendor = form.deviceVendorId;
  if (form.deviceModelId !== undefined) dto.deviceModel = form.deviceModelId;
  if (form.deviceFirmwareId !== undefined) dto.deviceFirmware = form.deviceFirmwareId;
  if (form.groupId !== undefined) dto.group = form.groupId;
  if (form.placeId !== undefined) dto.place = form.placeId;
  if (form.monitoringIntervalSeconds !== undefined) dto.monitoringInterval = form.monitoringIntervalSeconds;
  if (form.notificationsEnabled !== undefined) dto.enableNotifications = form.notificationsEnabled;
  if (form.meta !== undefined) dto.meta = form.meta;
  if (form.integrationId !== undefined) dto.integrationId = form.integrationId ?? undefined;
  return dto;
}
