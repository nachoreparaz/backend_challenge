import express from 'express';
import helmet from 'helmet';
import { CONFIG } from './utils/config';

const app = express();

app.use(express.json());
app.use(helmet());

app.listen(CONFIG.PORT, async () => {
  console.log(`Server listening on port: ${CONFIG.PORT}`);
});