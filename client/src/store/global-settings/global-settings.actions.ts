import { SET_LOADING, SELECT_RPM } from './global-settings.types';
import { UniqueId } from '../../types';

export const setLoading = (loading?: boolean) => {
  return {
    type: SET_LOADING,
    payload: loading || false
  };
};

export const selectRpm = (id: UniqueId | null) => {
  return {
    type: SELECT_RPM,
    payload: id
  };
};
