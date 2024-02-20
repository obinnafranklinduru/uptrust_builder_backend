import { IUserModel } from "../models/interfaces/user.interface";
import UserModel from "../models/user.model";
import { AddressRepository } from "../repository/address.repository";
import { EducationRepository } from "../repository/education.repository";
import { ExperienceRepository } from "../repository/experience.repository";
import { PaymentRepository } from "../repository/payment.repository";
import { SkillSetRepository } from "../repository/skillset.repository";
import { SocialHandlerRepository } from "../repository/socialhandler.repository";
import { UserInput } from "../models/dto/user.dto";

const respository = {
  address: new AddressRepository(),
  education: new EducationRepository(),
  experience: new ExperienceRepository(),
  payment: new PaymentRepository(),
  skillset: new SkillSetRepository(),
  socialHandler: new SocialHandlerRepository(),
};

export class UserRepository {
  async createAccount({
    phone,
    email,
    password,
    salt,
  }: Partial<IUserModel>): Promise<IUserModel> {
    return (await UserModel.create({
      phone,
      email,
      password,
      salt,
    })) as IUserModel;
  }

  async findAccount(
    userId?: string,
    email?: string,
    phone?: string
  ): Promise<IUserModel> {
    let user;

    if (userId) {
      user = await UserModel.findById(userId).select(
        "-__v -password -salt -expiry -verification_code -createdAt -updatedAt"
      );
    } else if (email) {
      user = await UserModel.findOne({ email });
    } else if (phone) {
      user = await UserModel.findOne({ phone });
    }

    if (!user) throw new Error("no user found!");
    return user as IUserModel;
  }

  async updateVerificationCode(
    userId: string,
    code: number,
    expiry: string
  ): Promise<IUserModel> {
    const user = await this.findAccount(userId);
    if (user.verified) throw new Error("user already verified!");
    user.verification_code = code;
    user.expiry = expiry;

    return (await user.save()) as IUserModel;
  }

  async updateVerifyUser(userId: string): Promise<IUserModel> {
    const user = await this.findAccount(userId);
    if (user.verified) throw new Error("user already verified!");
    user.verified = true;

    return (await user.save()) as IUserModel;
  }

  async updateUser(
    userId: string,
    { firstName, lastName, profilePic, headline }: UserInput
  ): Promise<IUserModel> {
    return (await UserModel.findByIdAndUpdate(
      userId,
      {
        first_name: firstName,
        last_name: lastName,
        profile_pic: profilePic,
        headline,
      },
      { upsert: false, new: true }
    )) as IUserModel;
  }

  async getUserProfile(userId: string): Promise<IUserModel> {
    let user: any = {};
    user.profile = await this.findAccount(userId);
    user.address =
      (await respository.address.findAddress(userId as string)) || {};
    user.educations =
      (await respository.education.getAllEducations(userId as string)) || [];
    user.expereinces =
      (await respository.experience.getAllExperiences(userId as string)) || [];
    user.payments =
      (await respository.payment.getAllPayments(userId as string)) || [];
    user.skillSets =
      (await respository.skillset.getAllSkillSets(userId as string)) || [];
    user.socialHandlers =
      (await respository.socialHandler.findSocialHandler(userId as string)) ||
      {};

    console.log(
      await respository.socialHandler.findSocialHandler(userId as string)
    );

    return user as IUserModel;
  }

  async changeUserPassword(
    userId: string,
    hashedPassword: string,
    salt: string
  ): Promise<IUserModel> {
    const user = await this.findAccount(userId);
    user.password = hashedPassword;
    user.salt = salt;
    return (await user.save()) as IUserModel;
  }

  async deleteAccount(userId: string) {
    return UserModel.deleteOne({ _id: userId });
  }
}
