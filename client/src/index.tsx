import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider as AppAuthProvider } from './components/auth/auth0-context';

ReactDOM.render(
  <AppAuthProvider>
    <App />
  </AppAuthProvider>,
  document.getElementById('root')
);
