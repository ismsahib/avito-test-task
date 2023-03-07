import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { NewsItemType } from '../types/NewsItemType';
import { RootState } from './store';

export const fetchStoryItem = createAsyncThunk(
  'story/fetchStoryItem',
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await axios
        .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        .catch((error) => {
          throw new Error('Ошибка при загрузке истории');
        });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

interface initialStateType {
  item: NewsItemType | null;
  error: string | null;
  isLoading: 'loading' | 'success' | 'reject';
}

const initialState: initialStateType = {
  item: null,
  error: null,
  isLoading: 'loading',
};

const storySlice = createSlice({
  name: 'story',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStoryItem.pending, (state) => {
      state.isLoading = 'loading';
    });
    builder.addCase(fetchStoryItem.fulfilled, (state, action: PayloadAction<NewsItemType>) => {
      state.item = action.payload;
      state.isLoading = 'success';
    });
    builder.addCase(fetchStoryItem.rejected, (state, action: PayloadAction<any>) => {
      state.error = action.payload;
      state.isLoading = 'reject';
    });
  },
});

export const selectorStory = (state: RootState) => state.story;

export default storySlice.reducer;
