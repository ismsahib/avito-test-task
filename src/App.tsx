import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import { fetchNewsItems, selectorNews } from './store/newsSlice';
import { useAppDispatch } from './store/store';
import { NewsItemType } from './types/NewsItemType';

const App: React.FC = () => {
  // const newsId = useSelector(selectorNewsId);
  const { items, error, isLoading } = useSelector(selectorNews);

  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(fetchNewsItems());
  }, []);
  return (
    <div className="App">
      {isLoading === 'reject' && <h2>{error}</h2>}
      {items.map((element, index) => {
        return <div key={element.id}>{index + '  ' + element.title}</div>;
      })}
    </div>
  );
};

export default App;
