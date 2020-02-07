import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './rootReducer';

export type AppState = ReturnType<typeof rootReducer>;

function save({ dispatch, getState }: any) {
  return (next: any) => (action: any) => {
    next(action);
    localStorage.setItem('app-state', JSON.stringify(getState()));
  };
}

export default function configureStore() {
  const middlewares = [thunkMiddleware, save];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(
    rootReducer,
    composeWithDevTools(middleWareEnhancer)
  );

  return store;
}
