// src/store/types/LoadingTypes.ts

// Base loading state interface
export interface LoadingState {
  [key: string]: boolean;
}

// Specific loading action types for each entity
export type AuthLoadingActions = 'loginThunk' | 'getCurrentUserThunk' | 'logoutThunk';

export type UserLoadingActions =
  | 'getUsersThunk'
  | 'getUserByIdThunk'
  | 'createUserThunk'
  | 'updateUserThunk'
  | 'deleteUserThunk'
  | 'restoreUserThunk'
  | 'hasPermissionToThunk'
  | 'searchUserByCredentialsThunk';

export type RoleLoadingActions =
  | 'getRolesThunk'
  | 'getRoleByIdThunk'
  | 'createRoleThunk'
  | 'updateRoleThunk'
  | 'deleteRoleThunk'
  | 'restoreRoleThunk';

export type PermissionLoadingActions = 'getPermissionsThunk';

export type ConnectionTypeLoadingActions = 'getConnectionTypesThunk';

export type DeviceModelLoadingActions =
  | 'getDeviceModelsThunk'
  | 'getDeviceModelByIdThunk'
  | 'createDeviceModelThunk'
  | 'updateDeviceModelThunk'
  | 'deleteDeviceModelThunk'
  | 'restoreDeviceModelThunk';

export type DeviceFirmwareLoadingActions =
  | 'getDeviceFirmwaresThunk'
  | 'getDeviceFirmwareByIdThunk'
  | 'createDeviceFirmwareThunk'
  | 'updateDeviceFirmwareThunk'
  | 'deleteDeviceFirmwareThunk'
  | 'restoreDeviceFirmwareThunk';

export type DeviceLoadingActions =
  | 'getDevicesThunk'
  | 'getDeviceByIdThunk'
  | 'createDeviceThunk'
  | 'updateDeviceThunk'
  | 'deleteDeviceThunk'
  | 'restoreDeviceThunk';

export type DriverLoadingActions = 'getDriversThunk';

export type EventTypeLoadingActions =
  | 'getEventTypesThunk'
  | 'getEventTypeByIdThunk'
  | 'createEventTypeThunk'
  | 'updateEventTypeThunk'
  | 'deleteEventTypeThunk'
  | 'restoreEventTypeThunk';

export type ShiftLoadingActions =
  | 'getShiftsThunk'
  | 'getShiftByIdThunk'
  | 'createShiftThunk'
  | 'updateShiftThunk'
  | 'deleteShiftThunk'
  | 'restoreShiftThunk';

export type EventLoadingActions =
  | 'getEventsThunk'
  | 'getEventByIdThunk'
  | 'createEventThunk'
  | 'updateEventThunk'
  | 'deleteEventThunk'
  | 'restoreEventThunk';

export type FileLoadingActions =
  | 'getFilesThunk'
  | 'getFileByIdThunk'
  | 'uploadFileThunk'
  | 'deleteFileThunk'
  | 'restoreFileThunk';

export type MapLoadingActions =
  | 'getMapsThunk'
  | 'getMapByIdThunk'
  | 'createMapThunk'
  | 'deleteMapThunk'
  | 'restoreMapThunk'
  | 'addDeviceToMapThunk'
  | 'removeDeviceFromMapThunk';

export type DeviceMonitoringLoadingActions =
  | 'getDeviceMonitoringThunk'
  | 'getLastStatusThunk'
  | 'getLastStatusByIdThunk'
  | 'getUptimeThunk';

export type DeviceStatusLoadingActions = 'getDeviceStatusesThunk';

export type DeviceTypeLoadingActions = 'getDeviceTypesThunk';

export type DeviceVendorLoadingActions =
  | 'getDeviceVendorsThunk'
  | 'getDeviceVendorByIdThunk'
  | 'createDeviceVendorThunk'
  | 'updateDeviceVendorThunk'
  | 'deleteDeviceVendorThunk'
  | 'restoreDeviceVendorThunk';

export type GroupLoadingActions =
  | 'getGroupsThunk'
  | 'getGroupByIdThunk'
  | 'createGroupThunk'
  | 'updateGroupThunk'
  | 'deleteGroupThunk'
  | 'restoreGroupThunk';

export type PlaceLoadingActions =
  | 'getPlacesThunk'
  | 'getPlaceByIdThunk'
  | 'createPlaceThunk'
  | 'updatePlaceThunk'
  | 'deletePlaceThunk'
  | 'restorePlaceThunk';

// Union type for all loading actions
export type AllLoadingActions =
  | AuthLoadingActions
  | UserLoadingActions
  | RoleLoadingActions
  | PermissionLoadingActions
  | ConnectionTypeLoadingActions
  | DeviceModelLoadingActions
  | DeviceFirmwareLoadingActions
  | DeviceLoadingActions
  | DriverLoadingActions
  | EventTypeLoadingActions
  | ShiftLoadingActions
  | EventLoadingActions
  | FileLoadingActions
  | MapLoadingActions
  | DeviceMonitoringLoadingActions
  | DeviceStatusLoadingActions
  | DeviceTypeLoadingActions
  | DeviceVendorLoadingActions
  | GroupLoadingActions
  | PlaceLoadingActions;

