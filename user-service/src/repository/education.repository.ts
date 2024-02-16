import { IEducationModel } from "../models/interfaces/education.interface";
import EducationModel from "../models/education.model";
import {
  EducationInput,
  UpdateEducationInput,
} from "../models/dto/education.dto";

export class EducationRepository {
  async addEducation({
    userId,
    degree,
    institution,
    fieldofstudy,
    startYear,
    endYear,
    institutionWebsite,
    description,
  }: EducationInput): Promise<IEducationModel> {
    return (await EducationModel.create({
      user_id: userId,
      degree,
      institution,
      fieldofstudy,
      start_year: startYear,
      end_year: endYear,
      institution_website: institutionWebsite,
      description,
    })) as IEducationModel;
  }

  async findEducation(
    userId: string,
    educationId: string
  ): Promise<IEducationModel> {
    const education = await EducationModel.findOne({
      _id: educationId,
      user_id: userId,
    }).select("-__v");
    if (!education) throw new Error("no user's education found!");
    return education as IEducationModel;
  }

  async getAllEducations(userId: string): Promise<IEducationModel[]> {
    return await EducationModel.find({ user_id: userId }, "-__v -user_id");
  }

  async updateEducation(
    educationId: string,
    {
      userId,
      degree,
      institution,
      fieldofstudy,
      startYear,
      endYear,
      institutionWebsite,
      description,
    }: UpdateEducationInput
  ) {
    await this.findEducation(userId, educationId);

    return (await EducationModel.findByIdAndUpdate(
      educationId,
      {
        degree,
        institution,
        fieldofstudy,
        start_year: startYear,
        end_year: endYear,
        institution_website: institutionWebsite,
        description,
      },
      { new: true }
    )) as IEducationModel;
  }

  async deleteEducation(userId: string, educationId: string) {
    return await EducationModel.deleteOne({
      user_id: userId,
      _id: educationId,
    });
  }
}
