// src/services/group/convertToGroupDto.ts
import { StoreGroupRequestDto, UpdateGroupRequestDto } from './Group.types';

// Frontend form model for creating/editing a Group
export interface GroupFormModel {
  name: string;
  // description?: string;
}

export function convertGroupFormToStoreDto(form: GroupFormModel): StoreGroupRequestDto {
  return {
    name: form.name,
    // description: form.description,
  };
}

export function convertGroupFormToUpdateDto(form: Partial<GroupFormModel>): UpdateGroupRequestDto {
  const dto: UpdateGroupRequestDto = {};
  if (form.name !== undefined) dto.name = form.name;
  // if (form.description !== undefined) dto.description = form.description;
  return dto;
}
