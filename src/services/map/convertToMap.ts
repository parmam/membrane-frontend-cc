// src/services/map/convertToMap.ts
import { MapDetailsDto, MapListItemDto, DeviceOnMapDto } from './Map.types';

// Frontend model for DeviceOnMap
export interface DeviceOnMapModel {
  id: string; // deviceMapId
  deviceId: string;
  position: { x: number; y: number };
  radius: number;
  strokeColor: string;
  strokeWidth: number;
  // additional properties for UI interaction or display
}

// Frontend model for Map (details view)
export interface MapModel {
  id: string;
  name: string;
  placeId: string;
  filePath?: string;
  devices: DeviceOnMapModel[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Frontend model for Map (list item view)
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
    radius: dto.radius || 8, // Default from swagger for AddDeviceToMapRequest
    strokeColor: dto.strokeColor || 'black', // Default from swagger
    strokeWidth: dto.strokeWidth || 2, // Default from swagger
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
    deviceCount: dto.deviceCount || 0,
    createdAt: dto.createdAt ? new Date(dto.createdAt) : undefined,
  };
}
