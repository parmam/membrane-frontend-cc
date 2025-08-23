// src/store/actions/userActions.ts
import { UserService } from '../../api/services/userService';
import {
  CreateUserRequest,
  HasPermissionRequest,
  PaginatedResponse,
  SearchUserByCredentialsRequest,
  UpdateUserRequest,
  User,
  UserQueryParams,
} from '../types/ApiTypes';
import { parseError } from '../types/ErrorTypes';
import { AppErrorDto } from '../types/ErrorTypes';
import {
  USER_CLEAR_ERROR,
  USER_CREATE_FAILED,
  USER_CREATE_START,
  USER_CREATE_SUCCESS,
  USER_DELETE_FAILED,
  USER_DELETE_START,
  USER_DELETE_SUCCESS,
  USER_GET_USERS_FAILED,
  USER_GET_USERS_START,
  USER_GET_USERS_SUCCESS,
  USER_GET_USER_BY_ID_FAILED,
  USER_GET_USER_BY_ID_START,
  USER_GET_USER_BY_ID_SUCCESS,
  USER_HAS_PERMISSION_FAILED,
  USER_HAS_PERMISSION_START,
  USER_HAS_PERMISSION_SUCCESS,
  USER_RESTORE_FAILED,
  USER_RESTORE_START,
  USER_RESTORE_SUCCESS,
  USER_SEARCH_BY_CREDENTIALS_FAILED,
  USER_SEARCH_BY_CREDENTIALS_START,
  USER_SEARCH_BY_CREDENTIALS_SUCCESS,
  USER_UPDATE_FAILED,
  USER_UPDATE_START,
  USER_UPDATE_SUCCESS,
  UserAction,
  UserThunk,
} from '../types/UserTypes';

// Action Creators
export const getUsersStart = (): UserAction => ({ type: USER_GET_USERS_START });
export const getUsersSuccess = (response: PaginatedResponse<User>): UserAction => ({
  type: USER_GET_USERS_SUCCESS,
  payload: { response },
});
export const getUsersFailed = (error: AppErrorDto): UserAction => ({
  type: USER_GET_USERS_FAILED,
  payload: { error },
});

export const getUserByIdStart = (): UserAction => ({ type: USER_GET_USER_BY_ID_START });
export const getUserByIdSuccess = (user: User): UserAction => ({
  type: USER_GET_USER_BY_ID_SUCCESS,
  payload: { user },
});
export const getUserByIdFailed = (error: AppErrorDto): UserAction => ({
  type: USER_GET_USER_BY_ID_FAILED,
  payload: { error },
});

export const createUserStart = (): UserAction => ({ type: USER_CREATE_START });
export const createUserSuccess = (user: User): UserAction => ({
  type: USER_CREATE_SUCCESS,
  payload: { user },
});
export const createUserFailed = (error: AppErrorDto): UserAction => ({
  type: USER_CREATE_FAILED,
  payload: { error },
});

export const updateUserStart = (): UserAction => ({ type: USER_UPDATE_START });
export const updateUserSuccess = (user: User): UserAction => ({
  type: USER_UPDATE_SUCCESS,
  payload: { user },
});
export const updateUserFailed = (error: AppErrorDto): UserAction => ({
  type: USER_UPDATE_FAILED,
  payload: { error },
});

export const deleteUserStart = (): UserAction => ({ type: USER_DELETE_START });
export const deleteUserSuccess = (id: string): UserAction => ({
  type: USER_DELETE_SUCCESS,
  payload: { id },
});
export const deleteUserFailed = (error: AppErrorDto): UserAction => ({
  type: USER_DELETE_FAILED,
  payload: { error },
});

export const restoreUserStart = (): UserAction => ({ type: USER_RESTORE_START });
export const restoreUserSuccess = (user: User): UserAction => ({
  type: USER_RESTORE_SUCCESS,
  payload: { user },
});
export const restoreUserFailed = (error: AppErrorDto): UserAction => ({
  type: USER_RESTORE_FAILED,
  payload: { error },
});

