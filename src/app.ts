import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import { CONFIG } from './utils/config';

import initPgDb from './database/postgres';
import initRedisCache from './database/redis';
import { Contact } from './model/contact';
import { NotFound, errorHandler } from './errors';
import ContactService from './services/contact';
import ContactRepository from './repository/contact';
import ContactController from './controllers/contact';
import ContactRouter from './routes/contact';
import Validations from './middleware/validations';
import UserRepository from './repository/user';
import { User } from './model/user';
import UserService from './services/user';
import UserController from './controllers/user';
import UserRouter from './routes/user';
import validateJWT from './utils/validateJWT';

const app = express();

app.use(express.json());
app.use(helmet());

console.clear();
initPgDb();
initRedisCache();

const userRepository = new UserRepository(User);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const validationMiddleware = new Validations();

const userRouter = new UserRouter(userController, validationMiddleware);

app.use('/users', userRouter.getRouter());

app.use(validateJWT);

const contactRepository = new ContactRepository(Contact);
const contactService = new ContactService(contactRepository);
const contactController = new ContactController(contactService);


const contactRouter = new ContactRouter(contactController, validationMiddleware);

app.use('/challenge', contactRouter.getRouter());


app.use(function (req, res, next) {
  next(new NotFound({}));
});

app.use(errorHandler);

app.listen(CONFIG.PORT, async () => {
  console.log(`Server listening on port: ${CONFIG.PORT}`);
});