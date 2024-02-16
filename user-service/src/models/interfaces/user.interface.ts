import { Document } from "mongoose";
import { IAddressModel } from "./address.interface";
import { IEducationModel } from "./education.interface";
import { IExperienceModel } from "./experience.interface";
import { IPaymentMethodModel } from "./payment.interface";
import { ISkillSetModel } from "./skillset.interface";
import { ISocialHandlerModel } from "./socialhandler.interface";

export interface IUserModel extends Document {
  _id?: string;
  email: string;
  password: string;
  salt: string;
  phone: string;
  first_name?: string;
  last_name?: string;
  profile_pic?: string;
  verification_code?: number;
  verified: boolean;
  expiry?: string;
  stripe_id?: string;
  payment_id?: string;
  headline?: string;
  addresses?: IAddressModel;
  educations?: IEducationModel[];
  expereinces?: IExperienceModel[];
  payments?: IPaymentMethodModel[];
  skillSets?: ISkillSetModel[];
  socialHandlers?: ISocialHandlerModel;
}
