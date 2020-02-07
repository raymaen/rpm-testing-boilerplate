import {
  GlobalSettingsState,
  GlobalSettingActionTypes,
  SET_LOADING,
  SELECT_RPM
} from './global-settings.types';

const initialState: GlobalSettingsState = {
  loading: false,
  selectedRpm: null
};

export function globalSettingsReducer(
  gloablSettings = initialState,
  action: GlobalSettingActionTypes
): GlobalSettingsState {
  switch (action.type) {
    case SET_LOADING:
      return { ...gloablSettings, loading: action.payload };

    case SELECT_RPM:
      return { ...gloablSettings, selectedRpm: action.payload };

    default:
      return gloablSettings;
  }
}
