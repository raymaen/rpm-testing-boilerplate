import {
  ADD_RPM,
  DELETE_RPM,
  EDIT_DESCRIPTION,
  EDIT_TITLE,
  EDIT_ITEMS
} from './rpm.types';
import uuid from 'uuid';
import { RpmDto, UniqueId, Item } from '../../types';

export const addRpm = (rpm: RpmDto) => ({
  type: ADD_RPM,
  payload: { ...rpm, id: uuid() }
});

export const deleteRpm = (id: UniqueId) => ({
  type: DELETE_RPM,
  payload: id
});

export const editTitle = (id: UniqueId, title: string) => ({
  type: EDIT_TITLE,
  payload: { id, title }
});

export const editDescription = (id: UniqueId, description: string) => ({
  type: EDIT_DESCRIPTION,
  payload: { id, description }
});

export const editItems = (id: UniqueId, items: Item[]) => ({
  type: EDIT_ITEMS,
  payload: { id, items }
});
