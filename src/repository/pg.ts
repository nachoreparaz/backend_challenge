import { CreateOptions, Model, ModelStatic } from "sequelize";

export default class PosgresRepository<T extends Model> {
  #model: ModelStatic<T>;

  constructor(model: ModelStatic<T>){
    this.#model = model;
  }

  async create (contact: T["_creationAttributes"], options ?: CreateOptions): Promise<T>{
    return await this.#model.create(contact, options);
  }
}