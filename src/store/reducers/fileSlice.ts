// src/store/reducers/fileSlice.ts
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  deleteFileThunk,
  getFileByIdThunk,
  getFilesThunk,
  restoreFileThunk,
  uploadFileThunk,
} from '../actions/fileActions';
import type { FileEntity, PaginatedResponse } from '../types/ApiTypes';
import type { FileLoadingState } from '../types/LoadingTypes';

// =======================
// STATE INTERFACE
// =======================

export interface FileState {
  // Data
  files: FileEntity[];
  selectedFile: FileEntity | null;

  // Pagination
  total: number;
  currentPage: number;
  pageSize: number;

  // Loading states
  loading: FileLoadingState;

  // Error state
  error: string | null;
}

// =======================
// INITIAL STATE
// =======================

const initialLoadingState: FileLoadingState = {
  getFilesThunk: false,
  getFileByIdThunk: false,
  uploadFileThunk: false,
  deleteFileThunk: false,
  restoreFileThunk: false,
};

const initialState: FileState = {
  files: [],
  selectedFile: null,
  total: 0,
  currentPage: 1,
  pageSize: 10,
  loading: initialLoadingState,
  error: null,
};

// =======================
// SLICE
// =======================

const fileSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    clearSelectedFile: (state) => {
      state.selectedFile = null;
    },
    clearFileError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // GET ALL (paginated)
    builder
      .addCase(getFilesThunk.pending, (state) => {
        state.loading.getFilesThunk = true;
        state.error = null;
      })
      .addCase(
        getFilesThunk.fulfilled,
        (state, action: PayloadAction<PaginatedResponse<FileEntity>>) => {
          state.loading.getFilesThunk = false;
          state.files = action.payload.data;
          state.total = action.payload.total;
          state.currentPage = action.payload.offset / action.payload.limit + 1;
          state.pageSize = action.payload.limit;
        },
      )
      .addCase(getFilesThunk.rejected, (state, action) => {
        state.loading.getFilesThunk = false;
        state.error = (action.payload as string) || 'Failed to fetch files.';
      });

    // GET BY ID
    builder
      .addCase(getFileByIdThunk.pending, (state) => {
        state.loading.getFileByIdThunk = true;
        state.error = null;
      })
      .addCase(getFileByIdThunk.fulfilled, (state, action: PayloadAction<FileEntity>) => {
        state.loading.getFileByIdThunk = false;
        state.selectedFile = action.payload;
      })
      .addCase(getFileByIdThunk.rejected, (state, action) => {
        state.loading.getFileByIdThunk = false;
        state.error = (action.payload as string) || 'Failed to fetch file.';
      });

    // UPLOAD
    builder
      .addCase(uploadFileThunk.pending, (state) => {
        state.loading.uploadFileThunk = true;
        state.error = null;
      })
      .addCase(uploadFileThunk.fulfilled, (state, action: PayloadAction<FileEntity[]>) => {
        state.loading.uploadFileThunk = false;
        state.files.unshift(...action.payload);
        state.total += action.payload.length;
      })
      .addCase(uploadFileThunk.rejected, (state, action) => {
        state.loading.uploadFileThunk = false;
        state.error = (action.payload as string) || 'Failed to upload files.';
      });

    // DELETE
    builder
      .addCase(deleteFileThunk.pending, (state) => {
        state.loading.deleteFileThunk = true;
        state.error = null;
      })
      .addCase(deleteFileThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading.deleteFileThunk = false;
        state.files = state.files.filter((f) => f.id !== action.payload);
        state.total -= 1;
      })
      .addCase(deleteFileThunk.rejected, (state, action) => {
        state.loading.deleteFileThunk = false;
        state.error = (action.payload as string) || 'Failed to delete file.';
      });

    // RESTORE
    builder
      .addCase(restoreFileThunk.pending, (state) => {
        state.loading.restoreFileThunk = true;
        state.error = null;
      })
      .addCase(restoreFileThunk.fulfilled, (state, action: PayloadAction<FileEntity>) => {
        state.loading.restoreFileThunk = false;
        const index = state.files.findIndex((f) => f.id === action.payload.id);
        if (index === -1) {
          state.files.unshift(action.payload);
          state.total += 1;
        }
      })
      .addCase(restoreFileThunk.rejected, (state, action) => {
        state.loading.restoreFileThunk = false;
        state.error = (action.payload as string) || 'Failed to restore file.';
      });
  },
});

// =======================
// EXPORTS
// =======================

// Actions
export const { clearSelectedFile, clearFileError } = fileSlice.actions;

// Selectors
export const selectFiles = (state: { files: FileState }) => state.files.files;
export const selectSelectedFile = (state: { files: FileState }) => state.files.selectedFile;
export const selectFileLoading = (state: { files: FileState }) => state.files.loading;
export const selectFileError = (state: { files: FileState }) => state.files.error;
export const selectFilePagination = (state: { files: FileState }) => ({
  total: state.files.total,
  currentPage: state.files.currentPage,
  pageSize: state.files.pageSize,
});

// Reducer
export default fileSlice.reducer;
