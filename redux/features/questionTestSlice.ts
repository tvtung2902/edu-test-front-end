import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { get, post, postForFormData, put, putForFormData } from "@/utils/request";
import { ApiGetListNonPaginationResponse, ApiGetListResponse, ApiGetResponse, ApiResponse } from "@/types/ApiResponse";
import { QuestionTestRequestDTO, SortQuestionTestDTO, DeleteQuestionTestDTO, QuestionInTest, QuestionDTO } from "@/types/Question"; 
import { Question } from "@/components/question-in-test/test-creator";

interface QuestionTestState {
  questions: QuestionInTest[];
  status:
    | 'idle'
    | 'add loading'
    | 'update loading'
    | 'delete loading'
    | 'fetch loading'
    | 'fetch detail loading'
    | 'add succeeded'
    | 'update succeeded'
    | 'delete succeeded'
    | 'fetch succeeded'
    | 'fetch detail succeeded'
    | 'add failed'
    | 'update failed'
    | 'delete failed'
    | 'fetch failed'
    | 'fetch detail failed';
  error: string | null;
}

const initialState: QuestionTestState = {
  questions: [],
  status: 'idle',
  error: null
};

export const fetchQuestionsInTest = createAsyncThunk(
  'questionTest/fetchQuestionsInTest',
  async ({ testId }: { testId: number }) => {
    const response = await get<ApiGetListNonPaginationResponse<QuestionInTest>>(`tests/${testId}/questions`);
    console.log("response", response);

    return response;
  }
);

// API 1: Sắp xếp câu hỏi trong test
export const sortQuestionsInTest = createAsyncThunk(
  'questionTest/sortQuestionsInTest',
  async ({ testId, sortList }: { testId: number; sortList: SortQuestionTestDTO[] }) => {
    const response = await put<ApiResponse>(`tests/${testId}/question/sort`, sortList);
    console.log("response", response);
    return response;
  }
);

// API 2: Xóa câu hỏi khỏi test
export const deleteQuestionFromTest = createAsyncThunk(
  'questionTest/deleteQuestionFromTest',
  async ({ testId, deleteRequest }: { testId: number; deleteRequest: DeleteQuestionTestDTO }) => {
    const response = await put<ApiResponse>(`tests/${testId}/questions`, deleteRequest);
    return response;
  }
);

// API 3: Thêm 1 câu hỏi mới vào test
export const addQuestionToTest = createAsyncThunk(
  'questionTest/addQuestionToTest',
  async ({ testId, formData }: { testId: number; formData: FormData }) => {
    const response = await postForFormData<ApiResponse>(`tests/${testId}/question`, formData); 
    return response;
  }
);

// API 4: Thêm nhiều câu hỏi từ thư viện vào test
export const addQuestionsFromLibraryToTest = createAsyncThunk(
  'questionTest/addQuestionsFromLibraryToTest',
  async ({ testId, request }: { testId: number; request: QuestionTestRequestDTO }) => {
    const response = await post<ApiResponse>(`tests/${testId}/questions/from-library`, request);
    return response;
  }
);

// API 5: Cập nhật câu hỏi trong test
export const updateQuestionInTest = createAsyncThunk(
  'questionTest/updateQuestionInTest',
  async ({ question, id, questionDTO}: {question: FormData, id: number, questionDTO: QuestionDTO}) => {
    const response = await putForFormData<ApiResponse>(`questions/${id}`, question);
    return {
      response: response,
      questionDTO: questionDTO
    }
  }
);


