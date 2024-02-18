import mongoose, { Schema } from "mongoose";
import { IUserModel } from "./interfaces/user.interface";

const userSchema: Schema = new Schema(
  {
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    verification_code: { type: Number },
    expiry: { type: String },
    verified: { type: Boolean, default: false },
    first_name: { type: String },
    last_name: { type: String },
    profile_pic: { type: String },
    headline: { type: String },
  },
  { timestamps: true }
);

const UserModel = mongoose.model<IUserModel>("User", userSchema);

export default UserModel;
