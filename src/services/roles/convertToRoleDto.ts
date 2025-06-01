// src/services/roles/convertToRoleDto.ts
import { StoreRoleRequestDto, UpdateRoleRequestDto } from './Roles.types';

export interface RoleFormModel {
  name: string;
  permissionIds: string[];
}

export function convertRoleFormToStoreDto(form: RoleFormModel): StoreRoleRequestDto {
  return {
    name: form.name,
    permissions: form.permissionIds,
  };
}

export function convertRoleFormToUpdateDto(form: Partial<RoleFormModel>): UpdateRoleRequestDto {
  const dto: UpdateRoleRequestDto = {};
  if (form.name) {
    dto.name = form.name;
  }
  if (form.permissionIds) {
    dto.permissions = form.permissionIds;
  }
  return dto;
}
