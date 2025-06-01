// src/services/map/convertToMap.ts
import { DeviceOnMapDto, MapDetailsDto, MapListItemDto } from './Map.types';

export interface DeviceOnMapModel {
  id: string;
  deviceId: string;
  position: { x: number; y: number };
  radius: number;
  strokeColor: string;
  strokeWidth: number;
}

export interface MapModel {
  id: string;
  name: string;
  placeId: string;
  filePath?: string;
  devices: DeviceOnMapModel[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MapListModel {
  id: string;
  name: string;
  placeId?: string;
  deviceCount: number;
  createdAt?: Date;
}

function convertDeviceOnMapDtoToModel(dto: DeviceOnMapDto): DeviceOnMapModel {
  return {
    id: dto.id,
    deviceId: dto.deviceId,
    position: { x: dto.posX, y: dto.posY },
    // Defaults from AddDeviceToMapRequest schema if not present in DTO
    radius: dto.radius ?? 8,
    strokeColor: dto.strokeColor ?? 'black',
    strokeWidth: dto.strokeWidth ?? 2,
  };
}

export function convertMapDetailsDtoToModel(dto: MapDetailsDto): MapModel {
  return {
    id: dto.id,
    name: dto.name,
    placeId: dto.placeId,
    filePath: dto.filePath,
    devices: dto.devicesOnMap?.map(convertDeviceOnMapDtoToModel) || [],
    createdAt: dto.createdAt ? new Date(dto.createdAt) : undefined,
    updatedAt: dto.updatedAt ? new Date(dto.updatedAt) : undefined,
  };
}

export function convertMapListItemDtoToModel(dto: MapListItemDto): MapListModel {
  return {
    id: dto.id,
    name: dto.name,
    placeId: dto.placeId,
    deviceCount: dto.deviceCount || 0, // Assuming default if not provided
    createdAt: dto.createdAt ? new Date(dto.createdAt) : undefined,
  };
}
