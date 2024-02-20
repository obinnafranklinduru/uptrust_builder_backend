import { Document } from "mongoose";

export interface ISocialHandlerModel extends Document {
  _id?: string;
  user_id: string;
  facebook: string;
  linkedin: string;
  twitter: string;
  portfolio_url: string;
  github_url: string;
}
