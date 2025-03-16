import express from 'express';
import helmet from 'helmet';
import { CONFIG } from './utils/config';

import initPgDb from './database/postgres';
import initRedisCache from './database/redis';

const app = express();

app.use(express.json());
app.use(helmet());

initPgDb();
initRedisCache();

app.listen(CONFIG.PORT, async () => {
  console.log(`Server listening on port: ${CONFIG.PORT}`);
});