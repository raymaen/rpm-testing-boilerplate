import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import IndexPage from './pages/index.page';
import RpmPage from './pages/rpm.page';

const Routes = () => {
  return (
    <Fragment>
      <Route exact path="/" component={IndexPage} />
      <Route exact path="/rpm/:id" component={RpmPage} />
    </Fragment>
  );
};

export default Routes;
