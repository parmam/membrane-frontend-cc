// src/store/reducers/userReducer.ts
import { Reducer } from 'redux';

import { UserAction, UserState, UserStatus, initialUserState } from '../types/UserTypes';

export const userReducer: Reducer<UserState, UserAction> = (state = initialUserState, action) => {
  switch (action.type) {
    case USER_GET_USERS_START:
      return { ...state, status: UserStatus.Fetching, error: null };
    case USER_GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload.response.data,
        total: action.payload.response.total,
        currentPage: action.payload.response.offset / action.payload.response.limit + 1,
        pageSize: action.payload.response.limit,
        status: UserStatus.Success,
      };
    case USER_GET_USERS_FAILED:
      return { ...state, status: UserStatus.Failed, error: action.payload.error };

    case USER_GET_USER_BY_ID_START:
      return { ...state, status: UserStatus.Fetching, error: null };
    case USER_GET_USER_BY_ID_SUCCESS:
      return { ...state, selectedUser: action.payload.user, status: UserStatus.Success };
    case USER_GET_USER_BY_ID_FAILED:
      return { ...state, status: UserStatus.Failed, error: action.payload.error };

    case USER_CREATE_START:
      return { ...state, status: UserStatus.Creating, error: null };
    case USER_CREATE_SUCCESS:
      return {
        ...state,
        users: [action.payload.user, ...state.users],
        total: state.total + 1,
        status: UserStatus.Success,
      };
    case USER_CREATE_FAILED:
      return { ...state, status: UserStatus.Failed, error: action.payload.error };

    case USER_UPDATE_START:
      return { ...state, status: UserStatus.Updating, error: null };
    case USER_UPDATE_SUCCESS:
      const updatedUsers = state.users.map((u) =>
        u.id === action.payload.user.id ? action.payload.user : u,
      );
      return {
        ...state,
        users: updatedUsers,
        selectedUser: action.payload.user,
        status: UserStatus.Success,
      };
    case USER_UPDATE_FAILED:
      return { ...state, status: UserStatus.Failed, error: action.payload.error };

    case USER_DELETE_START:
      return { ...state, status: UserStatus.Deleting, error: null };
    case USER_DELETE_SUCCESS:
      const filteredUsers = state.users.filter((u) => u.id !== action.payload.id);
      return {
        ...state,
        users: filteredUsers,
        total: state.total - 1,
        status: UserStatus.Success,
      };
    case USER_DELETE_FAILED:
      return { ...state, status: UserStatus.Failed, error: action.payload.error };

    case USER_RESTORE_START:
      return { ...state, status: UserStatus.Restoring, error: null };
    case USER_RESTORE_SUCCESS:
      return {
        ...state,
        users: [action.payload.user, ...state.users],
        total: state.total + 1,
        status: UserStatus.Success,
      };
    case USER_RESTORE_FAILED:
      return { ...state, status: UserStatus.Failed, error: action.payload.error };

    case USER_HAS_PERMISSION_START:
      return { ...state, status: UserStatus.CheckingPermission, error: null };
    case USER_HAS_PERMISSION_SUCCESS:
      return { ...state, hasPermission: action.payload.hasPermission, status: UserStatus.Success };
    case USER_HAS_PERMISSION_FAILED:
      return { ...state, status: UserStatus.Failed, error: action.payload.error };

    case USER_SEARCH_BY_CREDENTIALS_START:
      return { ...state, status: UserStatus.Searching, error: null };
    case USER_SEARCH_BY_CREDENTIALS_SUCCESS:
      return { ...state, selectedUser: action.payload.user, status: UserStatus.Success };
    case USER_SEARCH_BY_CREDENTIALS_FAILED:
      return { ...state, status: UserStatus.Failed, error: action.payload.error };

    case USER_CLEAR_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};
