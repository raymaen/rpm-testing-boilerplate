import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core';
import configureStore from './store';
import Routes from './Routes';
import MainLayout from './components/layout/MainLayout';
import SecurityWrapper from './components/auth/SecurityWrapper';
import AuthCallbackRoute from './components/auth/AuthCallbackRoute';
import theme from './util/theme';
import './pages/Layout.css';

export const store = configureStore();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <AuthCallbackRoute />
          <SecurityWrapper>
            <MainLayout>
              <Routes />
            </MainLayout>
          </SecurityWrapper>
        </BrowserRouter>
      </MuiThemeProvider>
    </Provider>
  );
};

export default App;
