import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/postgres";
import { IUserAttributes, IUserCreationAttributes } from "../types";

class User extends Model<IUserAttributes, IUserCreationAttributes> implements IUserAttributes {
  public id!: number;
  public email!: string;
  public password!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: 'users',
  }
);

User.sync().then(() => console.log('User model sync successfuly')).catch((err) => console.log('\nError model sync\n', err));

export { User };