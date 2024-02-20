import { container } from "tsyringe";
import { Request, Response, NextFunction } from "express";
import { SocialHandlerService } from "../service/socialHandler.service";

const service = container.resolve(SocialHandlerService);

export const CreateUserSocialHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await service.AddUserSocialHandler(req);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const GetSocialHandlerById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await service.GetUserSocialHandlerById(req);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const UpdateSocialHandlerById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await service.UpdateUserSocialHandlerById(req);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const DeleteSocialHandlerById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await service.DeleteUserSocialHandlerById(req);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
