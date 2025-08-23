// src/store/reducers/groupReducer.ts
import { Reducer } from 'redux';

import { Group, PaginatedResponse } from '../types/ApiTypes';
import {
  GROUP_CLEAR_ERROR,
  GROUP_CREATE_FAILED,
  GROUP_CREATE_START,
  GROUP_CREATE_SUCCESS,
  GROUP_DELETE_FAILED,
  GROUP_DELETE_START,
  GROUP_DELETE_SUCCESS,
  GROUP_GET_BY_ID_FAILED,
  GROUP_GET_BY_ID_START,
  GROUP_GET_BY_ID_SUCCESS,
  GROUP_GET_GROUPS_FAILED,
  GROUP_GET_GROUPS_START,
  GROUP_GET_GROUPS_SUCCESS,
  GROUP_RESTORE_FAILED,
  GROUP_RESTORE_START,
  GROUP_RESTORE_SUCCESS,
  GROUP_UPDATE_FAILED,
  GROUP_UPDATE_START,
  GROUP_UPDATE_SUCCESS,
  GroupAction,
  GroupState,
  GroupStatus,
  initialGroupState,
} from '../types/GroupTypes';

export const groupReducer: Reducer<GroupState, GroupAction> = (
  state = initialGroupState,
  action,
) => {
  switch (action.type) {
    case GROUP_GET_GROUPS_START:
      return { ...state, status: GroupStatus.Fetching, error: null };
    case GROUP_GET_GROUPS_SUCCESS:
      return {
        ...state,
        groups: action.payload.response.data,
        total: action.payload.response.total,
        currentPage: action.payload.response.offset / action.payload.response.limit + 1,
        pageSize: action.payload.response.limit,
        status: GroupStatus.Success,
      };
    case GROUP_GET_GROUPS_FAILED:
      return { ...state, status: GroupStatus.Failed, error: action.payload.error };

    case GROUP_GET_BY_ID_START:
      return { ...state, status: GroupStatus.Fetching, error: null };
    case GROUP_GET_BY_ID_SUCCESS:
      return { ...state, selectedGroup: action.payload.group, status: GroupStatus.Success };
    case GROUP_GET_BY_ID_FAILED:
      return { ...state, status: GroupStatus.Failed, error: action.payload.error };

    case GROUP_CREATE_START:
      return { ...state, status: GroupStatus.Creating, error: null };
    case GROUP_CREATE_SUCCESS:
      return {
        ...state,
        groups: [action.payload.group, ...state.groups],
        total: state.total + 1,
        status: GroupStatus.Success,
      };
    case GROUP_CREATE_FAILED:
      return { ...state, status: GroupStatus.Failed, error: action.payload.error };

    case GROUP_UPDATE_START:
      return { ...state, status: GroupStatus.Updating, error: null };
    case GROUP_UPDATE_SUCCESS: {
      const updatedGroups = state.groups.map((g) =>
        g.id === action.payload.group.id ? action.payload.group : g,
      );
      return {
        ...state,
        groups: updatedGroups,
        selectedGroup: action.payload.group,
        status: GroupStatus.Success,
      };
    }
    case GROUP_UPDATE_FAILED:
      return { ...state, status: GroupStatus.Failed, error: action.payload.error };

    case GROUP_DELETE_START:
      return { ...state, status: GroupStatus.Deleting, error: null };
    case GROUP_DELETE_SUCCESS: {
      const filteredGroups = state.groups.filter((g) => g.id !== action.payload.id);
      return {
        ...state,
        groups: filteredGroups,
        total: state.total - 1,
        status: GroupStatus.Success,
      };
    }
    case GROUP_DELETE_FAILED:
      return { ...state, status: GroupStatus.Failed, error: action.payload.error };

    case GROUP_RESTORE_START:
      return { ...state, status: GroupStatus.Restoring, error: null };
    case GROUP_RESTORE_SUCCESS:
      return {
        ...state,
        groups: [action.payload.group, ...state.groups],
        total: state.total + 1,
        status: GroupStatus.Success,
      };
    case GROUP_RESTORE_FAILED:
      return { ...state, status: GroupStatus.Failed, error: action.payload.error };

    case GROUP_CLEAR_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};
