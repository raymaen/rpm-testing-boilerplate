import { Rpm } from '../../types';
import { RpmState, RpmActionTypes } from './rpm.types';
import {
  ADD_RPM,
  DELETE_RPM,
  EDIT_TITLE,
  EDIT_DESCRIPTION,
  EDIT_ITEMS
} from './rpm.types';

const saved = localStorage.getItem('app-state');

const initialState: Rpm[] = saved ? (JSON.parse(saved).rpm as RpmState) : [];

export function rpmReducer(
  rpms = initialState,
  action: RpmActionTypes
): RpmState {
  switch (action.type) {
    case ADD_RPM:
      return [...rpms, action.payload];

    case DELETE_RPM:
      return rpms.filter(rpm => rpm.id !== action.payload);

    case EDIT_TITLE:
      return rpms.map(rpm =>
        rpm.id === action.payload.id
          ? { ...rpm, title: action.payload.title }
          : rpm
      );

    case EDIT_DESCRIPTION:
      return rpms.map(rpm =>
        rpm.id === action.payload.id
          ? { ...rpm, description: action.payload.description }
          : rpm
      );

    case EDIT_ITEMS:
      return rpms.map(rpm =>
        rpm.id === action.payload.id
          ? { ...rpm, items: action.payload.items }
          : rpm
      );

    default:
      return rpms;
  }
}
