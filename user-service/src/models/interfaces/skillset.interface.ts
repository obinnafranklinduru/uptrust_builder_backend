import { Document } from "mongoose";

export interface ISkillSetModel extends Document {
  _id?: string;
  user_id: string;
  name: string;
  level: string;
  description: string;
}
