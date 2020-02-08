import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography, makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(8),
      textAlign: 'center'
    }
  })
);

interface Props {
  text?: string;
}
const FullScreenLoader: React.FC<Props> = ({ text }) => {
  const classes = useStyles({});

  return (
    <div className={classes.root}>
      <CircularProgress color="primary" />
      <Typography variant="h5">{text}</Typography>
    </div>
  );
};

export default FullScreenLoader;
