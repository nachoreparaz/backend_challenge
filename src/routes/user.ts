import { Router } from "express";
import UserController from "../controllers/user";
import * as ROUTES from './const'
import Validations from "../middleware/validations";

export default class UserRouter {
  #controller: UserController;
  validations: Validations;
  router: Router;

  constructor(controller: UserController, validations: Validations){
    this.#controller = controller;
    this.validations = validations;
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes = () => {
    this.router.post(ROUTES.REGISTER, this.validations.validateUserRegistration, this.#controller.register);
  }

  public getRouter() {
    return this.router;
  }
}