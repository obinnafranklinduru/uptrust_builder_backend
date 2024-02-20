import { Request } from "express";
import { plainToClass } from "class-transformer";
import { SuccessResponse, ErrorResponse } from "../utility/response";
import { ExperienceRepository } from "../repository/experience.repository";
import {
  ExperienceInput,
  UpdateExperienceInput,
} from "../models/dto/experience.dto";
import { AppValidationError } from "../utility/errors";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class ExperienceService {
  repository: ExperienceRepository;
  constructor(repository: ExperienceRepository) {
    this.repository = repository;
  }

  async AddUserExperience(request: Request) {
    try {
      const payload = request.user;
      if (!payload) return ErrorResponse(403, "authorization failed!");
      const input = plainToClass(ExperienceInput, request.body);
      const error = await AppValidationError(input);
      if (error) return ErrorResponse(400, error);
      const data = await this.repository.addExperience({
        userId: payload._id as string,
        jobTitle: input.jobTitle,
        company: input.company,
        startDate: input.startDate,
        endDate: input.endDate,
        location: input.location,
        description: input.description,
      });
      return SuccessResponse(data);
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }

  async GetUserExperienceById(request: Request) {
    try {
      const payload = request.user;
      if (!payload) return ErrorResponse(403, "authorization failed!");
      const result = await this.repository.findExperience(
        payload._id as string,
        request.params.id
      );
      return SuccessResponse(result);
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }

  async UpdateUserExperienceById(request: Request) {
    try {
      const payload = request.user;
      if (!payload) return ErrorResponse(403, "authorization failed!");
      const input = plainToClass(UpdateExperienceInput, request.body);
      const error = await AppValidationError(input);
      if (error) return ErrorResponse(400, error);
      const data = await this.repository.updateExperience(request.params.id, {
        userId: payload._id as string,
        jobTitle: input.jobTitle,
        company: input.company,
        startDate: input.startDate,
        endDate: input.endDate,
        location: input.location,
        description: input.description,
      });
      return SuccessResponse(data);
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }

  async DeleteUserExperienceById(request: Request) {
    try {
      const payload = request.user;
      if (!payload) return ErrorResponse(403, "authorization failed!");
      const result = await this.repository.deleteExperience(
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
