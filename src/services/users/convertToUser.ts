// src/services/users/convertToUser.ts
import { UserDetailsDto, UserListItemDto, UserRoleDto, UserPlaceDto } from './Users.types';

// Frontend model for User (details view)
export interface UserModel {
  id: string;
  firstName: string;
  lastName: string; // Corrected: should be string
  fullName: string;
  email: string;
  avatarUrl?: string;
  roles: Array<{ id: string; name: string }>; // Keeping roles as objects
  places: Array<{ id: string; name: string }>; // Keeping places as objects
  createdAt?: Date; // Converted to Date object
  updatedAt?: Date;
  deletedAt?: Date | null;
  createdBy?: string;
  deletedBy?: string;
  // Add other fields needed by the UI, potentially transformed
}

// Frontend model for User (list item view)
export interface UserListModel {
  id: string;
  fullName: string;
  email: string;
  createdAt?: Date;
  // Add other fields needed for list display
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

// Potentially, a function to convert paginated DTO to paginated Model
// import { PaginatedUsersResponseDto } from './Users.types';
// export interface PaginatedUsersModel {
//   users: UserListModel[];
//   total: number;
//   limit: number;
//   offset: number;
// }
// export function convertPaginatedUsersDtoToModel(dto: PaginatedUsersResponseDto): PaginatedUsersModel {
//   return {
//     users: dto.data.map(convertUserListItemDtoToModel),
//     total: dto.total,
//     limit: dto.limit,
//     offset: dto.offset,
//   };
// }
