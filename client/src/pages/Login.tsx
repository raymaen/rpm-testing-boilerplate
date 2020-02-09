import React from 'react';
import { useAuth0 } from '../components/auth/auth0-context';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CenteredLayout from '../components/common/CenteredLayout';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 500,
      margin: '0 auto',
      padding: '30px 0',
      background: theme.palette.primary.main,
      color: '#fff'
    },
    title: {
      marginBottom: theme.spacing(8)
    }
  })
);

const Login = () => {
  const classes = useStyles({});
  const { loginWithRedirect } = useAuth0();

  return (
    <CenteredLayout>
      <Card className={classes.root}>
        <Typography className={classes.title} variant="h5">
          Login to your uLegend account
        </Typography>
        <Button onClick={loginWithRedirect} variant="contained">
          Sign In
        </Button>
      </Card>
    </CenteredLayout>
  );
};

export default Login;
