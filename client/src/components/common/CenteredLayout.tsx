import React from 'react';
import Grid from '@material-ui/core/Grid';

interface Props {
  children: any;
}

const CenteredLayout: React.FC<Props> = ({ children }) => {
  return (
    <Grid
      container
      spacing={0}
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh', textAlign: 'center' }}
    >
      <Grid item xs={6}>
        {children}
      </Grid>
    </Grid>
  );
};

export default CenteredLayout;
