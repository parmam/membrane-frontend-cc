// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';

import authReducer from './reducers/authSlice';
import connectionTypeReducer from './reducers/connectionTypeSlice';
import deviceModelReducer from './reducers/deviceModelSlice';
import deviceTypeReducer from './reducers/deviceTypeSlice';
import deviceVendorReducer from './reducers/deviceVendorSlice';
import groupReducer from './reducers/groupSlice';
import mapReducer from './reducers/mapSlice';
import permissionsReducer from './reducers/permissionsSlice';
import placeReducer from './reducers/placeSlice';
import rolesReducer from './reducers/rolesSlice';
import usersReducer from './reducers/usersSlice';

// We will import rootReducer from a reducers file or combine reducers here later

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    roles: rolesReducer,
    permissions: permissionsReducer,
    groups: groupReducer,
    places: placeReducer,
    maps: mapReducer,
    connectionTypes: connectionTypeReducer,
    deviceTypes: deviceTypeReducer,
    deviceVendors: deviceVendorReducer,
    deviceModels: deviceModelReducer,
    // Add other reducers here as they are created
  },
  // Middleware is automatically added by configureStore, including thunk.
  // You can add more middleware here if needed.
  // devTools: process.env.NODE_ENV !== 'production', // Enabled by default in dev mode
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
