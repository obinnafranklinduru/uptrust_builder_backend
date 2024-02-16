import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUserModel } from "../models/interfaces/user.interface";

const APP_SECRET = process.env.APP_SECRET || "app_secret";

export const GetSalt = async () => {
  return await bcrypt.genSalt();
};

export const GetHashedPassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt);
};

export const ValidatePassword = async (
  enteredPassword: string,
  savedPassword: string,
  salt: string
) => {
  return (await GetHashedPassword(enteredPassword, salt)) === savedPassword;
};

export const GetToken = ({ _id, email, phone }: Partial<IUserModel>) => {
  return jwt.sign(
    {
      _id,
      email,
      phone,
    },
    APP_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

export const VerifyToken = async (
  token: string
): Promise<IUserModel | false> => {
  try {
    if (token !== "") {
      const payload = await jwt.verify(token.split(" ")[1], APP_SECRET);
      return payload as IUserModel;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
