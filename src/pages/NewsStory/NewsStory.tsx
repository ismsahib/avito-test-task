import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import { useAppDispatch } from '../../store/store';
import { fetchStoryItem, selectorStory } from '../../store/storySlice';
import NewsStoryItem from './NewsStoryItem';

const NewsStory = () => {
  const { item, error, isLoading } = useSelector(selectorStory);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    window.history.scrollRestoration = 'manual';
    if (id) dispatch(fetchStoryItem(Number(id)));
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
