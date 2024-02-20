import { Request } from "express";
import { plainToClass } from "class-transformer";
import { SuccessResponse, ErrorResponse } from "../utility/response";
import { SocialHandlerRepository } from "../repository/socialhandler.repository";
import { SocialHandlerInput } from "../models/dto/socialhandler.dto";
import { AppValidationError } from "../utility/errors";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class SocialHandlerService {
  repository: SocialHandlerRepository;
  constructor(repository: SocialHandlerRepository) {
    this.repository = repository;
  }

  async AddUserSocialHandler(request: Request) {
    try {
      const payload = request.user;
      if (!payload) return ErrorResponse(403, "authorization failed!");
      const input = plainToClass(SocialHandlerInput, request.body);
      const error = await AppValidationError(input);
      if (error) return ErrorResponse(400, error);
      const data = await this.repository.addSocialHandler({
        userId: payload._id as string,
        facebook: input.facebook,
        linkedin: input.linkedin,
        twitter: input.twitter,
        portfolioUrl: input.portfolioUrl,
        githubUrl: input.githubUrl,
      });
      return SuccessResponse(data);
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }

  async GetUserSocialHandlerById(request: Request) {
    try {
      const payload = request.user;
      if (!payload) return ErrorResponse(403, "authorization failed!");
      const input = plainToClass(SocialHandlerInput, request.body);
      const error = await AppValidationError(input);
      if (error) return ErrorResponse(404, error);
      const data = await this.repository.findSocialHandler(
        payload._id as string
      );
      return SuccessResponse(data);
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }

  async UpdateUserSocialHandlerById(request: Request) {
    try {
      const payload = request.user;
      if (!payload) return ErrorResponse(403, "authorization failed!");
      const input = plainToClass(SocialHandlerInput, request.body);
      const error = await AppValidationError(input);
      if (error) return ErrorResponse(400, error);
      const data = await this.repository.updateSocialHandler({
        userId: payload._id as string,
        facebook: input.facebook,
        linkedin: input.linkedin,
        twitter: input.twitter,
        portfolioUrl: input.portfolioUrl,
        githubUrl: input.githubUrl,
      });
      return SuccessResponse(data);
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }
  async DeleteUserSocialHandlerById(request: Request) {
    try {
      const payload = request.user;
      if (!payload) return ErrorResponse(403, "authorization failed!");
      const result = await this.repository.deleteSocialHandler(
        payload._id as string
      );
      return SuccessResponse(result);
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }
}
