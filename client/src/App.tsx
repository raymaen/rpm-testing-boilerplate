import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core';
import configureStore from './store';
import Routes from './Routes';
import MainLayout from './components/layout/MainLayout';
import theme from './util/theme';
import { useAuth0 } from './react-auth0-spa';

import './pages/Layout.css';

export const store = configureStore();

const App: React.FC = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  // useEffect(() => {
  //   const redirectUnauthUser = async () => {
  //     if (!isAuthenticated) {
  //       await loginWithRedirect({
  //         appState: { targetUrl: window.location.pathname }
  //       });
  //     }
  //   };
  //   redirectUnauthUser();
  // }, [isAuthenticated, loginWithRedirect]);

  // if (!isAuthenticated) {
  //   return null;
  // }

  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <MainLayout>
            <Routes />
          </MainLayout>
        </BrowserRouter>
      </MuiThemeProvider>
    </Provider>
  );
};

export default App;
