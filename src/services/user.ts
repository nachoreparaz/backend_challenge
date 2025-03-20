import crypto from 'crypto';
import UserRepository from "../repository/user";
import { IUserBody } from "../types";

export default class UserService {
  #repository: UserRepository;

  constructor(repository: UserRepository) {
    this.#repository = repository;
  }

  register = async (user: IUserBody) => {
    try {
      user.password = this.hashPassword(user.password);
      await this.#repository.register(user);
    } catch (error) {
      return error;
    }
  }

  hashPassword = (password: string) =>{
    const salt = crypto.randomBytes(16).toString("hex");
    return crypto.pbkdf2Sync(password, salt, 10000, 64, "sha256").toString("hex");
  } 
}