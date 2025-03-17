import { Optional } from "sequelize";

export interface IContactRepository {
  createContact: (contact: IContactCreationBody) => Promise<IContactCreationBody>;
}

export interface IContactAttributes {
  id: number;
  name: string;
  email: string;
  birthdate: Date;
  phone: string;
  profile_image: Buffer | null;
  company: string;
  active: boolean;
};

export interface IContactCreationAttributes extends Optional<IContactAttributes, 'id' | 'active'> {};

export interface IAddressAttributes {
  id: number;
  street: string;
  number: number;
  city: string;
  country: string;
  contactId: number;
};

export interface IAddressCreationAttributes extends Optional<IAddressAttributes, 'id'> {};
export interface IAddressCreationAttributesBody extends Optional<IAddressAttributes, 'id' | 'contactId'> {};

export interface IContactCreationBody extends Optional<IContactAttributes, 'id' | 'active'> {
  address: IAddressCreationAttributesBody
};

export interface IError {
  message?: string;
  logMessage?: string;
  statusCode?: number;
  serviceName?: string;
};