// src/services/permissions/Permissions.types.ts
export interface PermissionDto {
  id: string;
  name: string;
  description?: string;
}
export type ListPermissionsResponseDto = PermissionDto[];
