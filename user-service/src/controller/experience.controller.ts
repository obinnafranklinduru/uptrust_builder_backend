import { container } from "tsyringe";
import { Request, Response, NextFunction } from "express";
import { ExperienceService } from "../service/experience.service";

const service = container.resolve(ExperienceService);

export const CreateUserExperience = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await service.AddUserExperience(req);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const GetExperienceById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await service.GetUserExperienceById(req);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const UpdateExperienceById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await service.UpdateUserExperienceById(req);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const DeleteEdxperienceById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await service.DeleteUserExperienceById(req);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
