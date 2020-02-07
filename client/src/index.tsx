import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import history from './util/history';
import { Auth0Provider } from './react-auth0-spa';
import config from './auth_config.json';

const onRedirectCallback = (appState: any) => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};
ReactDOM.render(
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback as () => void}
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);
