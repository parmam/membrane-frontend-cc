// src/store/types/UserTypes.ts
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { RootState } from '../index';
import {
  CreateUserRequest,
  HasPermissionRequest,
  PaginatedResponse,
  SearchUserByCredentialsRequest,
  UpdateUserRequest,
  User,
  UserQueryParams,
} from '../types/ApiTypes';
import { AppErrorDto } from './ErrorTypes';

export enum UserStatus {
  Initial = 'INITIAL',
  Fetching = 'FETCHING',
  Creating = 'CREATING',
  Updating = 'UPDATING',
  Deleting = 'DELETING',
  Restoring = 'RESTORING',
  CheckingPermission = 'CHECKING_PERMISSION',
  Searching = 'SEARCHING',
  Success = 'SUCCESS',
  Failed = 'FAILED',
}

export interface UserState {
  users: User[];
  selectedUser: User | null;
  total: number;
  currentPage: number;
  pageSize: number;
  hasPermission: boolean;
  status: UserStatus;
  error: AppErrorDto | null;
}

export const initialUserState: UserState = {
  users: [],
  selectedUser: null,
  total: 0,
  currentPage: 1,
  pageSize: 10,
  hasPermission: false,
  status: UserStatus.Initial,
  error: null,
};

export const USER_GET_USERS_START = 'users/getUsers/start';
export const USER_GET_USERS_SUCCESS = 'users/getUsers/success';
export const USER_GET_USERS_FAILED = 'users/getUsers/failed';

export const USER_GET_USER_BY_ID_START = 'users/getUserById/start';
export const USER_GET_USER_BY_ID_SUCCESS = 'users/getUserById/success';
export const USER_GET_USER_BY_ID_FAILED = 'users/getUserById/failed';

export const USER_CREATE_START = 'users/create/start';
export const USER_CREATE_SUCCESS = 'users/create/success';
export const USER_CREATE_FAILED = 'users/create/failed';

export const USER_UPDATE_START = 'users/update/start';
export const USER_UPDATE_SUCCESS = 'users/update/success';
export const USER_UPDATE_FAILED = 'users/update/failed';

export const USER_DELETE_START = 'users/delete/start';
export const USER_DELETE_SUCCESS = 'users/delete/success';
export const USER_DELETE_FAILED = 'users/delete/failed';

export const USER_RESTORE_START = 'users/restore/start';
export const USER_RESTORE_SUCCESS = 'users/restore/success';
export const USER_RESTORE_FAILED = 'users/restore/failed';

export const USER_HAS_PERMISSION_START = 'users/hasPermission/start';
export const USER_HAS_PERMISSION_SUCCESS = 'users/hasPermission/success';
export const USER_HAS_PERMISSION_FAILED = 'users/hasPermission/failed';

export const USER_SEARCH_BY_CREDENTIALS_START = 'users/searchByCredentials/start';
export const USER_SEARCH_BY_CREDENTIALS_SUCCESS = 'users/searchByCredentials/success';
export const USER_SEARCH_BY_CREDENTIALS_FAILED = 'users/searchByCredentials/failed';

export const USER_CLEAR_ERROR = 'users/clearError';

export type UserAction =
  | Action<typeof USER_GET_USERS_START>
  | { type: typeof USER_GET_USERS_SUCCESS; payload: { response: PaginatedResponse<User> } }
  | { type: typeof USER_GET_USERS_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof USER_GET_USER_BY_ID_START>
  | { type: typeof USER_GET_USER_BY_ID_SUCCESS; payload: { user: User } }
  | { type: typeof USER_GET_USER_BY_ID_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof USER_CREATE_START>
  | { type: typeof USER_CREATE_SUCCESS; payload: { user: User } }
  | { type: typeof USER_CREATE_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof USER_UPDATE_START>
  | { type: typeof USER_UPDATE_SUCCESS; payload: { user: User } }
  | { type: typeof USER_UPDATE_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof USER_DELETE_START>
  | { type: typeof USER_DELETE_SUCCESS; payload: { id: string } }
  | { type: typeof USER_DELETE_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof USER_RESTORE_START>
  | { type: typeof USER_RESTORE_SUCCESS; payload: { user: User } }
  | { type: typeof USER_RESTORE_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof USER_HAS_PERMISSION_START>
  | { type: typeof USER_HAS_PERMISSION_SUCCESS; payload: { hasPermission: boolean } }
  | { type: typeof USER_HAS_PERMISSION_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof USER_SEARCH_BY_CREDENTIALS_START>
  | { type: typeof USER_SEARCH_BY_CREDENTIALS_SUCCESS; payload: { user: User } }
  | { type: typeof USER_SEARCH_BY_CREDENTIALS_FAILED; payload: { error: AppErrorDto } }
  | Action<typeof USER_CLEAR_ERROR>;

export type UserThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, UserAction>;
