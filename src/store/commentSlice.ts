import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store';

export const fetchCommentItem = createAsyncThunk(
  'story/fetchCommentItem',
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await axios
        .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        .catch((error) => {
          throw new Error('Ошибка при загрузке комментария');
        });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

interface initialStateType {
  error: string | null;
  isLoading: 'loading' | 'success' | 'reject';
}

const initialState: initialStateType = {
  error: null,
  isLoading: 'loading',
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCommentItem.pending, (state) => {
      state.isLoading = 'loading';
    });
    builder.addCase(fetchCommentItem.fulfilled, (state) => {
      state.isLoading = 'success';
    });
    builder.addCase(fetchCommentItem.rejected, (state, action: PayloadAction<any>) => {
      state.error = action.payload;
      state.isLoading = 'reject';
    });
  },
});

export const selectorComment = (state: RootState) => state.comment;

export default commentSlice.reducer;
