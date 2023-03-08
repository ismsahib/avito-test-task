import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CommentsList from '../../components/Comment/CommentsList';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import { useAppDispatch } from '../../store/store';
import { fetchStoryItem, selectorStory } from '../../store/storySlice';
import NewsStoryItem from './NewsStoryItem';

const NewsStory = () => {
  const { item, error, isLoading } = useSelector(selectorStory);
  const [updateStatus, setUpdateStatus] = React.useState(false);

  const { id } = useParams();
  const dispatch = useAppDispatch();

  const handleUpdate = () => {
    setUpdateStatus(!updateStatus);
  };

  React.useEffect(() => {
    window.history.scrollRestoration = 'manual';
    if (id) dispatch(fetchStoryItem(Number(id)));
  }, [updateStatus]);

  return (
    <>
      <Header version="back" />
      {isLoading === 'reject' && <h2>{error}</h2>}
      {isLoading === 'loading' && <Loader />}
      <NewsStoryItem props={item} handleUpdate={handleUpdate} />
      {item?.descendants && <CommentsList kids={item?.kids as number[]} />}
    </>
  );
};

export default NewsStory;
