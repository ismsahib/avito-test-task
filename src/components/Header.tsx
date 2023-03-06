import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchNewsItems } from '../store/newsSlice';
import { useAppDispatch } from '../store/store';

interface HeaderPropsType {
  version: 'update' | 'back';
}

const Header = ({ version }: HeaderPropsType) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handlerUpdate = () => {
    dispatch(fetchNewsItems());
  };

  const handlerBack = () => {
    navigate('/news');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h4" component="span" sx={{ flexGrow: 1 }}>
          Hacker News
        </Typography>
        {version === 'update' && (
          <Button onClick={handlerUpdate} color="inherit" variant="outlined">
            UPDATE NEWS
          </Button>
        )}
        {version === 'back' && (
          <Button onClick={handlerBack} color="inherit" variant="outlined">
            BACK
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
