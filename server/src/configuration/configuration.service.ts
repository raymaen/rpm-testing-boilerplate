import { Injectable } from '@nestjs/common';
import { Configuration } from './configuration.interface';
import { configProd } from './production';
import { configDev } from './development';

@Injectable()
export class ConfigurationService {
  get(): Configuration {
    return process.env.NODE_ENV === 'production' ? configProd : configDev;
  }
}
