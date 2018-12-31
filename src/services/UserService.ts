import * as Bcrypt from 'bcryptjs';
import * as Jwt from 'jsonwebtoken';
import IUserService from "../interfaces/IUserService";
import User from "../typegoose-models/User.model";
import GenericRepository from "../repository/GenericRepository";
import mailHelper from "../api-helper/mail.helper";

class UserService implements IUserService {

  async login(email: string, password: string): Promise<boolean> {
    const repo = GenericRepository.create(User);
    const user = await repo.findOne({ email });
    const valid = await Bcrypt.compare(password, user.password);
    return valid;
  }

  async createUser(user: User): Promise<boolean> {
    const repo = GenericRepository.create(User);
    try {
      const dbRes = await repo.insert(user);
      const callbackUrl = await mailHelper.createConfirmEmailLink(process.env['BASE_URL']);
      const response = await mailHelper.sendConfirmationEmail(callbackUrl, user.email, user.name);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }


  hello(): string {
    return 'Hello';
  }
}

export default new UserService();