import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { fetchNewsItems } from '../store/newsSlice';
import { useAppDispatch } from '../store/store';

const Header = () => {
  const dispatch = useAppDispatch();

  const handlerUpdate = () => {
    dispatch(fetchNewsItems());
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h4" component="span" sx={{ flexGrow: 1 }}>
          Hacker News
        </Typography>
        <Button onClick={handlerUpdate} color="inherit" variant="outlined">
          UPDATE NEWS
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
