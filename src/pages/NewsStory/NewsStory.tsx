import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import { fetchNewsItem, selectorNews } from '../../store/newsSlice';
import { useAppDispatch } from '../../store/store';
import { NewsItemType } from '../../types/NewsItemType';
import { getTimeDif } from '../../utils/getTime';
import NewsStoryItem from './NewsStoryItem';

const NewsStory = () => {
  const { item, error, isLoading } = useSelector(selectorNews);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    window.history.scrollRestoration = 'manual';
    if (id) dispatch(fetchNewsItem(Number(id)));
  }, []);

  return (
    <>
      <Header version="back" />
      {isLoading === 'reject' && <h2>{error}</h2>}
      {isLoading === 'loading' && <Loader />}
      <NewsStoryItem props={item} />
    </>
  );
};

export default NewsStory;
