import { ConfigurationService } from './configuration/configuration.service';
import { ConfigurationModule } from './configuration/configuration.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from './shared/shared.module';
import { GameModule } from './games/game.module';
import { MailerModule } from './mailer/mailer.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    GameModule,
    SharedModule,
    ConfigurationModule,
    MongooseModule.forRootAsync({
      imports: [ConfigurationModule],
      useFactory: async (configurationService: ConfigurationService) => ({
        uri: configurationService.get().db,
      }),
      inject: [ConfigurationService],
    }),
    MailerModule,
    UserModule,
  ],
})
export class AppModule {}
