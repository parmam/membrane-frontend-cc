// src/services/place/convertToPlace.ts
import { PlaceDto } from './Place.types';

// Frontend model for Place
export interface Place {
  id: string;
  name: string;
  // address?: string;
  // mapCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export function convertPlaceDtoToModel(dto: PlaceDto): Place {
  return {
    id: dto.id,
    name: dto.name,
    // address: dto.address,
    // mapCount: dto.mapCount,
    createdAt: dto.createdAt ? new Date(dto.createdAt) : undefined,
    updatedAt: dto.updatedAt ? new Date(dto.updatedAt) : undefined,
  };
}
