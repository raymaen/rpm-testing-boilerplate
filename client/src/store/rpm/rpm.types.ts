import { Rpm, UniqueId, Item } from '../../types';

export const ADD_RPM = 'ADD_RPM';
export const DELETE_RPM = 'DELETE_RPM';
export const EDIT_TITLE = 'EDIT_TITLE';
export const EDIT_DESCRIPTION = 'EDIT_DESCRIPTION';
export const EDIT_ITEMS = 'EDIT_ITEMS';

export interface AddRpm {
  type: typeof ADD_RPM;
  payload: Rpm;
}

export interface DeleteRpm {
  type: typeof DELETE_RPM;
  payload: UniqueId;
}

export interface EditTitle {
  type: typeof EDIT_TITLE;
  payload: { id: UniqueId; title: string };
}

export interface EditDescription {
  type: typeof EDIT_DESCRIPTION;
  payload: { id: UniqueId; description: string };
}

export interface EditItems {
  type: typeof EDIT_ITEMS;
  payload: { id: UniqueId; items: Item[] };
}

export type RpmState = Rpm[];

export type RpmActionTypes =
  | AddRpm
  | DeleteRpm
  | EditTitle
  | EditDescription
  | EditItems;
