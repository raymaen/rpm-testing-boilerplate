import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core';
import configureStore from './store';
import Routes from './Routes';
import MainLayout from './components/layout/MainLayout';
import theme from './util/theme';
import './pages/Layout.css';
import { useAuth0 } from './components/auth/auth0-context';
import FullScreenLoader from './components/common/FullScreenLoader';
import Login from './pages/Login';

export const store = configureStore();

const App: React.FC = () => {
  const { isLoading, user, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (!isLoading && !user) {
    return <Login />;
  }

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
