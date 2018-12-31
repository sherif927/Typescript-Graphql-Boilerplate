import * as bcryptjs from 'bcryptjs';
import { prop, Typegoose, pre } from 'typegoose';
import { emailRegex, Gender } from '../utils-constants/Constants';

@pre<User>('save', function (next) {
  bcryptjs.hash(this.password, 10, (err, hash) => {
    this.createdAt = new Date();
    this.password = hash;
    next();
  });
})

export default class User extends Typegoose {

  @prop({ required: true })
  name: string;

  @prop({ required: true, unique: true, match: emailRegex })
  email: string;

  @prop({ required: true, minlength: 6 })
  password: string;

  @prop({ minlength: 10, maxlength: 13 })
  phoneNumber: string;

  @prop()
  createdAt: Date;

  @prop()
  age?: number;

  @prop({ enum: Gender })
  gender?: Gender;
}