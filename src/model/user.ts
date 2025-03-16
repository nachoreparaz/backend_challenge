import { DataTypes } from "sequelize";
import { sequelize } from "../database/postgres";
import Address from "./address";

/*
name, company,
profile image, email, birthdate, phone number (work, personal) and address.
*/

const User = sequelize.define(
  'User',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profile_image: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }
)

User.hasMany(Address, { foreignKey: 'userId' });
User.sync().then().catch(() => console.log('Error model sync'));

export default User;