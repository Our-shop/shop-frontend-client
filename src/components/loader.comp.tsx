import React, { FC } from 'react';
import { CircularProgress } from '@mui/material';

const LoaderComp: FC = () => {
  return (
    <CircularProgress
      sx={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
};

export default LoaderComp;
