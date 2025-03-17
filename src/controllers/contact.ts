import { NextFunction, Request, Response } from "express";
import ContactService from "../services/contact";
import { IContactCreationBody } from "../types";

export default class ContactController {
  #service: ContactService;

  constructor(service: ContactService){
    this.#service = service;
  }
  
  create = async (req: Request, res: Response, next: NextFunction) => {
    const contact: IContactCreationBody = req.body;
    const contact_creation = await this.#service.create(contact);

    if(contact_creation instanceof Error){
      next(contact_creation);
    }

    res.status(201).send(contact_creation);
  }
}