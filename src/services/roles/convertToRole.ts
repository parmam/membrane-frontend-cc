// src/services/roles/convertToRole.ts
import { RoleDetailsDto, RoleListItemDto, PermissionDto } from './Roles.types';

// Frontend model for a Permission (if needed separately)
export interface PermissionModel {
  id: string;
  name: string;
  description?: string;
}

// Frontend model for Role (details view)
export interface RoleModel {
  id: string;
  name: string;
  permissions: PermissionModel[];
  createdAt?: Date;
  updatedAt?: Date;
  // Add other fields as needed by the UI
}

// Frontend model for Role (list item view)
export interface RoleListModel {
  id: string;
  name: string;
  permissionCount?: number;
  userCount?: number; // Example, if API provided this
  createdAt?: Date;
}

function convertPermissionDtoToModel(dto: PermissionDto): PermissionModel {
  return {
    id: dto.id,
    name: dto.name,
    description: dto.description,
  };
}

export function convertRoleDetailsDtoToModel(dto: RoleDetailsDto): RoleModel {
  return {
    id: dto.id,
    name: dto.name,
    permissions: dto.permissions?.map(convertPermissionDtoToModel) || [],
    createdAt: dto.createdAt ? new Date(dto.createdAt) : undefined,
    updatedAt: dto.updatedAt ? new Date(dto.updatedAt) : undefined,
  };
}

export function convertRoleListItemDtoToModel(dto: RoleListItemDto): RoleListModel {
  return {
    id: dto.id,
    name: dto.name,
    permissionCount: dto.permissionCount,
    userCount: dto.userCount,
    createdAt: dto.createdAt ? new Date(dto.createdAt) : undefined,
  };
}
