import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { get, post, del, put } from "@/utils/request";
import { ApiGetListResponse, ApiResponse } from "@/types/ApiResponse";
import { TestGroup, TestStatus, TestGroupWithStatus } from "@/types/TestGroup";
import { pageSizeOfTestInGroupDetailPage } from "@/const/teacher";

interface TestGroupState {
  testGroups: TestGroupWithStatus[];
  totalPages: number;
  status: 'idle' | 'add loading' | 'delete loading' | 'fetch loading' |
  'add succeeded' | 'delete succeeded' | 'fetch succeeded' |
  'add failed' | 'delete failed' | 'fetch failed';
  error: string | null;
}

const initialState: TestGroupState = {
  testGroups: [],
  totalPages: -1,
  status: 'idle',
  error: null
};

const calculateStatus = (startDate: string, endDate: string): TestStatus => {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (now < start) return 'incoming';
  if (now > end) return 'ended';
  return 'ongoing';
};

export const fetchTestGroups = createAsyncThunk(
  'testGroups/fetchTestGroups',
  async ({ 
    groupId,
    search = "", 
    pageNo = 1, 
    pageSize = pageSizeOfTestInGroupDetailPage, 
    status
  }: {
    groupId: number;
    search?: string; 
    pageNo?: number; 
    pageSize?: number; 
    status?: TestStatus 
  }) => {
    let url = `groups/${groupId}/tests?name=${search}&page-no=${pageNo}&page-size=${pageSize}`;
    if (status) {
      url += `&status=${status.toUpperCase()}`;
    }
    const response = await get<ApiGetListResponse<TestGroup>>(url);
    console.log("response", response);
    // Add status to each test group based on dates
    const testGroupsWithStatus: TestGroupWithStatus[] = response.response.data.map(group => ({
      ...group,
      status: calculateStatus(group.startDate, group.endDate)
    }));

    return {
      ...response,
      response: {
        ...response.response,
        data: testGroupsWithStatus
      }
    };
  }
);

export const addTestGroup = createAsyncThunk(
  'testGroups/addTestGroup',
  async ({groupId, testsIds}: {groupId: number, testsIds: number[]}) => {
    const response = await post<ApiResponse>(`groups/${groupId}/tests`, {testIds: testsIds});
    return response;
  }
);

export const deleteTestGroup = createAsyncThunk(
  'testGroups/deleteTestGroup',
  async ({groupId, testGroupId}: {groupId: number, testGroupId: number}) => {
    const response = await put<ApiResponse>(`groups/${groupId}/tests`, {testIds: [testGroupId]});
    return response;
  }
);

const testGroupSlice = createSlice({
  name: 'testGroups',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestGroups.pending, (state) => {
        state.status = 'fetch loading';
      })
      .addCase(fetchTestGroups.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.testGroups = action.payload.response.data;
          state.totalPages = action.payload.response.totalPages;
          state.status = 'fetch succeeded';
        } else {
          state.status = 'fetch failed';
          state.error = action.payload.message || 'Đã xảy ra lỗi...';
        }
      })
      .addCase(fetchTestGroups.rejected, (state, action) => {
        state.status = 'fetch failed';
        state.error = action.error.message || 'Đã xảy ra lỗi...';
      })
      .addCase(addTestGroup.pending, (state) => {
        state.status = 'add loading';
      })
      .addCase(addTestGroup.fulfilled, (state, action) => {
        if (action.payload.status === 201) {
          state.status = 'add succeeded';
        } else {
          state.status = 'add failed';
          state.error = action.payload.message || 'Đã xảy ra lỗi...';
        }
      })
      .addCase(addTestGroup.rejected, (state, action) => {
        state.status = 'add failed';
        state.error = action.error.message || 'Đã xảy ra lỗi...';
      })
      .addCase(deleteTestGroup.pending, (state) => {
        state.status = 'delete loading';
      })
      .addCase(deleteTestGroup.fulfilled, (state, action) => {
        if (action.payload.status === 202) {
          state.status = 'delete succeeded';
        } else {
          state.status = 'delete failed';
          state.error = action.payload.message || 'Đã xảy ra lỗi...';
        }
      })
      .addCase(deleteTestGroup.rejected, (state, action) => {
        state.status = 'delete failed';
        state.error = action.error.message || 'Đã xảy ra lỗi...';
      });
  },
});

export default testGroupSlice.reducer;