// Loading state for each slice
export interface AuthLoadingState {
  loginThunk: boolean;
  getCurrentUserThunk: boolean;
  logoutThunk: boolean;
}

export interface UserLoadingState {
  getUsersThunk: boolean;
  getUserByIdThunk: boolean;
  createUserThunk: boolean;
  updateUserThunk: boolean;
  deleteUserThunk: boolean;
  restoreUserThunk: boolean;
  hasPermissionToThunk: boolean;
  searchUserByCredentialsThunk: boolean;
}

export interface RoleLoadingState {
  getRolesThunk: boolean;
  getRoleByIdThunk: boolean;
  createRoleThunk: boolean;
  updateRoleThunk: boolean;
  deleteRoleThunk: boolean;
  restoreRoleThunk: boolean;
}

export interface PermissionLoadingState {
  getPermissionsThunk: boolean;
}

export interface DeviceModelLoadingState {
  getDeviceModelsThunk: boolean;
  getDeviceModelByIdThunk: boolean;
  createDeviceModelThunk: boolean;
  updateDeviceModelThunk: boolean;
  deleteDeviceModelThunk: boolean;
  restoreDeviceModelThunk: boolean;
}

export interface DeviceFirmwareLoadingState {
  getDeviceFirmwaresThunk: boolean;
  getDeviceFirmwareByIdThunk: boolean;
  createDeviceFirmwareThunk: boolean;
  updateDeviceFirmwareThunk: boolean;
  deleteDeviceFirmwareThunk: boolean;
  restoreDeviceFirmwareThunk: boolean;
}

export interface DeviceLoadingState {
  getDevicesThunk: boolean;
  getDeviceByIdThunk: boolean;
  createDeviceThunk: boolean;
  updateDeviceThunk: boolean;
  deleteDeviceThunk: boolean;
  restoreDeviceThunk: boolean;
}

export interface ConnectionTypeLoadingState {
  getConnectionTypesThunk: boolean;
}

export interface DriverLoadingState {
  getDriversThunk: boolean;
}

export interface EventTypeLoadingState {
  getEventTypesThunk: boolean;
  getEventTypeByIdThunk: boolean;
  createEventTypeThunk: boolean;
  updateEventTypeThunk: boolean;
  deleteEventTypeThunk: boolean;
  restoreEventTypeThunk: boolean;
}

export interface ShiftLoadingState {
  getShiftsThunk: boolean;
  getShiftByIdThunk: boolean;
  createShiftThunk: boolean;
  updateShiftThunk: boolean;
  deleteShiftThunk: boolean;
  restoreShiftThunk: boolean;
}

export interface EventLoadingState {
  getEventsThunk: boolean;
  getEventByIdThunk: boolean;
  createEventThunk: boolean;
  updateEventThunk: boolean;
  deleteEventThunk: boolean;
  restoreEventThunk: boolean;
}

export interface FileLoadingState {
  getFilesThunk: boolean;
  getFileByIdThunk: boolean;
  uploadFileThunk: boolean;
  deleteFileThunk: boolean;
  restoreFileThunk: boolean;
}

export interface MapLoadingState {
  getMapsThunk: boolean;
  getMapByIdThunk: boolean;
  createMapThunk: boolean;
  deleteMapThunk: boolean;
  restoreMapThunk: boolean;
  addDeviceToMapThunk: boolean;
  removeDeviceFromMapThunk: boolean;
}

export interface DeviceMonitoringLoadingState {
  getDeviceMonitoringThunk: boolean;
  getLastStatusThunk: boolean;
  getLastStatusByIdThunk: boolean;
  getUptimeThunk: boolean;
}

export interface DeviceStatusLoadingState {
  getDeviceStatusesThunk: boolean;
}

export interface DeviceTypeLoadingState {
  getDeviceTypesThunk: boolean;
}

export interface DeviceVendorLoadingState {
  getDeviceVendorsThunk: boolean;
  getDeviceVendorByIdThunk: boolean;
  createDeviceVendorThunk: boolean;
  updateDeviceVendorThunk: boolean;
  deleteDeviceVendorThunk: boolean;
  restoreDeviceVendorThunk: boolean;
}

export interface GroupLoadingState {
  getGroupsThunk: boolean;
  getGroupByIdThunk: boolean;
  createGroupThunk: boolean;
  updateGroupThunk: boolean;
  deleteGroupThunk: boolean;
  restoreGroupThunk: boolean;
}

export interface PlaceLoadingState {
  getPlacesThunk: boolean;
  getPlaceByIdThunk: boolean;
  createPlaceThunk: boolean;
  updatePlaceThunk: boolean;
  deletePlaceThunk: boolean;
  restorePlaceThunk: boolean;
}
