import ContactRepository from "../repository/contact";
import { IContactCreationBody } from "../types";

export default class ContactService {
  #repository: ContactRepository;

  constructor(repository: ContactRepository){
    this.#repository = repository;
  }

  create = async (contact: IContactCreationBody) => {
    try {
      return await this.#repository.createContact(contact);
    } catch (error) {
      return error;
    }
  }
}