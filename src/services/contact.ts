import ContactRepository from "../repository/contact";
import { IContactCreationBody, IContactUpdateBody } from "../types";

export default class ContactService {
  #repository: ContactRepository;

  constructor(repository: ContactRepository){
    this.#repository = repository;
  }
  retrieveById = async (id: number) => {
    try {
      return await this.#repository.retrieveById(id);
    } catch (error) {
      return error;
    }
  }
  create = async (contact: IContactCreationBody) => {
    try {
      return await this.#repository.createContact(contact);
    } catch (error) {
      return error;
    }
  }

  update = async (id: number, contact: IContactUpdateBody) => {
    try {
      await this.#repository.updateContact(id, contact);
    } catch (error) {
      return error;
    }
  }
}