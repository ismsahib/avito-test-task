import { AsyncThunkAction } from '@reduxjs/toolkit';
import React from 'react';
import { useAppDispatch } from '../store/store';

export const useUnwrapAsyncThunk = () => {
  const dispatch = useAppDispatch();
  return React.useCallback(
    async <R extends any>(asyncThunk: AsyncThunkAction<R, any, any>): Promise<R> => {
      return await dispatch(asyncThunk).unwrap();
    },
    [dispatch],
  );
};
