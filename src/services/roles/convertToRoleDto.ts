// src/services/roles/convertToRoleDto.ts
import { StoreRoleRequestDto, UpdateRoleRequestDto } from './Roles.types';

// Example: Frontend form model for creating/editing a role
export interface RoleFormModel {
  name: string;
  // In the UI, you might manage permissions as a list of selected permission IDs,
  // or as a list of PermissionModel objects if you fetch all permissions first.
  permissionIds: string[];
}

export function convertRoleFormToStoreDto(form: RoleFormModel): StoreRoleRequestDto {
  return {
    name: form.name,
    // Swagger expects an array of strings for permissions.
    // If your form model stores full PermissionModel objects, you'd map them to IDs here.
    permissions: form.permissionIds,
  };
}

export function convertRoleFormToUpdateDto(form: Partial<RoleFormModel>): UpdateRoleRequestDto {
  const dto: UpdateRoleRequestDto = {};
  if (form.name) {
    dto.name = form.name;
  }
  if (form.permissionIds) {
    // For updates, only include permissions if they are being changed.
    dto.permissions = form.permissionIds;
  }
  return dto;
}
