import { ISkillSetModel } from "../models/interfaces/skillset.interface";
import SkillSetModel from "../models/skillset.model";
import { SkillsetInput, UpdateSkillsetInput } from "../models/dto/skillset.dto";

export class SkillSetRepository {
  async addSkilllSet({
    userId,
    name,
    level,
    description,
  }: SkillsetInput): Promise<ISkillSetModel> {
    return (await SkillSetModel.create({
      user_id: userId,
      name,
      level,
      description,
    })) as ISkillSetModel;
  }

  async findSkillSet(userId: string, skillSetId: string) {
    const skillSet = await SkillSetModel.findOne({
      user_id: userId,
      _id: skillSetId,
    }).select("-__v");

    if (!skillSet) throw new Error("no user'SkillSet found!");
    return skillSet as ISkillSetModel;
  }

  async getAllSkillSets(userId: string): Promise<ISkillSetModel[]> {
    return await SkillSetModel.find({ user_id: userId }, "-__v -user_id");
  }

  async UpdatSkilllSet(
    skillSetId: string,
    { userId, name, level, description }: UpdateSkillsetInput
  ) {
    await this.findSkillSet(userId, skillSetId);
    return (await SkillSetModel.findByIdAndUpdate(
      skillSetId,
      {
        name,
        level,
        description,
      },
      { new: true }
    )) as ISkillSetModel;
  }

  async DeleteSkillSet(userId: string, skillSetId: string) {
    return await SkillSetModel.deleteOne({ user_id: userId, _id: skillSetId });
  }
}
