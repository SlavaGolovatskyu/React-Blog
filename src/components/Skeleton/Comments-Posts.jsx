import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export const SkeletonCommentsPosts = () => {
  return (
    <Box sx={{ margin: '50px', width: '100%' }}>
      <Typography variant="h1">
        <Skeleton animation="wave" />
      </Typography>
      <Typography variant="h4">
        <Skeleton animation="wave" />
      </Typography>
      <Skeleton variant="rectangular" width={510} height={208} />
      <Typography variant="h1">
        <Skeleton animation="wave" />
      </Typography>
      <Typography variant="h4">
        <Skeleton animation="wave" />
      </Typography>
      <Skeleton variant="rectangular" width={510} height={208} />
    </Box>
  );
};
