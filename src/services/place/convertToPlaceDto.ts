// src/services/place/convertToPlaceDto.ts
import { StorePlaceRequestDto, UpdatePlaceRequestDto } from './Place.types';

// Frontend form model for creating/editing a Place
export interface PlaceFormModel {
  name: string;
  // address?: string;
}

export function convertPlaceFormToStoreDto(form: PlaceFormModel): StorePlaceRequestDto {
  return {
    name: form.name,
    // address: form.address,
  };
}

export function convertPlaceFormToUpdateDto(form: Partial<PlaceFormModel>): UpdatePlaceRequestDto {
  const dto: UpdatePlaceRequestDto = {};
  if (form.name !== undefined) dto.name = form.name;
  // if (form.address !== undefined) dto.address = form.address;
  return dto;
}
