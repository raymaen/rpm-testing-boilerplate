export interface Item {
  id: UniqueId;
  done: boolean;
  title: string;
}

export interface Rpm {
  id: UniqueId;
  title: string;
  description: string;
  items: Item[];
  color: string;
}

export type RpmDto = Omit<Rpm, 'id'>;

export type GameStatus = 'Pending' | 'Sent' | 'Replied';

export type UniqueId = string;

export interface GlobalSettings {
  loading: boolean;
  selectedRpm: UniqueId | null;
}
