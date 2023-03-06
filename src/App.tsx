import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Loader from './components/Loader';
import NewsList from './pages/News/NewsList';
import NotFoundPage from './pages/NotFoundPage';

const NewsStory = React.lazy(() => import('./pages/NewsStory/NewsStory'));

const App: React.FC = () => {
  return (
    <div className="App">
      <React.Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/news" element={<NewsList />}></Route>
          <Route path="news/:id" element={<NewsStory />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </React.Suspense>
    </div>
  );
};

export default App;
