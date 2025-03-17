import { CreateOptions, FindOptions, Model, ModelStatic, UpdateOptions } from "sequelize";
import { IContactUpdateBody } from "../types";

export default class PosgresRepository<T extends Model> {
  #model: ModelStatic<T>;

  constructor(model: ModelStatic<T>){
    this.#model = model;
  }

  async findById(id: number, options ?: FindOptions){
    return await this.#model.findOne({
      where: { 
        id,
        active: true
      }, 
      ...options,
    });
  }

  async create (contact: T["_creationAttributes"], options ?: CreateOptions){
    return await this.#model.create(contact, options);
  }

  async update (id: number, contact: IContactUpdateBody){
    return await this.#model.update(contact, {
      where: { id },
    } as UpdateOptions);
  }
}