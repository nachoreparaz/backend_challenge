import { NextFunction, Request, Response } from "express";
import { IAddressCreationAttributesBody } from "../types";
import { InputError } from "../errors";

export default class Validations {
  postContactBody = (req: Request, _res: Response, next: NextFunction): void => {
    const contact = req.body;
    this.validateName(contact.name);
    this.validateEmail(contact.email);
    this.validatePhone(contact.phone);
    this.validateCompany(contact.company);
    this.validateBirthdate(contact.birthdate);
    this.validateAddress(contact.address);

    next();
  }

  validateName = (name: string) => {
    if(!name) throw new InputError({
      message: 'Must complete field: name',
      logMessage: 'Must complete field: name',
      serviceName: 'Validations - validateName'
    });
  }

  validateEmail = (email: string) => {
    if(!email) throw new InputError({
      message: 'Must complete field: email',
      logMessage: 'Must complete field: email',
      serviceName: 'Validations - validateEmail'
    });
  }

  validatePhone = (phone: string) => {
    if(!phone) throw new InputError({
      message: 'Must complete field: phone',
      logMessage: 'Must complete field: phone',
      serviceName: 'Validations - validatePhone'
    });
  }

  validateCompany = (company: string) => {
    if(!company) throw new InputError({
      message: 'Must complete field: company',
      logMessage: 'Must complete field: company',
      serviceName: 'Validations - validateCompany'
    });
  }

  validateBirthdate = (birthdate: Date) => {
    if(!birthdate) throw new InputError({
      message: 'Must complete field: birthdate',
      logMessage: 'Must complete field: birthdate',
      serviceName: 'Validations - validateBirthdate'
    });

    birthdate = new Date(birthdate);
  }

  validateAddress = (address: IAddressCreationAttributesBody) => {
    if(!address) throw new InputError({
      message: 'Must complete field: address',
      logMessage: 'Must complete field: address',
      serviceName: 'Validations - validateAddress'
    });

    if(!address.city || !address.country || !address.number || !address.street){
      if(!address) throw new InputError({
        message: 'One of the following fields are empty: city, country, number, street',
        logMessage: 'One of the following fields are empty: city, country, number, street',
        serviceName: 'Validations - validateAddress'
      });
    }
  }
}