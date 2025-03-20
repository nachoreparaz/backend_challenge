import { NextFunction, Request, Response } from "express";
import UserService from "../services/user";
import { IUserBody } from "../types";

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

}