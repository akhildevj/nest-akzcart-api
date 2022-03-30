import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  port: process.env.PORT,
  pg: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
}));
