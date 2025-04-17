import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { del, get, post, postForFormData, put, putForFormData } from "@/utils/request";
import { ApiGetListResponse, ApiResponse } from "@/types/ApiResponse";
import { pageSizeOfTestPage } from "@/const/teacher";
import { Group } from "@/types/Group";

interface GroupState {
  groups: Group[];
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

const initialState: GroupState = {
  groups: [],
  totalPages: -1,
  status: 'idle',
  error: null
};

export const fetchGroups = createAsyncThunk(
  'groups/fetchGroups',
  async ({ search = "", pageNo = 1, pageSize = pageSizeOfTestPage }:
     { search?: string; pageNo?: number; pageSize?: number }) => {
    console.log(search, pageNo, pageSize);
    const path = `groups?name=${search}&page-no=${pageNo}&page-size=${pageSize}`;
    const response = await get<ApiGetListResponse<Group>>(path);
    console.log("response", response);
    return response;
  }
);

export const addGroup = createAsyncThunk(
  'groups/addGroup',
  async (group: FormData) => {
    const response = await postForFormData<ApiResponse>(`groups`, group);
    console.log("response", response);
    return response;
  }
);

export const updateGroup = createAsyncThunk(
  'groups/updateGroup',
  async ({group, id}: {group: FormData, id: number}) => {
    const response = await putForFormData<ApiResponse>(`groups/${id}`, group);
    return response;
  }
);

export const deleteGroup = createAsyncThunk(
  'groups/deleteGroup',
  async (id: number) => {
    const response = await del<ApiResponse>(`groups/${id}`);
    return response;
  }
);

const groupSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteGroup.pending, (state) => {
        state.status = 'delete loading';
      })
      .addCase(deleteGroup.fulfilled, (state, action) => {
        if (action.payload.status === 204) {
          state.status = 'delete succeeded';
        } else {
          state.status = 'delete failed';
          state.error = action.payload.message || 'Đã xảy ra lỗi...';
        }
      })
      .addCase(deleteGroup.rejected, (state, action) => {
        state.status = 'delete failed';
        state.error = action.error.message || 'Đã xảy ra lỗi...';
      })
      .addCase(addGroup.pending, (state) => {
        state.status = 'add loading';
      })
      .addCase(addGroup.fulfilled, (state, action) => {
        if (action.payload.status === 201) {
          state.status = 'add succeeded';
        } else {
          state.status = 'add failed';
          state.error = action.payload.message || 'Đã xảy ra lỗi...';
        }
      })
      .addCase(addGroup.rejected, (state, action) => {
        state.status = 'add failed';
        state.error = action.error.message || 'Đã xảy ra lỗi...';
      })
      .addCase(updateGroup.pending, (state) => {
        state.status = 'update loading';
      })
      .addCase(updateGroup.fulfilled, (state, action) => {
        if (action.payload.status === 202) {
          state.status = 'update succeeded';
        } else {
          state.status = 'update failed';
          state.error = action.payload.message || 'Đã xảy ra lỗi...';
        }
      })
      .addCase(updateGroup.rejected, (state, action) => {
        state.status = 'update failed';
        state.error = action.error.message || 'Đã xảy ra lỗi...';
      })
      .addCase(fetchGroups.pending, (state) => {
        state.status = 'fetch loading';
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.status = 'fetch succeeded';
          state.groups = action.payload.response.data;
          state.totalPages = action.payload.response.totalPages;
        } else {
          state.status = 'fetch failed';
          state.error = action.payload.message || 'Đã xảy ra lỗi...';
        }
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.status = 'fetch failed';
        state.error = action.error.message || 'Đã xảy ra lỗi...';
      });
  },
});

export default groupSlice.reducer;
