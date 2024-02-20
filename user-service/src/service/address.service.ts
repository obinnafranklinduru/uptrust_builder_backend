import { Request } from "express";
import { plainToClass } from "class-transformer";
import { SuccessResponse, ErrorResponse } from "../utility/response";
import { AddressRepository } from "../repository/address.repository";
import { AddressInput, UpdateAddressInput } from "../models/dto/address.dto";
import { AppValidationError } from "../utility/errors";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class AddressService {
  repository: AddressRepository;
  constructor(repository: AddressRepository) {
    this.repository = repository;
  }

  async AddUserAddress(request: Request) {
    try {
      const payload = request.user;
      if (!payload) return ErrorResponse(403, "authorization failed!");
      const input = plainToClass(AddressInput, request.body);
      const error = await AppValidationError(input);
      if (error) return ErrorResponse(400, error);
      const data = await this.repository.addAddress({
        userId: payload._id as string,
        addressLine1: input.addressLine1,
        addressLine2: input.addressLine2,
        city: input.city,
        postCode: input.postCode,
        country: input.country,
      });
      return SuccessResponse(data);
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }

  async GetUserAddressById(request: Request) {
    try {
      const payload = request.user;
      if (!payload) return ErrorResponse(403, "authorization failed!");
      const result = await this.repository.findAddress(payload._id as string);
      return SuccessResponse(result);
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }

  async UpdateUserAddressById(request: Request) {
    try {
      const payload = request.user;
      if (!payload) return ErrorResponse(403, "authorization failed!");
      const input = plainToClass(UpdateAddressInput, request.body);
      const error = await AppValidationError(input);
      if (error) return ErrorResponse(400, error);
      const data = await this.repository.updateAddress({
        userId: payload._id as string,
        addressLine1: input.addressLine1,
        addressLine2: input.addressLine2,
        city: input.city,
        postCode: input.postCode,
        country: input.country,
      });
      return SuccessResponse(data);
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }

  async DeleteUserAddressById(request: Request) {
    try {
      const payload = request.user;
      if (!payload) return ErrorResponse(403, "authorization failed!");
      const result = await this.repository.deleteddress(payload._id as string);
      return SuccessResponse(result);
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }
}
