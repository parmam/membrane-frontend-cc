// src/store/reducers/groupSlice.ts
// Assuming GroupDto and GroupListItemDto might be the same or similar for this entity
import { GroupDto } from '@/services/group/Group.types';
import { Group as GroupModel } from '@/services/group/convertToGroup';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// Renamed to avoid conflict

export interface GroupState {
  list: GroupModel[];
  selectedGroup: GroupModel | null;
  isLoading: boolean;
  error: string | null;
  totalGroups: number;
  currentPage: number;
  pageSize: number;
}

const initialState: GroupState = {
  list: [],
  selectedGroup: null,
  isLoading: false,
  error: null,
  totalGroups: 0,
  currentPage: 1,
  pageSize: 10,
};

const groupSlice = createSlice({
  name: 'groups', // Changed from 'group' to 'groups' for plurality, common convention
  initialState,
  reducers: {
    groupRequestStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    groupRequestFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    listGroupsSuccess: (
      state,
      action: PayloadAction<{
        groups: GroupModel[];
        total: number;
        page: number;
        pageSize: number;
      }>,
    ) => {
      state.isLoading = false;
      state.list = action.payload.groups;
      state.totalGroups = action.payload.total;
      state.currentPage = action.payload.page;
      state.pageSize = action.payload.pageSize;
      state.error = null;
    },
    getGroupSuccess: (state, action: PayloadAction<GroupModel>) => {
      state.isLoading = false;
      state.selectedGroup = action.payload;
      state.error = null;
    },
    createGroupSuccess: (state, action: PayloadAction<GroupModel>) => {
      state.isLoading = false;
      state.selectedGroup = action.payload; // Or add to list, then refetch/invalidate
      state.error = null;
    },
    updateGroupSuccess: (state, action: PayloadAction<GroupModel>) => {
      state.isLoading = false;
      state.selectedGroup = action.payload;
      state.list = state.list.map((group) =>
        group.id === action.payload.id ? { ...group, ...action.payload } : group,
      );
      state.error = null;
    },
    deleteGroupSuccess: (state, action: PayloadAction<string /* groupId */>) => {
      state.isLoading = false;
      state.list = state.list.filter((group) => group.id !== action.payload);
      if (state.selectedGroup?.id === action.payload) {
        state.selectedGroup = null;
      }
      state.error = null;
    },
  },
});

export const {
  groupRequestStart,
  groupRequestFailure,
  listGroupsSuccess,
  getGroupSuccess,
  createGroupSuccess,
  updateGroupSuccess,
  deleteGroupSuccess,
} = groupSlice.actions;

export default groupSlice.reducer;
