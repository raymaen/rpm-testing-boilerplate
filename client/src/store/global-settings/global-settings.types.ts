import { GlobalSettings, UniqueId } from '../../types';

export const SET_LOADING = 'SET_LOADING';
export const SELECT_RPM = 'SELECT_RPM';

export type GlobalSettingsState = GlobalSettings;

export interface SetLoading {
  type: typeof SET_LOADING;
  payload: boolean;
}

export interface SelectRpm {
  type: typeof SELECT_RPM;
  payload: UniqueId;
}

export type GlobalSettingActionTypes = SetLoading | SelectRpm;
