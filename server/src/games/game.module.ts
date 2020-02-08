import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { GameSchema } from './schemas/game.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { GplayService } from './gplay.service';
import { MailerModule } from '../mailer/mailer.module';
import { MailerService } from '../mailer/mailer.service';

@Module({
  controllers: [GameController],
  providers: [GameService, GplayService, MailerService],
  imports: [
    MailerModule,
    MongooseModule.forFeature([{ name: 'Game', schema: GameSchema }]),
  ],
})
export class GameModule {}
