import { NextFunction, Request, Response } from "express";
import ContactService from "../services/contact";
import { IContactCreationBody, QueryStrategy } from "../types";
import CityQueryStrategy from "../repository/cityQuery";
import { InvalidBodyError } from "../errors";
import EmailQueryStrategy from "../repository/emailQuery";
import PhoneQueryStrategy from "../repository/phoneQuery";

export default class ContactController {
  #service: ContactService;

  constructor(service: ContactService){
    this.#service = service;
  }

  get = async (req: Request, res: Response, next: NextFunction) => {
    const { contactId } = req.params;

    const parsedContactId = Number(contactId);
    const contact = await this.#service.retrieveById(parsedContactId);

    if(contact instanceof Error){
      return next(contact);
    }

    res.status(200).send(contact);
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    const contact: IContactCreationBody = req.body;
    const contact_creation = await this.#service.create(contact);

    if(contact_creation instanceof Error){
      return next(contact_creation);
    }

    res.status(201).send(contact_creation);
  }

  update = async(req: Request, res: Response, next: NextFunction) => {
    const { contactId } = req.params;
    const contact = req.body;

    const parsedContactId = Number(contactId);
    const contact_update = await this.#service.update(parsedContactId, contact);

    if(contact_update instanceof Error){
      return next(contact_update);
    }

    res.sendStatus(200);
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    const { contactId } = req.params;

    const parsedContactId = Number(contactId);
    const contact_delete = await this.#service.delete(parsedContactId);

    if(contact_delete instanceof Error){
      return next(contact_delete);
    }

    res.sendStatus(204);
  }

  customGetAll = async (req: Request, res: Response, next: NextFunction) => {
    const { city } = req.body;

    let strategy: QueryStrategy;

    if(city){
      strategy = new CityQueryStrategy(city);
    }else{
      return next(new InvalidBodyError({}));
    }

    const contact = await this.#service.customFindAll(strategy);

    if(contact instanceof Error){
      return next(contact);
    }

    res.status(200).send(contact);
  }

  customGetOne = async (req: Request, res: Response, next: NextFunction) => {
    const { email, phone } = req.body;

    let strategy: QueryStrategy;

    if(email){
      strategy = new EmailQueryStrategy(email);
    }else if(phone){
      strategy = new PhoneQueryStrategy(phone);
    } else{
      return next(new InvalidBodyError({}));
    }
    
    const contact = await this.#service.customFindOne(strategy);

    if(contact instanceof Error){
      return next(contact);
    }

    res.status(200).send(contact);
  }
}