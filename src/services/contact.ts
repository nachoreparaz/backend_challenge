import ContactRepository from "../repository/contact";
import { IContactCreationBody, IContactUpdateBody, QueryStrategy } from "../types";

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

  delete = async (id: number) => {
    try {
      await this.#repository.deleteContact(id);
    } catch (error) {
      return error;
    }
  }

  customFindAll = async (strategy: QueryStrategy) => {
    try {
      return await this.#repository.customRetrieveAll(strategy);
    } catch (error) {
      return error;
    }
  }

  customFindOne = async (strategy: QueryStrategy) => {
    try {
      return await this.#repository.customRetrieveOne(strategy);
    } catch (error) {
      return error;
    }
  }

}