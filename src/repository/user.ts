import { UniqueConstraintError } from "sequelize";
import { User } from "../model/user";
import PosgresRepository from "./pg";
import { SequelizeError, SequelizeUniqueConstraintError } from "../errors";
import { IUserBody } from "../types";

export default class UserRepository extends PosgresRepository<InstanceType<typeof User>> {
  register = async (user: IUserBody) => {
    try {
      await this.create(user);
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
}