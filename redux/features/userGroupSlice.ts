import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { get, post, del, put } from "@/utils/request";
import { ApiGetListResponse, ApiResponse } from "@/types/ApiResponse";
import { TestGroup, TestStatus, TestGroupWithStatus } from "@/types/TestGroup";
import { pageSizeOfTestInGroupDetailPage, pageSizeOfUserInGroupDetailPage } from "@/const/teacher";
import { UserGroup } from "@/types/UserGroup";
interface UserGroupState {
  userGroups: UserGroup[];
  totalPages: number;
  status: 'idle' | 'add loading' | 'delete loading' | 'fetch loading' |
  'add succeeded' | 'delete succeeded' | 'fetch succeeded' |
  'add failed' | 'delete failed' | 'fetch failed';
  error: string | null;
}

const initialState: UserGroupState = {
  userGroups: [],
  totalPages: -1,
  status: 'idle',
  error: null
};

export const fetchUserGroups = createAsyncThunk(
  'userGroups/fetchUserGroups',
  async ({ 
    groupId,
    search = "", 
    pageNo = 1, 
    pageSize = pageSizeOfUserInGroupDetailPage, 
    status
  }: {
    groupId: number;
    search?: string; 
    pageNo?: number; 
    pageSize?: number; 
    status?: 'PENDING' | 'JOINED' 
  }) => {
    let url = `groups/${groupId}/users?name=${search}&page-no=${pageNo}&page-size=${pageSize}`;
    if (status) {
      url += `&status=${status.toUpperCase()}`;
    }
    const response = await get<ApiGetListResponse<UserGroup>>(url);
    console.log("response", response);
    return response;
  }
);

export const addUserGroup = createAsyncThunk(
  'userGroups/addUserGroup',
  async ({groupId, emails}: {groupId: number, emails: string[]}) => {
    const response = await post<ApiResponse>(`groups/${groupId}/users`, {emails: emails});
    return response;
  }
);

export const deleteUserGroup = createAsyncThunk(
  'userGroups/deleteUserGroup',
  async ({groupId, userId}: {groupId: number, userId: number}) => {
    const response = await put<ApiResponse>(`groups/${groupId}/users`, {userIds: [userId]});
    return response;
  }
);

const userGroupSlice = createSlice({
  name: 'userGroups',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserGroups.pending, (state) => {
        state.status = 'fetch loading';
      })
      .addCase(fetchUserGroups.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.userGroups = action.payload.response.data;
          state.totalPages = action.payload.response.totalPages;
          state.status = 'fetch succeeded';
        } else {
          state.status = 'fetch failed';
          state.error = action.payload.message || 'Đã xảy ra lỗi...';
        }
      })
      .addCase(fetchUserGroups.rejected, (state, action) => {
        state.status = 'fetch failed';
        state.error = action.error.message || 'Đã xảy ra lỗi...';
      })
      .addCase(addUserGroup.pending, (state) => {
        state.status = 'add loading';
      })
      .addCase(addUserGroup.fulfilled, (state, action) => {
        if (action.payload.status === 201) {
          state.status = 'add succeeded';
        } else {
          state.status = 'add failed';
          state.error = action.payload.message || 'Đã xảy ra lỗi...';
        }
      })
      .addCase(addUserGroup.rejected, (state, action) => {
        state.status = 'add failed';
        state.error = action.error.message || 'Đã xảy ra lỗi...';
      })
      .addCase(deleteUserGroup.pending, (state) => {
        state.status = 'delete loading';
      })
      .addCase(deleteUserGroup.fulfilled, (state, action) => {
        if (action.payload.status === 202) {
          state.status = 'delete succeeded';
        } else {
          state.status = 'delete failed';
          state.error = action.payload.message || 'Đã xảy ra lỗi...';
        }
      })
      .addCase(deleteUserGroup.rejected, (state, action) => {
        state.status = 'delete failed';
        state.error = action.error.message || 'Đã xảy ra lỗi...';
      });
  },
});

export default userGroupSlice.reducer;