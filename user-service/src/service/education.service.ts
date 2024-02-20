import { Request } from "express";
import { plainToClass } from "class-transformer";
import { SuccessResponse, ErrorResponse } from "../utility/response";
import { EducationRepository } from "../repository/education.repository";
import {
  EducationInput,
  UpdateEducationInput,
} from "../models/dto/education.dto";
import { AppValidationError } from "../utility/errors";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class EducationService {
  repository: EducationRepository;
  constructor(repository: EducationRepository) {
    this.repository = repository;
  }

  async AddUserEdcation(request: Request) {
    try {
      const payload = request.user;
      if (!payload) return ErrorResponse(403, "authorization failed!");
      const input = plainToClass(EducationInput, request.body);
      const error = await AppValidationError(input);
      if (error) return ErrorResponse(400, error);
      const data = await this.repository.addEducation({
        userId: payload._id as string,
        degree: input.degree,
        institution: input.institution,
        fieldofstudy: input.fieldofstudy,
        startYear: input.startYear,
        endYear: input.endYear,
        institutionWebsite: input.institutionWebsite,
        description: input.description,
      });
      return SuccessResponse(data);
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }

  async GetUserEducationById(request: Request) {
    try {
      const payload = request.user;
      if (!payload) return ErrorResponse(403, "authorization failed!");
      const result = await this.repository.findEducation(
        payload._id as string,
        request.params.id
      );
      return SuccessResponse(result);
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }

  async UpdateUserEducationById(request: Request) {
    try {
      const payload = request.user;
      if (!payload) return ErrorResponse(403, "authorization failed!");
      const input = plainToClass(UpdateEducationInput, request.body);
      const error = await AppValidationError(input);
      if (error) return ErrorResponse(404, error);
      const data = await this.repository.updateEducation(request.params.id, {
        userId: payload._id as string,
        degree: input.degree,
        institution: input.institution,
        fieldofstudy: input.fieldofstudy,
        startYear: input.startYear,
        endYear: input.endYear,
        institutionWebsite: input.institutionWebsite,
        description: input.description,
      });
      return SuccessResponse(data);
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }

  async DeleteUserEducationById(request: Request) {
    try {
      const payload = request.user;
      if (!payload) return ErrorResponse(403, "authorization failed!");
      const result = await this.repository.deleteEducation(
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
