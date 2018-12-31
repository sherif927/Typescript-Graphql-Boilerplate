import User from "../typegoose-models/User.model";

export default interface IUserService {
  hello(): string;
  createUser(user: User): Promise<boolean>;
  login(email: string, password: string): Promise<boolean>;
}