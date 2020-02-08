import { Configuration } from './configuration.interface';

export const configDev: Configuration = {
  db: 'mongodb://localhost:27017/gplay',
  gmailUser: '123',
  gmailPass: '123123',
  auth0: {
    secret: 'kZtfLioyOeYHnZLC3SdftaAp8VkzYDILuxA2ANzP-yA4iKD-5YNJ0jZuuI6TD3LC',
    clientId: '1vFCOSBg0gi50JLiakfWodtBiOuPEhyQ',
    domain: 'dev-p1bcyvqc.auth0.com',
  },
};
