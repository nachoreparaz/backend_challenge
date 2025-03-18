import { Address } from "../model/contact";
import { QueryStrategy } from "../types";

export default class EmailQueryStrategy implements QueryStrategy {
  private email: string;

  constructor(email: string) {
    this.email = email;
  }

  buildQuery(): object {
    return {
      where:{
        email: this.email
      },
      include: [{ model: Address, as: "address" }]
    };
  }
}