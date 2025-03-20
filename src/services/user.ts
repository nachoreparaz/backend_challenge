import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import UserRepository from "../repository/user";
import { IUserBody, QueryStrategy } from "../types";
import { AuthError, GeneralError } from '../errors';

import { CONFIG } from '../utils/config';

export default class UserService {
  #repository: UserRepository;

  constructor(repository: UserRepository) {
    this.#repository = repository;
  }

  register = async (user: IUserBody) => {
    try {
      user.password = await this.hashPassword(user.password);
      await this.#repository.register(user);
    } catch (error) {
      return error;
    }
  }

  login = async (strategy: QueryStrategy, user: IUserBody) => {
    try {
      const user_db = await this.#repository.login(strategy);
      const password_validation = await this.valitadePassword(user.password, user_db.password)
      if(!password_validation) throw new AuthError({});
      return this.generateJWT(user_db.id);
    } catch (error) {
      return error;
    }
  }

  hashPassword = async (password: string) =>{
    try {
      return await bcrypt.hash(password, Number(CONFIG.SALT));
    } catch (error) {
      throw new GeneralError({
        logMessage: 'Error while hashing password',
        serviceName: 'hashPassword'
      });
    }
  } 

  valitadePassword = async (password: string, db_password: string) => {
    return await bcrypt.compare(password, db_password);
  }

  generateJWT = (id: number) => {
    return jwt.sign({ id }, CONFIG.JWT_SECRET, { expiresIn: '1h' });
  }
}