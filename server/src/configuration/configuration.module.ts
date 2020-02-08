import { ConfigurationService } from './configuration.service';
import { Module, Global } from '@nestjs/common';

@Global()
@Module({
  providers: [ConfigurationService],
  exports: [ConfigurationService],
})
export class ConfigurationModule {}
