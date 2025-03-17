import PosgresRepository from "./pg";
import { Address, Contact } from "../model/contact";
import { IContactRepository, IContactCreationBody, IContactUpdateBody } from "../types";
import { UniqueConstraintError }  from "sequelize";
import { NotFound, SequelizeError, SequelizeUniqueConstraintError } from "../errors";

export default class ContactRepository extends PosgresRepository<InstanceType<typeof Contact>> implements IContactRepository{

  retrieveById = async (id: number): Promise<IContactCreationBody> => {
    try {
      const contact = await this.findById(id, { include: [{ model: Address, as: "address" }]});
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
      await this.update(id, contact);
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

  deleteContact = async (id: number): Promise<void> => {
    try {
      
    } catch (error) {
      
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