import PosgresRepository from "./pg";
import { Address, Contact } from "../model/contact";
import { IContactRepository, IContactCreationBody, IContactUpdateBody, QueryStrategy } from "../types";
import { FindOptions, UniqueConstraintError }  from "sequelize";
import { NotFound, SequelizeError, SequelizeUniqueConstraintError } from "../errors";

export default class ContactRepository extends PosgresRepository<InstanceType<typeof Contact>> implements IContactRepository{

  retrieveById = async (id: number): Promise<IContactCreationBody> => {
    try {
      const contact = await this.findById({id, active: true}, { include: [{ model: Address, as: "address" }]});
      if(!contact) throw new NotFound({
        message: `Contact Not Found: ${id}`,
        logMessage: `Contact Not Found: ${id}`,
        serviceName: 'ContactRepository retrieveById'
      });

      return this.mapResponseFromPg(contact);
    } catch (error) {
      if(error instanceof NotFound){
        throw error;
      }
      throw new SequelizeError({});
    }
  }

  createContact = async (contact: IContactCreationBody): Promise<IContactCreationBody> => {
    try {
      const contact_creation = await this.create(contact, { include: [{ model: Address, as: "address" }]});
      return this.mapResponseFromPg(contact_creation);
    } catch (error) {
      if(error instanceof UniqueConstraintError){
        const message = error.errors[0].message;
        throw new SequelizeUniqueConstraintError({
          message: message,
          logMessage: message
        })
      }
      throw new SequelizeError({});
    }
  }

  updateContact = async (id: number, contact: IContactUpdateBody): Promise<void> => {
    try {
      const contact_updated = await this.update({id, active: true}, contact);
      if(contact_updated[0] === 0){
        throw new NotFound({
          message: `Contact Not Found: ${id}`,
          logMessage: `Contact Not Found: ${id}`,
          serviceName: 'ContactRepository retrieveById'
        });
      }
    } catch (error) {
      if(error instanceof UniqueConstraintError){
        const message = error.errors[0].message;
        throw new SequelizeUniqueConstraintError({
          message: message,
          logMessage: message
        })
      }
      if(error instanceof NotFound) throw error;

      throw new SequelizeError({});
    }
  }

  deleteContact = async (id: number): Promise<void> => {
    try {
      await this.deactivate(id);
    } catch (error) {
      if(error instanceof NotFound){
        throw error;
      }
      throw new SequelizeError({});
    }
  }

  customRetrieveAll = async (strategy: QueryStrategy) => {
    try {
      const contacts = await this.customFindAll(strategy);
      return contacts.map(contact => this.mapResponseFromPg(contact));
    } catch (error) {
      throw new SequelizeError({});
    }
  }

  customRetrieveOne = async (strategy: QueryStrategy) => {
    try {
      const contact = await this.customFindOne(strategy);
      if(!contact) throw new NotFound({
        message: `Contact Not Found`,
        logMessage: `Contact Not Found`,
        serviceName: 'ContactRepository customRetrieveOne'
      });

      return this.mapResponseFromPg(contact);
    } catch (error) {
      if(error instanceof NotFound){
        throw error;
      }
      throw new SequelizeError({});
    }
  }

  mapResponseFromPg = (contact: Contact): IContactCreationBody => {
    return {
      name: contact.name,
      email: contact.email,
      birthdate: contact.birthdate,
      phone: contact.phone,
      profile_image: contact.profile_image,
      company: contact.company,
      address: {
        street: contact.address.street,
        number: contact.address.number,
        city: contact.address.city,
        country: contact.address.country,
      }
    }
  }

}