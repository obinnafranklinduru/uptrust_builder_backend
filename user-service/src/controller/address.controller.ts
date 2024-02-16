import { container } from "tsyringe";
import { Request, Response, NextFunction } from "express";
import { AddressService } from "../service/address.service";

const service = container.resolve(AddressService);

export const CreateUserAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await service.AddUserAddress(req);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const GetAddressById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await service.GetUserAddressById(req);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const UpdateAddressById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await service.UpdateUserAddressById(req);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const DeleteAddressById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await service.DeleteUserAddressById(req);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
