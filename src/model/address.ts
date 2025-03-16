import { DataTypes } from "sequelize";
import { sequelize } from "../database/postgres";
import User from "./user";

const Address = sequelize.define(
  'Address',
  {
    street: {
      type: DataTypes.STRING,
      allowNull: false
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }
)

Address.belongsTo(User, { foreignKey: 'userId' })
Address.sync().then().catch(() => console.log('Error model sync'));

export default Address;