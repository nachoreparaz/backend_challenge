import { Address } from "../model/contact";
import { QueryStrategy } from "../types";

export default class CityQueryStrategy implements QueryStrategy {
  private city: string;

  constructor(city: string) {
    this.city = city;
  }

  buildQuery(): object {
    return {
      where:{
        active: true,
        "$address.city$": this.city
      },
      include: [{ model: Address, as: "address" }]
    };
  }
}