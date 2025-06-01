// src/services/map/convertToMapDto.ts
import { AddDeviceToMapRequestDto, StoreMapRequestData } from './Map.types';

export interface AddDeviceToMapFormModel {
  deviceId: string;
  posX: number;
  posY: number;
  radius?: number;
  strokeColor?: string;
  strokeWidth?: number;
}

export function convertAddDeviceFormToDto(form: AddDeviceToMapFormModel): AddDeviceToMapRequestDto {
  return {
    device: form.deviceId,
    posX: form.posX,
    posY: form.posY,
    radius: form.radius,
    strokeColor: form.strokeColor,
    strokeWidth: form.strokeWidth,
  };
}

export interface CreateMapFormModel {
  name: string;
  placeId: string;
  // File object is handled separately in service/component
}

export function convertCreateMapFormToStoreData(form: CreateMapFormModel): StoreMapRequestData {
  return {
    name: form.name,
    place: form.placeId,
  };
}
