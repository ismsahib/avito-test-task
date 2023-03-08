import { Container } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { fetchNewsItems, selectorNews } from '../../store/newsSlice';
import { useAppDispatch } from '../../store/store';
import NewsItem from './NewsItem';
import styles from './NewsList.module.scss';
import Loader from '../../components/Loader';
import Header from '../../components/Header';

const NewsList = () => {
  const [firstLoad, setFirstLoad] = React.useState(true);
  const { items, error, isLoading } = useSelector(selectorNews);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (!firstLoad) {
      setInterval(() => dispatch(fetchNewsItems()), 60000);
    }
  }, [firstLoad]);

  React.useEffect(() => {
    window.history.scrollRestoration = 'manual';
    if (firstLoad) {
      dispatch(fetchNewsItems());
      setFirstLoad(false);
    }
  }, []);

  return (
    <>
      <Header version="update" />
      <Container sx={{ mt: '1rem' }}>
        {isLoading === 'reject' && <h2>{error}</h2>}
        {isLoading === 'loading' && <Loader />}
        {items.map((element, index) => (
          <div key={element.id} className={styles.root}>
            <NewsItem props={element} index={index} />
          </div>
        ))}
      </Container>
    </>
  );
};

export default NewsList;
