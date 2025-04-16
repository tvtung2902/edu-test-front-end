import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { del, get, post, postForFormData, put } from "@/utils/request";
import { ApiGetListResponse, ApiResponse } from "@/types/ApiResponse";
import { pageSizeOfTestPage } from "@/const/teacher";
import { Test } from "@/types/Test";

interface TestState {
  tests: Test[];
  totalPages: number;
  status:
    | 'idle'
    | 'add loading'
    | 'update loading'
    | 'delete loading'
    | 'fetch loading'
    | 'add succeeded'
    | 'update succeeded'
    | 'delete succeeded'
    | 'fetch succeeded'
    | 'add failed'
    | 'update failed'
    | 'delete failed'
    | 'fetch failed';
  error: string | null;
}

const initialState: TestState = {
  tests: [],
  totalPages: -1,
  status: 'idle',
  error: null
};

export const fetchTests = createAsyncThunk(
  'tests/fetchTests',
  async ({ search = "", pageNo = 1, pageSize = pageSizeOfTestPage }: { search?: string; pageNo?: number; pageSize?: number }) => {
    console.log(search, pageNo, pageSize);
    
    const response = await get<ApiGetListResponse<Test>>(`tests?name=${search}&page-no=${pageNo}&page-size=${pageSize}`);
    console.log(response);
    return response;
  }
);

export const addTest = createAsyncThunk(
  'tests/addTest',
  async (test: FormData) => {
    const response = await postForFormData<ApiResponse>(`tests`, test);
    return response;
  }
);

export const updateTest = createAsyncThunk(
  'tests/updateTest',
  async (test: Test) => {
    const response = await put<ApiResponse>(`tests/${test.id}`, test);
    return response;
  }
);

export const deleteTest = createAsyncThunk(
  'tests/deleteTest',
  async (id: number) => {
    const response = await del<ApiResponse>(`tests/${id}`);
    return response;
  }
);

const testSlice = createSlice({
  name: 'tests',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteTest.pending, (state) => {
        state.status = 'delete loading';
      })
      .addCase(deleteTest.fulfilled, (state, action) => {
        if (action.payload.status === 204) {
          state.status = 'delete succeeded';
        } else {
          state.status = 'delete failed';
          state.error = action.payload.message || 'Đã xảy ra lỗi...';
        }
      })
      .addCase(deleteTest.rejected, (state, action) => {
        state.status = 'delete failed';
        state.error = action.error.message || 'Đã xảy ra lỗi...';
      })
      .addCase(addTest.pending, (state) => {
        state.status = 'add loading';
      })
      .addCase(addTest.fulfilled, (state, action) => {
        if (action.payload.status === 201) {
          state.status = 'add succeeded';
        } else {
          state.status = 'add failed';
          state.error = action.payload.message || 'Đã xảy ra lỗi...';
        }
      })
      .addCase(addTest.rejected, (state, action) => {
        state.status = 'add failed';
        state.error = action.error.message || 'Đã xảy ra lỗi...';
      })
      .addCase(updateTest.pending, (state) => {
        state.status = 'update loading';
      })
      .addCase(updateTest.fulfilled, (state, action) => {
        if (action.payload.status === 202) {
          state.status = 'update succeeded';
        } else {
          state.status = 'update failed';
          state.error = action.payload.message || 'Đã xảy ra lỗi...';
        }
      })
      .addCase(updateTest.rejected, (state, action) => {
        state.status = 'update failed';
        state.error = action.error.message || 'Đã xảy ra lỗi...';
      })
      .addCase(fetchTests.pending, (state) => {
        state.status = 'fetch loading';
      })
      .addCase(fetchTests.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.status = 'fetch succeeded';
          state.tests = action.payload.response.data;
          state.totalPages = action.payload.response.totalPages;
        } else {
          state.status = 'fetch failed';
          state.error = action.payload.message || 'Đã xảy ra lỗi...';
        }
      })
      .addCase(fetchTests.rejected, (state, action) => {
        state.status = 'fetch failed';
        state.error = action.error.message || 'Đã xảy ra lỗi...';
      });
  },
});

export default testSlice.reducer;