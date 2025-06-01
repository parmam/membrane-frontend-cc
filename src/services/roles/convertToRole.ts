// src/services/roles/convertToRole.ts
import { PermissionDto, RoleDetailsDto, RoleListItemDto } from './Roles.types';

export interface PermissionModel {
  id: string;
  name: string;
  description?: string;
}

export interface RoleModel {
  id: string;
  name: string;
  permissions: PermissionModel[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RoleListModel {
  id: string;
  name: string;
  permissionCount?: number;
  userCount?: number;
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
