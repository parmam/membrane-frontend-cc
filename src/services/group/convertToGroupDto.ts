// src/services/group/convertToGroupDto.ts
import { StoreGroupRequestDto, UpdateGroupRequestDto } from './Group.types';

export interface GroupFormModel {
  name: string;
}

export function convertGroupFormToStoreDto(form: GroupFormModel): StoreGroupRequestDto {
  return {
    name: form.name,
  };
}

export function convertGroupFormToUpdateDto(form: Partial<GroupFormModel>): UpdateGroupRequestDto {
  const dto: UpdateGroupRequestDto = {};
  if (form.name !== undefined) dto.name = form.name;
  return dto;
}
