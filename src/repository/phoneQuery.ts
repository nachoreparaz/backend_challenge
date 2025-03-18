import { Address } from "../model/contact";
import { QueryStrategy } from "../types";

export default class PhoneQueryStrategy implements QueryStrategy {
  private phone: string;

  constructor(phone: string) {
    this.phone = phone;
  }

  buildQuery(): object {
    return {
      where:{
        phone: this.phone
      },
      include: [{ model: Address, as: "address" }]
    };
  }
}