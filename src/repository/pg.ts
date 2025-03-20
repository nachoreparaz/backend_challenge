import { CreateOptions, FindOptions, Model, ModelStatic, UpdateOptions, WhereOptions } from "sequelize";
import { IContactAttributes, IContactUpdateBody, IUserAttributes, QueryStrategy } from "../types";

export default class PosgresRepository<T extends Model> {
  #model: ModelStatic<T>;

  constructor(model: ModelStatic<T>){
    this.#model = model;
  }

  async findById(whereCluse: WhereOptions<IContactAttributes | IUserAttributes>, options ?: FindOptions){
    return await this.#model.findOne({
      where: whereCluse, 
      ...options,
    });
  }

  async create (contact: T["_creationAttributes"], options ?: CreateOptions){
    return await this.#model.create(contact, options);
  }

  async update (whereCluse: WhereOptions<IContactAttributes | IUserAttributes>, contact: IContactUpdateBody){
    return await this.#model.update(contact, {
      where: whereCluse as WhereOptions<IContactAttributes>
    });
  }

  async deactivate (id: number){
    return await this.#model.update({
      active: false
    }, {
      where: { id },
    } as UpdateOptions);
  }

  async customFindAll(queryBuilder: QueryStrategy){
    const query = queryBuilder.buildQuery();
    return await this.#model.findAll(query);
  }

  async customFindOne(queryBuilder: QueryStrategy){
    const query = queryBuilder.buildQuery();
    return await this.#model.findOne(query);
  }
}