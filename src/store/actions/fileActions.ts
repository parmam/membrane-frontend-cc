// src/store/actions/newFileActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';

import { FileService } from '../../api/services';
import type {
  FileEntity,
  FileQueryParams,
  PaginatedResponse,
  ThunkApiConfig,
} from '../types/ApiTypes';

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
    const message = error instanceof Error ? error.message : 'Failed to fetch files';
    return rejectWithValue(message);
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
      const message = error instanceof Error ? error.message : 'Failed to fetch file';
      return rejectWithValue(message);
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
      const message = error instanceof Error ? error.message : 'Failed to upload files';
      return rejectWithValue(message);
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
      const message = error instanceof Error ? error.message : 'Failed to delete file';
      return rejectWithValue(message);
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
      const message = error instanceof Error ? error.message : 'Failed to restore file';
      return rejectWithValue(message);
    }
  },
);
