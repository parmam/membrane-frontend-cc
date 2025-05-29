// src/store/reducers/mapSlice.ts
import { DeviceOnMapDto, MapDetailsDto, MapListItemDto } from '@/services/map/Map.types';
import { DeviceOnMapModel, MapListModel, MapModel } from '@/services/map/convertToMap';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface MapState {
  list: MapListModel[];
  selectedMap: MapModel | null;
  isLoading: boolean;
  error: string | null;
  totalMaps: number;
  currentPage: number;
  pageSize: number;
}

const initialState: MapState = {
  list: [],
  selectedMap: null,
  isLoading: false,
  error: null,
  totalMaps: 0,
  currentPage: 1,
  pageSize: 10,
};

const mapSlice = createSlice({
  name: 'maps', // Plural name for the slice
  initialState,
  reducers: {
    mapRequestStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    mapRequestFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    listMapsSuccess: (
      state,
      action: PayloadAction<{
        maps: MapListModel[];
        total: number;
        page: number;
        pageSize: number;
      }>,
    ) => {
      state.isLoading = false;
      state.list = action.payload.maps;
      state.totalMaps = action.payload.total;
      state.currentPage = action.payload.page;
      state.pageSize = action.payload.pageSize;
      state.error = null;
    },
    getMapSuccess: (state, action: PayloadAction<MapModel>) => {
      state.isLoading = false;
      state.selectedMap = action.payload;
      state.error = null;
    },
    createMapSuccess: (state, action: PayloadAction<MapModel>) => {
      state.isLoading = false;
      state.selectedMap = action.payload; // Or add to list, then refetch/invalidate
      state.error = null;
    },
    updateMapSuccess: (state, action: PayloadAction<MapModel>) => {
      // Assuming update returns the full map
      state.isLoading = false;
      state.selectedMap = action.payload;
      state.list = state.list.map(
        (map) => (map.id === action.payload.id ? { ...map, ...action.payload } : map), // Basic update in list
      );
      state.error = null;
    },
    deleteMapSuccess: (state, action: PayloadAction<string /* mapId */>) => {
      state.isLoading = false;
      state.list = state.list.filter((map) => map.id !== action.payload);
      if (state.selectedMap?.id === action.payload) {
        state.selectedMap = null;
      }
      state.error = null;
    },
    addDeviceToMapSuccess: (
      state,
      action: PayloadAction<{ mapId: string; deviceOnMap: DeviceOnMapModel }>,
    ) => {
      state.isLoading = false;
      if (state.selectedMap && state.selectedMap.id === action.payload.mapId) {
        state.selectedMap.devices.push(action.payload.deviceOnMap);
      }
      // Optionally update the list if it contains detailed device info
      state.error = null;
    },
    removeDeviceFromMapSuccess: (
      state,
      action: PayloadAction<{ mapId: string; deviceMapId: string }>,
    ) => {
      state.isLoading = false;
      if (state.selectedMap && state.selectedMap.id === action.payload.mapId) {
        state.selectedMap.devices = state.selectedMap.devices.filter(
          (device) => device.id !== action.payload.deviceMapId,
        );
      }
      // Optionally update the list
      state.error = null;
    },
  },
});

export const {
  mapRequestStart,
  mapRequestFailure,
  listMapsSuccess,
  getMapSuccess,
  createMapSuccess,
  updateMapSuccess,
  deleteMapSuccess,
  addDeviceToMapSuccess,
  removeDeviceFromMapSuccess,
} = mapSlice.actions;

export default mapSlice.reducer;
