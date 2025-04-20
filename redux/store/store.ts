// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../features/categorySlice';
import testReducer from '../features/testSlice';
import groupReducer from '../features/groupSlice';
import questionReducer from '../features/questionSlice';
export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    tests: testReducer,
    groups: groupReducer,
    questions: questionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
