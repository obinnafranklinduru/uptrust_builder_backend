import "express";
import { Request, Response, NextFunction } from "express";
import { VerifyToken } from "../utility/password";
import { IUserModel } from "../models/interfaces/user.interface";

declare module "express" {
  interface Request {
    user?: IUserModel;
  }
}

export const authUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization;
    if (!token) throw new Error("no access token found!");

    const payload = await VerifyToken(token);

    if (payload) {
      req.user = payload;
      return next();
    } else {
      res.status(403).json({ message: "failed", data: "Invalid Token" });
    }
  } catch (error) {
    next(error);
  }
};
