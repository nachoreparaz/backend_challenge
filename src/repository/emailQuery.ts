import { Address } from "../model/contact";
import { QueryStrategy } from "../types";

export default class EmailQueryStrategy implements QueryStrategy {
  public email: string;

  constructor(email: string) {
    this.email = email;
  }

  buildQuery(): object {
    return {
      where:{
        email: this.email,
        active: true,
      },
      include: [{ model: Address, as: "address" }]
    };
  }
}