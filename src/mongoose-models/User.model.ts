import { Schema } from "mongoose";
import { Model, Document, model } from "mongoose";
import * as bcrypt from "bcryptjs";

/**
 User schema that will be used to define its respective model
 */
const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  createdAt: { type: Date, default: Date.now }
});


/**
 ** The actual model for the user
 *
 * @export
 * @interface UserModel
 * @extends {Document}
 */

export interface UserModel extends Document {
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
  created_at?: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}


UserSchema.pre("save", (next) => {
  bcrypt.hash(this.password, 10, (err, hash) => {
    this.password = hash;
    next();
  });
});

UserSchema.pre("update", (next) => {
  bcrypt.hash(this.password, 10, (err, hash) => {
    this.password = hash;
    next();
  });
});

export const User: Model<UserModel> = model<UserModel>('User', UserSchema);
