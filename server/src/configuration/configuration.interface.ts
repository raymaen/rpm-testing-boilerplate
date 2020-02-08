export interface Configuration {
  db: string;
  gmailUser: string;
  gmailPass: string;
  auth0: {
    clientId: string;
    secret: string;
    domain: string;
  };
}
