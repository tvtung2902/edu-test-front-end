import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { del, get, post, put } from "@/utils/request";
import { ApiGetListResponse, ApiPostResponse } from "@/types/ApiResponse";
import Category from "@/types/Category";
import { pageSizeOfCategoryPage } from "@/const/teacher";

interface CategoryState {
  categories: Category[];
  totalPages: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  totalPages: -1,
  status: 'idle',
  error: null
};

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async ({ search = "", pageNo = 1, pageSize = pageSizeOfCategoryPage }: { search?: string; pageNo?: number; pageSize?: number }) => {
    const response = await get<ApiGetListResponse<Category>>(`categories?name=${search}&page-no=${pageNo}&page-size=${pageSize}`);
    console.log("response", response);
    return response;
  }
);

export const addCategory = createAsyncThunk(
  'categories/addCategory',
  async (category: Category) => {
    const response = await post<ApiPostResponse>(`categories`, category);
    return response;
  }
);

export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async (category: Category) => {
    const response = await put<ApiPostResponse>(`categories/${category.id}`, category);
    return response;
  }
);

export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (id: number) => {
    const response = await del(`categories/${id}`);
    return response;
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCategory.fulfilled, (state, _action) => {
        state.status = 'succeeded';
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(addCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addCategory.fulfilled, (state, _action) => {
        state.status = 'succeeded';
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(updateCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCategory.fulfilled, (state, _action) => {
        state.status = 'succeeded';
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload.response.data;
        state.totalPages = action.payload.response.totalPages;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default categorySlice.reducer; 