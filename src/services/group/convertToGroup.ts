// src/services/group/convertToGroup.ts
import { GroupDto } from './Group.types';

// Frontend model for Group
export interface Group {
  id: string;
  name: string;
  // description?: string;
  // deviceCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export function convertGroupDtoToModel(dto: GroupDto): Group {
  return {
    id: dto.id,
    name: dto.name,
    // description: dto.description,
    // deviceCount: dto.deviceCount,
    createdAt: dto.createdAt ? new Date(dto.createdAt) : undefined,
    updatedAt: dto.updatedAt ? new Date(dto.updatedAt) : undefined,
  };
}
