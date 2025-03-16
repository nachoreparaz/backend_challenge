import Redis from 'ioredis';
import { CONFIG } from '../utils/config';

export const redis = new Redis({
  host: CONFIG.REDIS_HOST,
  port: CONFIG.REDIS_PORT,
  db: 0,
});
const initRedisCache = () => {
  
  redis.on('connect', () => {
    console.log('Conectado a Redis');
  });
  
  redis.on('error', (err) => {
    console.error('Error en Redis:', err);
  });
}

export default initRedisCache;