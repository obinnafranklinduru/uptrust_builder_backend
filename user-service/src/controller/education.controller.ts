import { container } from "tsyringe";
import { Request, Response, NextFunction } from "express";
import { EducationService } from "../service/education.service";

const service = container.resolve(EducationService);

export const CreateUserEducation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await service.AddUserEdcation(req);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const GetEducationById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await service.GetUserEducationById(req);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const UpdateEducationById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await service.UpdateUserEducationById(req);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const DeleteEducationById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await service.DeleteUserEducationById(req);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
