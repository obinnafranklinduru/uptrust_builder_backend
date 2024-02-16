import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { UserService } from "../service/user.service";

const service = container.resolve(UserService);

export const SignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await service.CreateUser(req);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const Login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await service.UserLogin(req);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const GetVerificationCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await service.GetVerificationToken(req);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const Verify = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await service.VerifyUser(req);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const EditUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await service.UpdateUser(req);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const ForgottenUserPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await service.ForgottenPassword(req);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const ResetUserPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await service.ResetPassword(req);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const GetUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await service.GetProfile(req);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
