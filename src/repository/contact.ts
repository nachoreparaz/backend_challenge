import PosgresRepository from "./pg";
import { Address, Contact } from "../model/contact";
import { IContactRepository, IContactCreationBody } from "../types";
import { UniqueConstraintError }  from "sequelize";
import { SequelizeError, SequelizeUniqueConstraintError } from "../errors";

export default class ContactRepository extends PosgresRepository<InstanceType<typeof Contact>> implements IContactRepository{

  createContact = async (contact: IContactCreationBody): Promise<IContactCreationBody> => {
    try {
      const contact_creation = await this.create(contact, {
        include: [{ model: Address, as: "address" }],
      });
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