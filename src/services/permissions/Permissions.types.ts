// src/services/permissions/Permissions.types.ts

// Based on the structure used in RoleDetailsDto and common patterns
export interface PermissionDto {
  id: string; // Or number, depending on the actual API response
  name: string; // e.g., 'users.view', 'devices.edit'
  description?: string; // A human-readable description of the permission
  // Add any other relevant fields returned by the GET /permission endpoint
  // For example, module or category if the API provides it:
  // module?: string;
}

// The response for GET /permission is likely an array of PermissionDto
export type ListPermissionsResponseDto = PermissionDto[];

// No specific query parameters are listed for GET /permission in the Swagger,
// but adding a placeholder if filtering/pagination were ever added.
// export interface GetPermissionsQueryParams {
//   sortBy?: string;
//   module?: string;
// }
