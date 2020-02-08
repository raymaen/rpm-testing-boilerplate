import * as GooglePlayScraper from 'google-play-scraper';
import { Injectable } from '@nestjs/common';
import { Game } from './interfaces/game.interface';

@Injectable()
export class GplayService {
  async createNewGame(appId: string): Promise<Game> {
    console.log(appId);
    const data = await GooglePlayScraper.app({
      appId: appId,
    });

    const game: Game = {
      appId,
      data,
      status: 'Pending',
    };

    return game;
  }
}
