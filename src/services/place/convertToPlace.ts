// src/services/place/convertToPlace.ts
import { PlaceDto } from './Place.types';

export interface Place {
  id: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export function convertPlaceDtoToModel(dto: PlaceDto): Place {
  return {
    id: dto.id,
    name: dto.name,
    createdAt: dto.createdAt ? new Date(dto.createdAt) : undefined,
    updatedAt: dto.updatedAt ? new Date(dto.updatedAt) : undefined,
  };
}
