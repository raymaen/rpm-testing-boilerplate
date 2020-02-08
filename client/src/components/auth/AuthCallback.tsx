import React, { useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import auth0Client from '../../util/auth0Client';
import FullScreenLoader from '../common/FullScreenLoader';

interface Props extends RouteComponentProps {}

const AuthCallback: React.FC<Props> = ({ history }) => {
  const starthandleAuthentication = async () => {
    await auth0Client.handleAuthentication();
    history.replace('/');
  };

  useEffect(() => {
    starthandleAuthentication();
  }, [starthandleAuthentication]);

  return <FullScreenLoader text="Loading user data..." />;
};

export default withRouter(AuthCallback);
