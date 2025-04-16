// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../features/categorySlice';
import testReducer from '../features/testSlice';
export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    tests: testReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
