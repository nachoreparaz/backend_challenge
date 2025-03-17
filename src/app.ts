import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import { CONFIG } from './utils/config';

import initPgDb from './database/postgres';
import initRedisCache from './database/redis';
import { Contact } from './model/contact';
import { NotFound } from './errors';
import ContactService from './services/contact';
import ContactRepository from './repository/contact';
import ContactController from './controllers/contact';
import ContactRouter from './routes/contact';
import Validations from './middleware/validations';
import { IError } from './types';

const app = express();

app.use(express.json());
app.use(helmet());

initPgDb();
initRedisCache();

const contactRepository = new ContactRepository(Contact);
const contactService = new ContactService(contactRepository);
const contactController = new ContactController(contactService);

const validationMiddleware = new Validations();

const contactRouter = new ContactRouter(contactController, validationMiddleware);

app.use('/challenge', contactRouter.getRouter());


app.use(function (req, res, next) {
  next(new NotFound({}));
});

app.use((err: IError, _req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

app.listen(CONFIG.PORT, async () => {
  console.log(`Server listening on port: ${CONFIG.PORT}`);
});