import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import commentSlice from './commentSlice';
import newsSlice from './newsSlice';
import storySlice from './storySlice';

const store = configureStore({
  reducer: {
    news: newsSlice,
    story: storySlice,
    comment: commentSlice,
  },
});

export type DispatchFuncType = () => typeof store.dispatch;
export const useAppDispatch: DispatchFuncType = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
