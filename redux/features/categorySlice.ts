import { createSlice, createAsyncThunk, original } from "@reduxjs/toolkit";
import { del, get, post, put } from "@/utils/request";
import { ApiGetListResponse, ApiResponse } from "@/types/ApiResponse";
import Category from "@/types/Category";
import { pageSizeOfCategoryPage } from "@/const/teacher";

interface CategoryState {
  categories: Category[];
  categoryUpdated: Category | null;
  totalPages: number;
  status: 'idle' | 'add loading' | 'update loading' | 'delete loading' | 'fetch loading' |
  'add succeeded' | 'update succeeded' | 'delete succeeded' | 'fetch succeeded' |
  'add failed' | 'update failed' | 'delete failed' | 'fetch failed';
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  categoryUpdated: null,
  totalPages: -1,
  status: 'idle',
  error: null
};

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async ({ search = "", pageNo = 1, pageSize = pageSizeOfCategoryPage }: { search?: string; pageNo?: number; pageSize?: number }) => {
    const response = await get<ApiGetListResponse<Category>>(`categories?name=${search}&page-no=${pageNo}&page-size=${pageSize}`);
    return response;
  }
);

export const addCategory = createAsyncThunk(
  'categories/addCategory',
  async (category: Category) => {
    const response = await post<ApiResponse>(`categories`, category);
    return response;
  }
);

export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async (category: Category) => {
    const response = await put<ApiResponse>(`categories/${category.id}`, category);
    return response;
  }
);

export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (id: number) => {
    const response = await del<ApiResponse>(`categories/${id}`);
    return response;
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    startUpdateCategory: (state, action) => {
      const category = state.categories.find(category => category.id === action.payload) || null;
      state.categoryUpdated = category;
    },
    endUpdateCategory: (state) => {
      state.categoryUpdated = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteCategory.pending, (state) => {
        state.status = 'delete loading';
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        if(action.payload.status === 204) {
          state.status = 'delete succeeded';
        } else {
          state.status = 'delete failed';
          state.error = action.payload.message || 'Đã xảy ra lỗi...';
        }
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = 'delete failed';
        state.error = action.error.message || 'Đã xảy ra lỗi...';
      })
      .addCase(addCategory.pending, (state) => {
        state.status = 'add loading';
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        if(action.payload.status === 201) {
          state.status = 'add succeeded';
        } else {
          state.status = 'add failed';
          state.error = action.payload.message || 'Đã xảy ra lỗi...';
        }
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.status = 'add failed';
        state.error = action.error.message || 'Đã xảy ra lỗi...';
      })
      .addCase(updateCategory.pending, (state) => {
        state.status = 'update loading';
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        if (action.payload.status === 202) {
          const updatedCategoryId = state.categoryUpdated?.id;
          state.categories.some(
            (category, index) => {
              if (updatedCategoryId && updatedCategoryId === category.id) {
                state.categories[index] = { ...category, ...action.meta.arg };
                state.error = null;
                state.status = 'update succeeded';
                return true;
              }
              else {
                state.error = 'Đã xảy ra lỗi...';
                state.status = 'update failed';
                return false;
              }
            })
        } else {
          state.status = 'update failed';
          state.error = action.payload.message || 'Đã xảy ra lỗi...';
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.status = 'update failed';
        state.error = action.error.message || 'Đã xảy ra lỗi...';
      })
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'fetch loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.status = 'fetch succeeded';
          state.categories = action.payload.response.data;
          state.totalPages = action.payload.response.totalPages;
        } else {
          state.status = 'fetch failed';
          state.error = action.payload.message || 'Đã xảy ra lỗi...';
        }
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'fetch failed';
        state.error = action.error.message || 'Đã xảy ra lỗi...';
      });
  },
});

export default categorySlice.reducer;
export const { startUpdateCategory, endUpdateCategory } = categorySlice.actions;