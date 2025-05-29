// src/services/map/convertToMapDto.ts
import { AddDeviceToMapRequestDto, StoreMapRequestData } from './Map.types';

// Frontend form model for adding a device to a map
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

// Frontend form model for creating a map (data part, file handled separately)
export interface CreateMapFormModel {
  name: string;
  placeId: string;
  // The File object for the map image is typically handled separately in the component
  // and passed directly to the service method.
}

export function convertCreateMapFormToStoreData(form: CreateMapFormModel): StoreMapRequestData {
  return {
    name: form.name,
    place: form.placeId,
  };
}
