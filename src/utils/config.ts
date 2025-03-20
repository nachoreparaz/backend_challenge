import dotenv from 'dotenv';
dotenv.config();

export const CONFIG = {
  PORT: process.env.PORT,
  DB_NAME: process.env.DB_NAME || '',
  DB_USER: process.env.DB_USER || '',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
  REDIS_PORT: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
  DB_HOST: process.env.DB_HOST,
  JWT_SECRET: process.env.JWT_SECRET || 'default_secret',
  JWT_EXPIRED: process.env.JWT_EXPIRES_IN || '1h',
  SALT: process.env.SALT || 10
}