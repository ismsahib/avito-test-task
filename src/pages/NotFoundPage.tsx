import { Box, Typography } from '@mui/material';
import React from 'react';
import Header from '../components/Header';

const NotFoundPage = () => {
  return (
    <>
      <Header version="back" />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}>
        <Typography variant="h1">404</Typography>
      </Box>
    </>
  );
};

export default NotFoundPage;
