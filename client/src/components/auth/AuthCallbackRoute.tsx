import React from 'react';
import { Route } from 'react-router-dom';
import AuthCallback from './AuthCallback';

const AuthCallbackRoute = () => {
  return <Route exact path="/callback" component={AuthCallback} />;
};

export default AuthCallbackRoute;
