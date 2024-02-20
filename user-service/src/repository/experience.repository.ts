import { IExperienceModel } from "../models/interfaces/experience.interface";
import ExperienceModel from "../models/experience.model";
import {
  ExperienceInput,
  UpdateExperienceInput,
} from "../models/dto/experience.dto";

export class ExperienceRepository {
  async addExperience({
    userId,
    jobTitle,
    company,
    startDate,
    endDate,
    location,
    description,
  }: ExperienceInput): Promise<IExperienceModel> {
    return (await ExperienceModel.create({
      user_id: userId,
      job_title: jobTitle,
      company: company,
      start_date: startDate,
      end_date: endDate,
      location: location,
      description: description,
    })) as IExperienceModel;
  }

  async findExperience(
    userId: string,
    experienceId: string
  ): Promise<IExperienceModel> {
    const experience = await ExperienceModel.findOne({
      _id: experienceId,
      user_id: userId,
    }).select("-__v");
    if (!experience) throw new Error("No User Experience Found");
    return experience as IExperienceModel;
  }

  async getAllExperiences(userId: string): Promise<IExperienceModel[]> {
    return await ExperienceModel.find({ user_id: userId }, "-__v -user_id");
  }

  async updateExperience(
    experienceId: string,
    {
      userId,
      jobTitle,
      company,
      startDate,
      endDate,
      location,
      description,
    }: UpdateExperienceInput
  ) {
    await this.findExperience(userId, experienceId);

    return (await ExperienceModel.findByIdAndUpdate(
      experienceId,
      {
        job_title: jobTitle,
        company: company,
        start_date: startDate,
        end_date: endDate,
        location: location,
        description: description,
      },
      { new: true }
    )) as IExperienceModel;
  }

  async deleteExperience(userId: string, experienceId: string) {
    return ExperienceModel.deleteOne({ _id: experienceId, user_id: userId });
  }
}
