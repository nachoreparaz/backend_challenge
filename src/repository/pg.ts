import { CreateOptions, FindOptions, Model, ModelStatic } from "sequelize";

export default class PosgresRepository<T extends Model> {
  #model: ModelStatic<T>;

  constructor(model: ModelStatic<T>){
    this.#model = model;
  }

  async findById(id: number, options ?: FindOptions){
    return await this.#model.findOne({
      where: { id }, 
      ...options,
    });
  }

  async create (contact: T["_creationAttributes"], options ?: CreateOptions): Promise<T>{
    return await this.#model.create(contact, options);
  }
}