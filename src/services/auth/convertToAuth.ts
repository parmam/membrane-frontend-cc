// src/services/auth/convertToAuth.ts
import { UserDto } from './Auth.types';

export interface UserModel {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  roles?: string[];
}

export function convertUserDtoToModel(dto: UserDto): UserModel {
  return {
    id: dto.id,
    fullName: `${dto.firstName} ${dto.lastName}`.trim(),
    email: dto.email,
    avatarUrl: dto.profilePictureUrl,
    roles: dto.roles?.map((role) => role.name),
  };
}
