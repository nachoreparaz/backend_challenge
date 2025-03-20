import { UniqueConstraintError } from "sequelize";
import { User } from "../model/user";
import PosgresRepository from "./pg";
import { NotFound, SequelizeError, SequelizeUniqueConstraintError } from "../errors";
import { IUserBody, QueryStrategy } from "../types";

export default class UserRepository extends PosgresRepository<InstanceType<typeof User>> {
  register = async (user: IUserBody) => {
    try {
      await this.create(user);
    } catch (error) {
      console.log('======\nREGISTER ERROR: ',error)
      SequelizeUniqueConstraintError
      if(error instanceof UniqueConstraintError){
        const message = error.errors[0].message;
        throw new SequelizeUniqueConstraintError({
          message: 'User already exists',
          logMessage: message
        })
      }
      throw new SequelizeError({});
    }
  }

  login = async (strategy: QueryStrategy) => {
    try {
      const user = await this.customFindOne(strategy);
      if(!user) throw new NotFound({
        message: `Contact Not Found`,
        logMessage: `Contact Not Found`,
        serviceName: 'ContactRepository customRetrieveOne'
      });

      return user;
    } catch (error) {
      console.log(error)
      if(error instanceof NotFound){
        throw error;
      }
      throw new SequelizeError({});
    }
  }
}