export const hasPermissionStart = (): UserAction => ({ type: USER_HAS_PERMISSION_START });
export const hasPermissionSuccess = (hasPermission: boolean): UserAction => ({
  type: USER_HAS_PERMISSION_SUCCESS,
  payload: { hasPermission },
});
export const hasPermissionFailed = (error: AppErrorDto): UserAction => ({
  type: USER_HAS_PERMISSION_FAILED,
  payload: { error },
});

export const searchByCredentialsStart = (): UserAction => ({
  type: USER_SEARCH_BY_CREDENTIALS_START,
});
export const searchByCredentialsSuccess = (user: User): UserAction => ({
  type: USER_SEARCH_BY_CREDENTIALS_SUCCESS,
  payload: { user },
});
export const searchByCredentialsFailed = (error: AppErrorDto): UserAction => ({
  type: USER_SEARCH_BY_CREDENTIALS_FAILED,
  payload: { error },
});

export const clearUserError = (): UserAction => ({ type: USER_CLEAR_ERROR });

// Thunks
export const getUsersThunk =
  (params?: UserQueryParams): UserThunk =>
  async (dispatch) => {
    dispatch(getUsersStart());
    try {
      const response = await UserService.getUsers(params);
      dispatch(getUsersSuccess(response));
    } catch (error) {
      dispatch(getUsersFailed(parseError(error)));
    }
  };

export const getUserByIdThunk =
  (id: string): UserThunk =>
  async (dispatch) => {
    dispatch(getUserByIdStart());
    try {
      const user = await UserService.getUserById(id);
      dispatch(getUserByIdSuccess(user));
    } catch (error) {
      dispatch(getUserByIdFailed(parseError(error)));
    }
  };

export const createUserThunk =
  (userData: CreateUserRequest): UserThunk =>
  async (dispatch) => {
    dispatch(createUserStart());
    try {
      const user = await UserService.createUser(userData);
      dispatch(createUserSuccess(user));
    } catch (error) {
      dispatch(createUserFailed(parseError(error)));
    }
  };

export const updateUserThunk =
  (id: string, userData: UpdateUserRequest): UserThunk =>
  async (dispatch) => {
    dispatch(updateUserStart());
    try {
      const user = await UserService.updateUser(id, userData);
      dispatch(updateUserSuccess(user));
    } catch (error) {
      dispatch(updateUserFailed(parseError(error)));
    }
  };

export const deleteUserThunk =
  (id: string): UserThunk =>
  async (dispatch) => {
    dispatch(deleteUserStart());
    try {
      await UserService.deleteUser(id);
      dispatch(deleteUserSuccess(id));
    } catch (error) {
      dispatch(deleteUserFailed(parseError(error)));
    }
  };

export const restoreUserThunk =
  (id: string): UserThunk =>
  async (dispatch) => {
    dispatch(restoreUserStart());
    try {
      const user = await UserService.restoreUser(id);
      dispatch(restoreUserSuccess(user));
    } catch (error) {
      dispatch(restoreUserFailed(parseError(error)));
    }
  };

export const hasPermissionToThunk =
  (id: string, permissionData: HasPermissionRequest): UserThunk =>
  async (dispatch) => {
    dispatch(hasPermissionStart());
    try {
      const hasPermission = await UserService.hasPermissionTo(id, permissionData);
      dispatch(hasPermissionSuccess(hasPermission));
    } catch (error) {
      dispatch(hasPermissionFailed(parseError(error)));
    }
  };

export const searchUserByCredentialsThunk =
  (credentials: SearchUserByCredentialsRequest): UserThunk =>
  async (dispatch) => {
    dispatch(searchByCredentialsStart());
    try {
      const user = await UserService.searchUserByCredentials(credentials);
      dispatch(searchByCredentialsSuccess(user));
    } catch (error) {
      dispatch(searchByCredentialsFailed(parseError(error)));
    }
  };
