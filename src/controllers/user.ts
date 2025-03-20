import { NextFunction, Request, Response } from "express";
import UserService from "../services/user";
import { IUserBody, QueryStrategy } from "../types";
import { InvalidBodyError } from "../errors";
import UserEmailQueryStrategy from "../repository/userEmailQuery";

export default class UserController {
  #service: UserService;

  constructor(service: UserService) {
    this.#service = service;
  }

  register = async (req: Request, res: Response, next: NextFunction) => {
    const user: IUserBody = req.body;
    const user_creation = await this.#service.register(user);

    if(user_creation instanceof Error){
      return next(user_creation);
    }

    res.status(201).send('User created successfuly');
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    const user: IUserBody = req.body;

    let strategy: QueryStrategy;

    if(user.email){
      strategy = new UserEmailQueryStrategy(user.email);
    } else{
      return next(new InvalidBodyError({}));
    }
    
    const user_logged = await this.#service.login(strategy, user);

    if(user_logged instanceof Error){
      return next(user_logged);
    }

    res.status(200).send(user_logged);
  }

}