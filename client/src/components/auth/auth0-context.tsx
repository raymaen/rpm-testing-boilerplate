import React, { Component, createContext, useContext } from 'react';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js';
import authConfig from '../../auth_config.json';
import axios from 'axios';

interface IAuth0Context {
  isAuthenticated?: boolean;
  user?: any;
  isLoading?: boolean;
  handleRedirectCallback?: () => void;
  getIdTokenClaims?: (...p: any) => any;
  loginWithRedirect?: (...p: any) => any;
  getTokenSilently?: (...p: any) => any;
  logout?: (...p: any) => any;
}

interface RequestJsonParamConfig {
  url?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: any;
  data?: any;
  successMessage?: string;
  errorMessage?: string;
}

const defaultConfig: RequestJsonParamConfig = {
  url: '',
  method: 'GET',
  data: {},
  headers: {}
};

interface IHttpContext {
  requestJSON: (config: RequestJsonParamConfig) => Promise<any>;
}

// create the context
export const Auth0Context: any = createContext<IAuth0Context | null>(null);
export const useAuth0: any = () => useContext(Auth0Context);

export const HttpContext: any = createContext<IHttpContext | null>(null);
export const useHttp: any = () => useContext(HttpContext);

interface IState {
  auth0Client: any;
  isLoading: boolean;
  isAuthenticated: boolean;
  user?: any;
}

// create a provider
export class Auth0Provider extends Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      isAuthenticated: false,
      user: null,
      auth0Client: Auth0Client
    };
  }

  config: Auth0ClientOptions = {
    domain: authConfig.domain,
    client_id: authConfig.clientId,
    redirect_uri: window.location.origin
  };

  componentDidMount() {
    this.initializeAuth0();
  }

  // initialize the auth0 library
  initializeAuth0 = async () => {
    const auth0Client = await createAuth0Client(this.config);
    this.setState({ auth0Client });

    // check to see if they have been redirected after login
    if (window.location.search.includes('code=')) {
      return this.handleRedirectCallback();
    }

    const isAuthenticated = await auth0Client.isAuthenticated();
    const user = isAuthenticated ? await auth0Client.getUser() : null;
    this.setState({ isLoading: false, isAuthenticated, user });
  };

  handleRedirectCallback = async () => {
    this.setState({ isLoading: true });

    await this.state.auth0Client.handleRedirectCallback();
    const user = await this.state.auth0Client.getUser();

    this.setState({ user, isAuthenticated: true, isLoading: false });
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  enhancedRequestJson = async (
    config: RequestJsonParamConfig = defaultConfig
  ): Promise<any> => {
    try {
      const accessToken = await this.state.auth0Client.getIdTokenClaims();
      const {
        method,
        url,
        headers,
        data,
        successMessage,
        errorMessage
      } = config;

      console.log(accessToken);

      /**
       *     
        const response = await axios({
        method,
        url: `/api/${url}`,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          authorization: `Bearer ${accessToken.__raw}`,
          ...headers
        },
        data
      });


      console.log(response);
      return response;
       */
    } catch (error) {
      // Notificatoin error message
    }
  };

  render() {
    const { auth0Client, isLoading, isAuthenticated, user } = this.state;
    const { children } = this.props;

    const Auth0ContextConfigObject = {
      isLoading,
      isAuthenticated,
      user,
      loginWithRedirect: (...p: any) => auth0Client.loginWithRedirect(...p),
      getTokenSilently: (...p: any) => auth0Client.getTokenSilently(...p),
      getIdTokenClaims: (...p: any) => auth0Client.getIdTokenClaims(...p),
      logout: (...p: any) => auth0Client.logout(...p)
    };

    const HttpContextConfigObject = {
      requestJSON: (p: RequestJsonParamConfig) => this.enhancedRequestJson(p)
    };

    return (
      <Auth0Context.Provider value={Auth0ContextConfigObject}>
        <HttpContext.Provider value={HttpContextConfigObject}>
          {children}
        </HttpContext.Provider>
      </Auth0Context.Provider>
    );
  }
}
