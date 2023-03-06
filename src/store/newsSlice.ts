import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { NewsItemType } from '../types/NewsItemType';
import { RootState } from './store';

export const fetchNewsItems = createAsyncThunk(
  'news/fetchNewsId',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios
        .get('https://hacker-news.firebaseio.com/v0/newstories.json')
        .catch((error) => {
          throw new Error('Ошибка при загрузке всех историй');
        });
      const resItems = await Promise.all(
        response.data?.slice(0, 100).map(async (id: number) => {
          const { data: dataItem } = await axios
            .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
            .catch((error) => {
              throw new Error('Ошибка при загрузке 100 первых историй');
            });
          return dataItem;
        }),
      );
      return resItems;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
export const fetchNewsItem = createAsyncThunk(
  'news/fetchNewsItem',
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
  items: NewsItemType[];
  error: string | null;
  isLoading: 'loading' | 'success' | 'reject';
}

const initialState: initialStateType = {
  item: null,
  items: [],
  error: null,
  isLoading: 'loading',
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNewsItems.pending, (state) => {
      state.isLoading = 'loading';
    });
    builder.addCase(fetchNewsItems.fulfilled, (state, action: PayloadAction<NewsItemType[]>) => {
      state.items = action.payload;
      state.isLoading = 'success';
    });
    builder.addCase(fetchNewsItems.rejected, (state, action: PayloadAction<any>) => {
      state.error = action.payload;
      state.isLoading = 'reject';
    });
    builder.addCase(fetchNewsItem.pending, (state) => {
      state.isLoading = 'loading';
    });
    builder.addCase(fetchNewsItem.fulfilled, (state, action: PayloadAction<NewsItemType>) => {
      state.item = action.payload;
      state.isLoading = 'success';
    });
    builder.addCase(fetchNewsItem.rejected, (state, action: PayloadAction<any>) => {
      state.error = action.payload;
      state.isLoading = 'reject';
    });
  },
});

export const { setItems } = newsSlice.actions;
export const selectorNews = (state: RootState) => state.news;

export default newsSlice.reducer;
