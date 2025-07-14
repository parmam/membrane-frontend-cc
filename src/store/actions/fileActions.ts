// src/store/actions/fileActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';

import { FileService } from '../../api/services';
import type {
  FileEntity,
  FileQueryParams,
  PaginatedResponse,
  ThunkApiConfig,
} from '../types/ApiTypes';
import { parseError } from '../types/ErrorTypes';

// =======================
// GET FILES (PAGINATED)
// =======================

export const getFilesThunk = createAsyncThunk<
  PaginatedResponse<FileEntity>,
  FileQueryParams | undefined,
  ThunkApiConfig
>('files/getFilesThunk', async (params, { rejectWithValue }) => {
  try {
    const response = await FileService.getFiles(params);
    return response as unknown as PaginatedResponse<FileEntity>;
  } catch (error) {
    return rejectWithValue(parseError(error));
  }
});

// =======================
// GET FILE BY ID
// =======================

export const getFileByIdThunk = createAsyncThunk<FileEntity, string, ThunkApiConfig>(
  'files/getFileByIdThunk',
  async (id, { rejectWithValue }) => {
    try {
      const response = await FileService.getFileById(id);
      return response as unknown as FileEntity;
    } catch (error) {
      return rejectWithValue(parseError(error));
    }
  },
);

// =======================
// UPLOAD FILE
// =======================

export const uploadFileThunk = createAsyncThunk<FileEntity[], File[], ThunkApiConfig>(
  'files/uploadFileThunk',
  async (files, { rejectWithValue }) => {
    try {
      const response = await FileService.uploadFile(files);
      return response as unknown as FileEntity[];
    } catch (error) {
      return rejectWithValue(parseError(error));
    }
  },
);

// =======================
// DELETE FILE
// =======================

export const deleteFileThunk = createAsyncThunk<string, string, ThunkApiConfig>(
  'files/deleteFileThunk',
  async (id, { rejectWithValue }) => {
    try {
      await FileService.deleteFile(id);
      return id;
    } catch (error) {
      return rejectWithValue(parseError(error));
    }
  },
);

// =======================
// RESTORE FILE
// =======================

export const restoreFileThunk = createAsyncThunk<FileEntity, string, ThunkApiConfig>(
  'files/restoreFileThunk',
  async (id, { rejectWithValue }) => {
    try {
      const response = await FileService.restoreFile(id);
      return response as unknown as FileEntity;
    } catch (error) {
      return rejectWithValue(parseError(error));
    }
  },
);
