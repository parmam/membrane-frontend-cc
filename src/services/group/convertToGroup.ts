// src/services/group/convertToGroup.ts
import { GroupDto } from './Group.types';

export interface Group {
  id: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export function convertGroupDtoToModel(dto: GroupDto): Group {
  return {
    id: dto.id,
    name: dto.name,
    createdAt: dto.createdAt ? new Date(dto.createdAt) : undefined,
    updatedAt: dto.updatedAt ? new Date(dto.updatedAt) : undefined,
  };
}
