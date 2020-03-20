import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './rootReducer';
import { setLoading } from './global-settings/global-settings.actions';
import { SET_LOADING } from './global-settings/global-settings.types';

export type AppState = ReturnType<typeof rootReducer>;

const save = ({ dispatch, getState }: any) => (next: any) => (action: any) => {
  next(action);
  localStorage.setItem('app-state', JSON.stringify(getState()));

  if (!getState().globalSettings.loading && action.type !== SET_LOADING) {
    tick({ dispatch, getState });
  }
};

/** Send state to api, 
 * for an acummelated changes 
 * occuring over a 3 second span */
const tick = ({ dispatch, getState }: any) => {
  dispatch(setLoading(true));

  setTimeout(() => {
    dispatch(setLoading(false));
    console.log(getState());
    // dispatch(sendStateToApi)
  }, 3000);
};

const configureStore = () => {
  const middlewares = [thunkMiddleware, save];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(
    rootReducer,
    composeWithDevTools(middleWareEnhancer)
  );

  return store;
};

export default configureStore;
