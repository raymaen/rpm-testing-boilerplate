import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';
import CenteredLayout from './CenteredLayout';

interface Props {
  text?: string;
}
const FullScreenLoader: React.FC<Props> = ({ text }) => (
  <CenteredLayout>
    <CircularProgress color="primary" style={{ margin: '20px' }} />
    <Typography variant="h5">{text || 'Loading...'}</Typography>
  </CenteredLayout>
);

export default FullScreenLoader;
