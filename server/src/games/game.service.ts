import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Game } from './interfaces/game.interface';
import { CreateGameDto } from './dto/create-game.dto';
import { GplayService } from './gplay.service';
import { UpdateGameDto } from './dto/update-game.dto';
import { MailerService } from '../mailer/mailer.service';

@Injectable()
export class GameService {
  constructor(
    @InjectModel('Game') private readonly gameModel: Model<Game>,
    private readonly gplayService: GplayService,
    private readonly mailerService: MailerService,
  ) {}

  async findAll(): Promise<Game[]> {
    return await this.gameModel.find().exec();
  }

  async findGame(id: any): Promise<Game> {
    return await this.gameModel
      .findById(typeof id === 'string' ? id : id.id)
      .exec();
  }

  async update(updateGameDto: UpdateGameDto, id: string): Promise<Game> {
    const updatedGame = await this.gameModel.findById(id).exec();
    updatedGame.status = updateGameDto.status;
    return await updatedGame.save();
  }

  async create(createGameDto: CreateGameDto): Promise<Game> {
    const game = await this.gplayService.createNewGame(createGameDto.id);
    const createdGame = new this.gameModel(game);
    return await createdGame.save();
  }

  async delete(id: string): Promise<any> {
    return await this.gameModel.findByAndDelete({ _id: id }).exec();
  }

  async sendEmail(id: string): Promise<any> {
    const game = await this.findGame(id);

    try {
      await this.mailerService.sendMail('eylonhh@gmail.com'); //game.data.developerEmail
    } catch (error) {
      throw error;
    }
  }
}
