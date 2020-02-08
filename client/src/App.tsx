import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core';
import configureStore from './store';
import Routes from './Routes';
import MainLayout from './components/layout/MainLayout';
import theme from './util/theme';

import './pages/Layout.css';
import SecurityWrapper from './components/auth/SecurityWrapper';

export const store = configureStore();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
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
