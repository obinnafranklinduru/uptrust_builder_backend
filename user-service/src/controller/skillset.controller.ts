import { container } from "tsyringe";
import { Request, Response, NextFunction } from "express";
import { SkillSetService } from "../service/skillset.service";

const service = container.resolve(SkillSetService);

export const CreateUserSkillset = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await service.AddUserSkillSet(req);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const GetSkillSetById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await service.GetUserSkillSetById(req);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const UpdateSkillSetById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await service.UpdateUserSkillSetById(req);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const DeleteSkillSetById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await service.DeleteUserSkillSetById(req);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
