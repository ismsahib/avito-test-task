import { Container } from '@mui/material';
import React from 'react';
import './App.css';
import Header from './components/Header';
import NewsList from './components/News/NewsList';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <NewsList />
    </div>
  );
};

export default App;
