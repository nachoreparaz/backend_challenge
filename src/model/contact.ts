import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/postgres";
import { IContactAttributes, IContactCreationAttributes, IAddressAttributes, IAddressCreationAttributes } from "../types";

class Contact extends Model<IContactAttributes, IContactCreationAttributes> implements IContactAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public birthdate!: Date;
  public phone!: string;
  public profile_image!: Buffer | null;
  public company!: string;
  public active!: boolean;
  address !: Address;
}

Contact.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    profile_image: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'contacts',
  }
);

class Address extends Model<IAddressAttributes, IAddressCreationAttributes> implements IAddressAttributes {
  public id!: number;
  public street!: string;
  public number!: number;
  public city!: string;
  public country!: string;
  public contactId!: number;
}

Address.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'addresses',
  }
);


Contact.hasOne(Address, { foreignKey: "contactId", as: "address" });
Address.belongsTo(Contact, { foreignKey: "contactId", as: "contact" });

Contact.sync().then(() => {
Address.sync().then(() => console.log('Address model sync successfuly')).catch((err) => console.log('\nError model sync\n', err));
}).catch((err) => console.log('\nError model sync:\n', err));

export {
  Address,
  Contact
};