// src/store/reducers/groupSlice.ts
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  createGroupThunk,
  deleteGroupThunk,
  getGroupByIdThunk,
  getGroupsThunk,
  restoreGroupThunk,
  updateGroupThunk,
} from '../actions/groupActions';
import type { Group, PaginatedResponse } from '../types/ApiTypes';
import type { GroupLoadingState } from '../types/LoadingTypes';

// =======================
// STATE INTERFACE
// =======================

export interface GroupState {
  // Data
  groups: Group[];
  selectedGroup: Group | null;

  // Pagination
  total: number;
  currentPage: number;
  pageSize: number;

  // Loading states
  loading: GroupLoadingState;

  // Error state
  error: string | null;
}

// =======================
// INITIAL STATE
// =======================

const initialLoadingState: GroupLoadingState = {
  getGroupsThunk: false,
  getGroupByIdThunk: false,
  createGroupThunk: false,
  updateGroupThunk: false,
  deleteGroupThunk: false,
  restoreGroupThunk: false,
};

const initialState: GroupState = {
  groups: [],
  selectedGroup: null,
  total: 0,
  currentPage: 1,
  pageSize: 10,
  loading: initialLoadingState,
  error: null,
};

// =======================
// SLICE
// =======================

const groupSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    clearSelectedGroup: (state) => {
      state.selectedGroup = null;
    },
    clearGroupError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // GET ALL (paginated)
    builder
      .addCase(getGroupsThunk.pending, (state) => {
        state.loading.getGroupsThunk = true;
        state.error = null;
      })
      .addCase(
        getGroupsThunk.fulfilled,
        (state, action: PayloadAction<PaginatedResponse<Group>>) => {
          state.loading.getGroupsThunk = false;
          state.groups = action.payload.data;
          state.total = action.payload.total;
          state.currentPage = action.payload.offset / action.payload.limit + 1;
          state.pageSize = action.payload.limit;
        },
      )
      .addCase(getGroupsThunk.rejected, (state, action) => {
        state.loading.getGroupsThunk = false;
        state.error = (action.payload as string) || 'Failed to fetch groups.';
      });

    // GET BY ID
    builder
      .addCase(getGroupByIdThunk.pending, (state) => {
        state.loading.getGroupByIdThunk = true;
        state.error = null;
      })
      .addCase(getGroupByIdThunk.fulfilled, (state, action: PayloadAction<Group>) => {
        state.loading.getGroupByIdThunk = false;
        state.selectedGroup = action.payload;
      })
      .addCase(getGroupByIdThunk.rejected, (state, action) => {
        state.loading.getGroupByIdThunk = false;
        state.error = (action.payload as string) || 'Failed to fetch group.';
      });

    // CREATE
    builder
      .addCase(createGroupThunk.pending, (state) => {
        state.loading.createGroupThunk = true;
        state.error = null;
      })
      .addCase(createGroupThunk.fulfilled, (state, action: PayloadAction<Group>) => {
        state.loading.createGroupThunk = false;
        state.groups.unshift(action.payload);
        state.total += 1;
      })
      .addCase(createGroupThunk.rejected, (state, action) => {
        state.loading.createGroupThunk = false;
        state.error = (action.payload as string) || 'Failed to create group.';
      });

    // UPDATE
    builder
      .addCase(updateGroupThunk.pending, (state) => {
        state.loading.updateGroupThunk = true;
        state.error = null;
      })
      .addCase(updateGroupThunk.fulfilled, (state, action: PayloadAction<Group>) => {
        state.loading.updateGroupThunk = false;
        const index = state.groups.findIndex((g) => g.id === action.payload.id);
        if (index !== -1) {
          state.groups[index] = action.payload;
        }
        if (state.selectedGroup?.id === action.payload.id) {
          state.selectedGroup = action.payload;
        }
      })
      .addCase(updateGroupThunk.rejected, (state, action) => {
        state.loading.updateGroupThunk = false;
        state.error = (action.payload as string) || 'Failed to update group.';
      });

    // DELETE
    builder
      .addCase(deleteGroupThunk.pending, (state) => {
        state.loading.deleteGroupThunk = true;
        state.error = null;
      })
      .addCase(deleteGroupThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading.deleteGroupThunk = false;
        state.groups = state.groups.filter((g) => g.id !== action.payload);
        state.total -= 1;
      })
      .addCase(deleteGroupThunk.rejected, (state, action) => {
        state.loading.deleteGroupThunk = false;
        state.error = (action.payload as string) || 'Failed to delete group.';
      });

    // RESTORE
    builder
      .addCase(restoreGroupThunk.pending, (state) => {
        state.loading.restoreGroupThunk = true;
        state.error = null;
      })
      .addCase(restoreGroupThunk.fulfilled, (state, action: PayloadAction<Group>) => {
        state.loading.restoreGroupThunk = false;
        // Logic to handle restored item, e.g., refetch or add to list
        const index = state.groups.findIndex((g) => g.id === action.payload.id);
        if (index !== -1) {
          state.groups[index] = action.payload;
        } else {
          state.groups.unshift(action.payload);
          state.total += 1;
        }
      })
      .addCase(restoreGroupThunk.rejected, (state, action) => {
        state.loading.restoreGroupThunk = false;
        state.error = (action.payload as string) || 'Failed to restore group.';
      });
  },
});

// =======================
// EXPORTS
// =======================

// Actions
export const { clearSelectedGroup, clearGroupError } = groupSlice.actions;

// Selectors
export const selectGroups = (state: { groups: GroupState }) => state.groups.groups;
export const selectSelectedGroup = (state: { groups: GroupState }) => state.groups.selectedGroup;
export const selectGroupLoading = (state: { groups: GroupState }) => state.groups.loading;
export const selectGroupError = (state: { groups: GroupState }) => state.groups.error;
export const selectGroupPagination = (state: { groups: GroupState }) => ({
  total: state.groups.total,
  currentPage: state.groups.currentPage,
  pageSize: state.groups.pageSize,
});

// Reducer
export default groupSlice.reducer;
