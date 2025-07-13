// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';

// Reducers
import authReducer from './reducers/authSlice';
import connectionTypeReducer from './reducers/connectionTypeSlice';
import deviceFirmwareReducer from './reducers/deviceFirmwareSlice';
import deviceModelReducer from './reducers/deviceModelSlice';
import deviceMonitoringReducer from './reducers/deviceMonitoringSlice';
import deviceReducer from './reducers/deviceSlice';
import deviceStatusReducer from './reducers/deviceStatusSlice';
import deviceTypeReducer from './reducers/deviceTypeSlice';
import deviceVendorReducer from './reducers/deviceVendorSlice';
import driverReducer from './reducers/driverSlice';
import eventReducer from './reducers/eventSlice';
import eventTypeReducer from './reducers/eventTypeSlice';
import fileReducer from './reducers/fileSlice';
import groupReducer from './reducers/groupSlice';
import mapReducer from './reducers/mapSlice';
import permissionReducer from './reducers/permissionSlice';
import placeReducer from './reducers/placeSlice';
import roleReducer from './reducers/roleSlice';
import shiftReducer from './reducers/shiftSlice';
import userReducer from './reducers/userSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    roles: roleReducer,
    permissions: permissionReducer,
    deviceModels: deviceModelReducer,
    devices: deviceReducer,
    connectionTypes: connectionTypeReducer,
    groups: groupReducer,
    deviceFirmwares: deviceFirmwareReducer,
    drivers: driverReducer,
    eventTypes: eventTypeReducer,
    shifts: shiftReducer,
    events: eventReducer,
    files: fileReducer,
    maps: mapReducer,
    places: placeReducer,
    deviceVendors: deviceVendorReducer,
    deviceTypes: deviceTypeReducer,
    deviceStatus: deviceStatusReducer,
    deviceMonitoring: deviceMonitoringReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
