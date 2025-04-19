import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { del, get, post, put } from "@/utils/request";
import { ApiGetListResponse, ApiResponse } from "@/types/ApiResponse";
import { Question } from "@/types/Question";

interface QuestionState {
  questions: Question[];
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

const initialState: QuestionState = {
  questions: [],
  totalPages: -1,
  status: 'idle',
  error: null
};

export const fetchQuestions = createAsyncThunk(
    'questions/fetchQuestions',
    async ({
      content = '',
      categoryIds = [],
      pageNo = 0,
      pageSize = 2
    }: {
      content?: string;
      categoryIds?: number[];
      pageNo?: number;
      pageSize?: number;
    }) => {
      const params = new URLSearchParams();
      params.append('content', content);
      params.append('page-no', pageNo.toString());
      params.append('page-size', pageSize.toString());
  
      categoryIds.forEach(id => {
        params.append('categoryIds', id.toString());
      });
  
      const path = `questions?${params.toString()}`;
      console.log("path", path);
      const response = await get<ApiGetListResponse<Question>>(path);
      console.log("response", response);
      return response;
    }
  );
  
export const addQuestion = createAsyncThunk(
  'questions/addQuestion',
  async (question: Question) => {
    const response = await post<ApiResponse>(`questions`, question);
    return response;
  }
);

export const updateQuestion = createAsyncThunk(
  'questions/updateQuestion',
  async ({question, id}: {question: Question, id: number}) => {
    const response = await put<ApiResponse>(`questions/${id}`, question);
    return response;
  }
);

export const deleteQuestion = createAsyncThunk(
  'questions/deleteQuestion',
  async (id: number) => {
    const response = await del<ApiResponse>(`questions/${id}`);
    return response;
  }
);

const questionSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteQuestion.pending, (state) => {
        state.status = 'delete loading';
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        if (action.payload.status === 204) {
          state.status = 'delete succeeded';
        } else {
          state.status = 'delete failed';
          state.error = action.payload.message || 'Đã xảy ra lỗi...';
        }
      })
      .addCase(deleteQuestion.rejected, (state, action) => {
        state.status = 'delete failed';
        state.error = action.error.message || 'Đã xảy ra lỗi...';
      })
      .addCase(addQuestion.pending, (state) => {
        state.status = 'add loading';
      })
      .addCase(addQuestion.fulfilled, (state, action) => {
        if (action.payload.status === 201) {
          state.status = 'add succeeded';
        } else {
          state.status = 'add failed';
          state.error = action.payload.message || 'Đã xảy ra lỗi...';
        }
      })
      .addCase(addQuestion.rejected, (state, action) => {
        state.status = 'add failed';
        state.error = action.error.message || 'Đã xảy ra lỗi...';
      })
      .addCase(updateQuestion.pending, (state) => {
        state.status = 'update loading';
      })
      .addCase(updateQuestion.fulfilled, (state, action) => {
        if (action.payload.status === 202) {
          state.status = 'update succeeded';
        } else {
          state.status = 'update failed';
          state.error = action.payload.message || 'Đã xảy ra lỗi...';
        }
      })
      .addCase(updateQuestion.rejected, (state, action) => {
        state.status = 'update failed';
        state.error = action.error.message || 'Đã xảy ra lỗi...';
      })
      .addCase(fetchQuestions.pending, (state) => {
        state.status = 'fetch loading';
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.status = 'fetch succeeded';
          state.questions = action.payload.response.data;
          state.totalPages = action.payload.response.totalPages;
        } else {
          state.status = 'fetch failed';
          state.error = action.payload.message || 'Đã xảy ra lỗi...';
        }
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = 'fetch failed';
        state.error = action.error.message || 'Đã xảy ra lỗi...';
      });
  },
});

export default questionSlice.reducer;
