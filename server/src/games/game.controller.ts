import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { Game } from './interfaces/game.interface';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Controller('api/games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get()
  async findAll(): Promise<Game[]> {
    return this.gameService.findAll();
  }

  @Post()
  async create(@Body() createGameDto: CreateGameDto): Promise<Game> {
    console.log(createGameDto);
    return await this.gameService.create(createGameDto);
  }

  @Get(':id')
  async findGame(@Param() id): Promise<Game> {
    return this.gameService.findGame(id);
  }

  @Post('update/:id')
  async updateGameStatus(
    @Param() id,
    @Body() updateGameDto: UpdateGameDto,
  ): Promise<Game> {
    return await this.gameService.update(updateGameDto, id);
  }

  @Post('send-email/:id')
  async sendEmail(@Param() id): Promise<void> {
    await this.gameService.sendEmail(id);
  }
}
