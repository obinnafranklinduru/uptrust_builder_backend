import { ISocialHandlerModel } from "../models/interfaces/socialhandler.interface";
import SocialHandlerModel from "../models/socialhandler.model";
import { SocialHandlerInput } from "../models/dto/socialhandler.dto";

export class SocialHandlerRepository {
  async addSocialHandler({
    userId,
    facebook,
    linkedin,
    twitter,
    portfolioUrl,
    githubUrl,
  }: SocialHandlerInput): Promise<ISocialHandlerModel> {
    const result = await SocialHandlerModel.find({ user_id: userId });
    if (result.length >= 1)
      throw new Error("You have added social handler model already");
    return (await SocialHandlerModel.create({
      user_id: userId,
      facebook,
      linkedin,
      twitter,
      portfolio_url: portfolioUrl,
      github_url: githubUrl,
    })) as ISocialHandlerModel;
  }

  async findSocialHandler(userId: string): Promise<ISocialHandlerModel> {
    return (await SocialHandlerModel.findOne({ user_id: userId }).select(
      "-__v -_id -user_id"
    )) as ISocialHandlerModel;
  }

  async updateSocialHandler({
    userId,
    facebook,
    linkedin,
    twitter,
    portfolioUrl,
    githubUrl,
  }: SocialHandlerInput) {
    await this.findSocialHandler(userId);
    return (await SocialHandlerModel.findOneAndUpdate(
      {
        facebook,
        linkedin,
        twitter,
        portfolio_url: portfolioUrl,
        github_url: githubUrl,
      },
      { upsert: false, new: true }
    )) as ISocialHandlerModel;
  }

  async deleteSocialHandler(userId: string) {
    return await SocialHandlerModel.deleteOne({ user_id: userId });
  }
}
