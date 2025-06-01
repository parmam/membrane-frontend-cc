// src/services/users/convertToUser.ts
import { UserDetailsDto, UserListItemDto } from './Users.types';

export interface UserModel {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  roles: Array<{ id: string; name: string }>;
  places: Array<{ id: string; name: string }>;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  createdBy?: string;
  deletedBy?: string;
}

export interface UserListModel {
  id: string;
  fullName: string;
  email: string;
  createdAt?: Date;
}

export function convertUserDetailDtoToModel(dto: UserDetailsDto): UserModel {
  return {
    id: dto.id,
    firstName: dto.firstName,
    lastName: dto.lastName,
    fullName: `${dto.firstName} ${dto.lastName}`.trim(),
    email: dto.email,
    avatarUrl: dto.profilePictureUrl,
    roles: dto.roles || [],
    places: dto.places || [],
    createdAt: dto.createdAt ? new Date(dto.createdAt) : undefined,
    updatedAt: dto.updatedAt ? new Date(dto.updatedAt) : undefined,
    deletedAt: dto.deletedAt ? new Date(dto.deletedAt) : null,
    createdBy: dto.createdBy,
    deletedBy: dto.deletedBy,
  };
}

export function convertUserListItemDtoToModel(dto: UserListItemDto): UserListModel {
  return {
    id: dto.id,
    fullName: `${dto.firstName} ${dto.lastName}`.trim(),
    email: dto.email,
    createdAt: dto.createdAt ? new Date(dto.createdAt) : undefined,
  };
}
