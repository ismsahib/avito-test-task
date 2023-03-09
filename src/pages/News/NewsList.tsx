import { Container } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { fetchNewsItems, selectorNews } from '../../store/newsSlice';
import { useAppDispatch } from '../../store/store';
import NewsItem from './NewsItem';
import styles from './NewsList.module.scss';
import Loader from '../../components/Loader';
import Header from '../../components/Header';
import { NewsItemType } from '../../types/NewsItemType';

const NewsList = () => {
  const { items, error, isLoading } = useSelector(selectorNews);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    window.history.scrollRestoration = 'manual';
    dispatch(fetchNewsItems());
    const fetchIntervalId = setInterval(() => dispatch(fetchNewsItems()), 60000);
    return () => {
      clearInterval(fetchIntervalId);
    };
  }, []);

  return (
    <>
      <Header version="update" />
      <Container sx={{ mt: '1rem' }}>
        {isLoading === 'reject' && <h2>{error}</h2>}
        {isLoading === 'loading' && <Loader />}
        {items.map((element: NewsItemType, index: number) => (
          <div key={element.id} className={styles.root}>
            <NewsItem props={element} index={index} />
          </div>
        ))}
      </Container>
    </>
  );
};

export default NewsList;
