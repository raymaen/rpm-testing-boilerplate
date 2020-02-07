import { combineReducers } from 'redux';
import { reducer as notifications } from 'react-notification-system-redux';
import { globalSettingsReducer } from './global-settings/global-settings.reducer';
import { rpmReducer } from './rpm/rpm.reducer';

export const rootReducer = combineReducers({
  rpm: rpmReducer,
  globalSettings: globalSettingsReducer,
  notifications
});
