import { CreateOptions, FindOptions, Model, ModelStatic, UpdateOptions, WhereOptions } from "sequelize";
import { IContactAttributes, IContactUpdateBody } from "../types";

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
      where: { 
        id,
        active: true,
      }as WhereOptions<IContactAttributes>
    });
  }

  async deactivate (id: number){
    return await this.#model.update({
      active: false
    }, {
      where: { id },
    } as UpdateOptions);
  }
}