const questionTestSlice = createSlice({
  name: 'questionTest',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Các pending
      .addCase(sortQuestionsInTest.pending, (state) => {
        state.status = 'update loading';
        state.error = null;
      })
      .addCase(deleteQuestionFromTest.pending, (state) => {
        state.status = 'delete loading';
        state.error = null;
      })
      .addCase(addQuestionToTest.pending, (state) => {
        state.status = 'add loading';
        state.error = null;
      })
      .addCase(addQuestionsFromLibraryToTest.pending, (state) => {
        state.status = 'add loading';
        state.error = null;
      })
      .addCase(fetchQuestionsInTest.pending, (state) => {
        state.status = 'fetch loading';
        state.error = null;
      })
      .addCase(updateQuestionInTest.pending, (state) => {
        state.status = 'update loading';
        state.error = null;
      })


      // Các fulfilled
      .addCase(sortQuestionsInTest.fulfilled, (state, action) => {
        if (action.payload.status === 201) {
          state.status = 'update succeeded';
        } else {
          state.status = 'update failed';
          state.error = action.payload.message || 'Đã xảy ra lỗi khi sắp xếp câu hỏi.';
        }
      })
      .addCase(deleteQuestionFromTest.fulfilled, (state, action) => {
        if (action.payload.status === 202) {
          state.status = 'delete succeeded';
        } else {
          state.status = 'delete failed';
          state.error = action.payload.message || 'Đã xảy ra lỗi khi xóa câu hỏi.';
        }
      })
      .addCase(addQuestionToTest.fulfilled, (state, action) => {
        if (action.payload.status === 201) {
          state.status = 'add succeeded';
        } else {
          state.status = 'add failed';
          state.error = action.payload.message || 'Đã xảy ra lỗi khi thêm câu hỏi.';
        }
      })
      .addCase(addQuestionsFromLibraryToTest.fulfilled, (state, action) => {
        if (action.payload.status === 201) {
          console.log("action.payload", action.payload);
          state.status = 'add succeeded';
        } else {
          state.status = 'add failed';
          state.error = action.payload.message || 'Đã xảy ra lỗi khi thêm câu hỏi từ thư viện.';
        }
      })
      .addCase(fetchQuestionsInTest.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.status = 'fetch succeeded';
          state.questions = action.payload.response;
        }
        else {
          state.status = 'fetch failed';
          state.error = action.payload.message || 'Đã xảy ra lỗi khi lấy câu hỏi.';
        }
      })
      .addCase(updateQuestionInTest.fulfilled, (state, action) => {
        try {
          if (action.payload.response.status === 202) {
            state.status = 'update succeeded';
            state.error = null;
            const questionId = action.meta.arg.id;
            const updated = state.questions.some((question, index) => {
              if (question.id === questionId) {
                state.questions[index] = {
                  ...question,
                  ...action.payload.questionDTO
                };
                return true;
              }
              return false;
            });

            if (!updated) {
              state.error = 'Đã xảy ra lỗi...';
              state.status = 'update failed';
            }
          } else {
            state.status = 'update failed';
            state.error = action.payload.response.message || 'Đã xảy ra lỗi khi cập nhật câu hỏi.';
          }
        } catch (error) {
          console.log("error", error);
          state.status = 'update failed';
          state.error = 'Đã xảy ra lỗi...';
        }
      })

      // Các rejected
      .addCase(sortQuestionsInTest.rejected, (state, action) => {
        state.status = 'update failed';
        state.error = action.error.message || 'Đã xảy ra lỗi khi sắp xếp câu hỏi.';
      })
      .addCase(deleteQuestionFromTest.rejected, (state, action) => {
        state.status = 'delete failed';
        state.error = action.error.message || 'Đã xảy ra lỗi khi xóa câu hỏi.';
      })
      .addCase(addQuestionToTest.rejected, (state, action) => {
        state.status = 'add failed';
        state.error = action.error.message || 'Đã xảy ra lỗi khi thêm câu hỏi.';
      })
      .addCase(addQuestionsFromLibraryToTest.rejected, (state, action) => {
        state.status = 'add failed';
        state.error = action.error.message || 'Đã xảy ra lỗi khi thêm câu hỏi từ thư viện.';
      })
      .addCase(fetchQuestionsInTest.rejected, (state, action) => {
        state.status = 'fetch failed';
        state.error = action.error.message || 'Đã xảy ra lỗi khi lấy câu hỏi.';
      })
      .addCase(updateQuestionInTest.rejected, (state, action) => {
        state.status = 'update failed';
        state.error = action.error.message || 'Đã xảy ra lỗi khi cập nhật câu hỏi.';
      });
  },
});

export default questionTestSlice.reducer;
