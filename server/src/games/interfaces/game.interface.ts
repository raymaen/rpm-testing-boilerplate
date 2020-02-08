export interface Game {
  data: any;
  status: GameStatus;
  appId: string;
}

export type GameStatus = 'Pending' | 'Sent' | 'Replied';
