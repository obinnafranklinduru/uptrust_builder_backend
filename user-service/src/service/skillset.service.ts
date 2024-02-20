import { Request } from "express";
import { plainToClass } from "class-transformer";
import { SuccessResponse, ErrorResponse } from "../utility/response";
import { SkillSetRepository } from "../repository/skillset.repository";
import { SkillsetInput, UpdateSkillsetInput } from "../models/dto/skillset.dto";
import { AppValidationError } from "../utility/errors";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class SkillSetService {
  repository: SkillSetRepository;
  constructor(repository: SkillSetRepository) {
    this.repository = repository;
  }

  async AddUserSkillSet(request: Request) {
    try {
      const payload = request.user;
      if (!payload) return ErrorResponse(403, "authorization failed!");
      const input = plainToClass(SkillsetInput, request.body);
      const error = await AppValidationError(input);
      if (error) return ErrorResponse(400, error);
      const data = await this.repository.addSkilllSet({
        userId: payload._id as string,
        name: input.name,
        level: input.level,
        description: input.description,
      });
      return SuccessResponse(data);
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }

  async GetUserSkillSetById(request: Request) {
    try {
      const payload = request.user;
      if (!payload) return ErrorResponse(403, "authorization failed!");
      const result = await this.repository.findSkillSet(
        payload._id as string,
        request.params.id
      );
      return SuccessResponse(result);
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }

  async UpdateUserSkillSetById(request: Request) {
    try {
      const payload = request.user;
      if (!payload) return ErrorResponse(403, "authorization failed!");
      const input = plainToClass(UpdateSkillsetInput, request.body);
      const error = await AppValidationError(input);
      if (error) return ErrorResponse(400, error);
      const data = await this.repository.UpdatSkilllSet(request.params.id, {
        userId: payload._id as string,
        name: input.name,
        level: input.level,
        description: input.description,
      });
      return SuccessResponse(data);
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }
  async DeleteUserSkillSetById(request: Request) {
    try {
      const payload = request.user;
      if (!payload) return ErrorResponse(403, "authorization failed!");
      const result = await this.repository.DeleteSkillSet(
        payload._id as string,
        request.params.id
      );
      return SuccessResponse(result);
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }
}
