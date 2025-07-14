// src/store/actions/connectionTypeActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';

import { ConnectionTypeService } from '../../api/services';
import type { ConnectionType, ConnectionTypeQueryParams, ThunkApiConfig } from '../types/ApiTypes';
import { parseError } from '../types/ErrorTypes';

// ========================
// GET CONNECTION TYPES
// ========================

export const getConnectionTypesThunk = createAsyncThunk<
  ConnectionType[],
  ConnectionTypeQueryParams | undefined,
  ThunkApiConfig
>('connectionTypes/getConnectionTypesThunk', async (params, { rejectWithValue }) => {
  try {
    const response = await ConnectionTypeService.getConnectionTypes(params);
    return response as unknown as ConnectionType[];
  } catch (error) {
    return rejectWithValue(parseError(error));
  }
});
