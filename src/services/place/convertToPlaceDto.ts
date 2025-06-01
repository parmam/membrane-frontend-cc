// src/services/place/convertToPlaceDto.ts
import { StorePlaceRequestDto, UpdatePlaceRequestDto } from './Place.types';

export interface PlaceFormModel {
  name: string;
}

export function convertPlaceFormToStoreDto(form: PlaceFormModel): StorePlaceRequestDto {
  return {
    name: form.name,
  };
}

export function convertPlaceFormToUpdateDto(form: Partial<PlaceFormModel>): UpdatePlaceRequestDto {
  const dto: UpdatePlaceRequestDto = {};
  if (form.name !== undefined) dto.name = form.name;
  return dto;
}
