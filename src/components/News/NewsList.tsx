import { Container } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { fetchNewsItems, selectorNews } from '../../store/newsSlice';
import { useAppDispatch } from '../../store/store';
import NewsItem from './NewsItem';
import '../../App.css';
import styles from './NewsList.module.scss';
import Loader from '../Loader';

const NewsList: React.FC = () => {
  const [firstLoad, setFirstLoad] = React.useState(true);
  const { items, error, isLoading } = useSelector(selectorNews);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (!firstLoad) {
      setInterval(() => dispatch(fetchNewsItems()), 60000);
    }
  }, [firstLoad]);
  React.useEffect(() => {
    if (firstLoad) {
      dispatch(fetchNewsItems());
      setFirstLoad(false);
    }
  }, []);

  return (
    <Container sx={{ mt: '1rem' }}>
      {isLoading === 'reject' && <h2>{error}</h2>}
      {isLoading === 'loading' && <Loader />}
      {items.map((element, index) => (
        <div className={styles.root}>
          <NewsItem key={element.id} props={element} index={index} />
        </div>
      ))}
    </Container>
  );
};

export default NewsList;
