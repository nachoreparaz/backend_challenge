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
      return error as Error;
    }
  }
  create = async (contact: IContactCreationBody) => {
    try {
      return await this.#repository.createContact(contact);
    } catch (error) {
      return error as Error;
    }
  }

  update = async (id: number, contact: IContactUpdateBody): Promise<void | Error> => {
    try {
      await this.#repository.updateContact(id, contact);
    } catch (error) {
      return error as Error;
    }
  }

  delete = async (id: number) => {
    try {
      await this.#repository.deleteContact(id);
    } catch (error) {
      return error as Error;
    }
  }

  customFindAll = async (strategy: QueryStrategy)=> {
    try {
      return await this.#repository.customRetrieveAll(strategy);
    } catch (error) {
      return error as Error;
    }
  }

  customFindOne = async (strategy: QueryStrategy) => {
    try {
      return await this.#repository.customRetrieveOne(strategy);
    } catch (error) {
      return error as Error;
    }
  }

}