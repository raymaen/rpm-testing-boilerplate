import React, { useState, useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import useForceUpdate from 'use-force-update';
import auth0Client from '../../util/auth0Client';
import FullScreenLoader from '../common/FullScreenLoader';

interface Props extends RouteComponentProps {
  children: any;
}

const SecurityWrapper: React.FC<Props> = ({ children, location }) => {
  const [checkingSession, setCheckingSession] = useState(true);
  const forceUpdate = useForceUpdate();

  const checkSession = async () => {
    if (location.pathname === '/callback') {
      setCheckingSession(false);
      return;
    }
    try {
      await auth0Client.silentAuth();
      forceUpdate();
    } catch (err) {
      if (err.error !== 'login_required') console.log(err.error);
    }
    setCheckingSession(false);
  };

  useEffect(() => {
    checkSession();
  }, []);

  if (checkingSession) {
    return <FullScreenLoader text="Checking session..." />;
  }

  if (!auth0Client.isAuthenticated()) {
    auth0Client.signIn();
    return null;
  }

  return children;
};

export default withRouter(SecurityWrapper);
