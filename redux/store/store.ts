// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../features/categorySlice';
import testReducer from '../features/testSlice';
import groupReducer from '../features/groupSlice';
import questionReducer from '../features/questionSlice';
import testGroupReducer from '../features/testGroupSlice';
import userGroupReducer from '../features/userGroupSlice';
export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    tests: testReducer,
    groups: groupReducer,
    questions: questionReducer,
    testGroups: testGroupReducer,
    userGroups: userGroupReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
