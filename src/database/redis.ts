import Redis from 'ioredis';
import { CONFIG } from '../utils/config';

const initRedisCache = () => {
  const redis = new Redis({
    host: 'localhost',
    port: 6379,
    db: 0,
  });
  
  redis.on('connect', () => {
    console.log('Conectado a Redis');
  });
  
  redis.on('error', (err) => {
    console.error('Error en Redis:', err);
  });
}

export default initRedisCache;