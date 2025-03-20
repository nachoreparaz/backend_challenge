import EmailQueryStrategy from "./emailQuery";

export default class UserEmailQueryStrategy extends EmailQueryStrategy {
  buildQuery(): object {
    return {
      where: {
        email: this.email
      }
    };
  }
}