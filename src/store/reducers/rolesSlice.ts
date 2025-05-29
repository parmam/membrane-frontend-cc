// src/store/reducers/rolesSlice.ts
import { RoleDetailsDto, RoleListItemDto } from '@/services/roles/Roles.types';
import { RoleListModel, RoleModel } from '@/services/roles/convertToRole';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface RolesState {
  list: RoleListModel[];
  selectedRole: RoleModel | null;
  isLoading: boolean;
  error: string | null;
  totalRoles: number;
  currentPage: number;
  pageSize: number;
}

const initialState: RolesState = {
  list: [],
  selectedRole: null,
  isLoading: false,
  error: null,
  totalRoles: 0,
  currentPage: 1,
  pageSize: 10, // Default page size
};

const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    rolesRequestStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    rolesRequestFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    listRolesSuccess: (
      state,
      action: PayloadAction<{
        roles: RoleListModel[];
        total: number;
        page: number;
        pageSize: number;
      }>,
    ) => {
      state.isLoading = false;
      state.list = action.payload.roles;
      state.totalRoles = action.payload.total;
      state.currentPage = action.payload.page;
      state.pageSize = action.payload.pageSize;
      state.error = null;
    },
    getRoleSuccess: (state, action: PayloadAction<RoleModel>) => {
      state.isLoading = false;
      state.selectedRole = action.payload;
      state.error = null;
    },
    createRoleSuccess: (state, action: PayloadAction<RoleModel>) => {
      state.isLoading = false;
      // state.list.unshift(action.payload); // Or refetch
      state.selectedRole = action.payload;
      state.error = null;
    },
    updateRoleSuccess: (state, action: PayloadAction<RoleModel>) => {
      state.isLoading = false;
      state.selectedRole = action.payload;
      state.list = state.list.map((role) =>
        role.id === action.payload.id ? { ...role, ...action.payload } : role,
      );
      state.error = null;
    },
    deleteRoleSuccess: (state, action: PayloadAction<string /* roleId */>) => {
      state.isLoading = false;
      state.list = state.list.filter((role) => role.id !== action.payload);
      if (state.selectedRole?.id === action.payload) {
        state.selectedRole = null;
      }
      state.error = null;
    },
  },
});

export const {
  rolesRequestStart,
  rolesRequestFailure,
  listRolesSuccess,
  getRoleSuccess,
  createRoleSuccess,
  updateRoleSuccess,
  deleteRoleSuccess,
} = rolesSlice.actions;

export default rolesSlice.reducer;
