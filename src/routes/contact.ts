import { Router } from "express";
import ContactController from "../controllers/contact";
import * as ROUTES from './const'
import Validations from "../middleware/validations";

export default class ContactRouter {
  #controller: ContactController;
  validations: Validations;
  router: Router;

  constructor(controller: ContactController, validations: Validations){
    this.#controller = controller;
    this.validations = validations;
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes = () => {
    this.router.get('/health', (_req, res) => { res.send('Welcome') });
    this.router.get(ROUTES.GET_BY_CITY, this.validations.validateCity, this.#controller.customGetAll)
    this.router.get(ROUTES.GET_CONTACT, this.validations.validateId, this.#controller.get);
    this.router.post(ROUTES.CREATE_CONTACT, this.validations.postContactBody, this.#controller.create);
    this.router.patch(ROUTES.UPDATE_CONTACT, this.validations.validateId, this.#controller.update);
    this.router.delete(ROUTES.DELETE_CONTACT, this.validations.validateId, this.#controller.delete);
  }

  public getRouter() {
    return this.router;
  }
}