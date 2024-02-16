import { Document } from "mongoose";

export interface IEducationModel extends Document {
  _id?: string;
  user_id: string;
  degree: string;
  institution: string;
  fieldofstudy: string;
  start_year?: string;
  end_year?: string;
  institution_website: string;
  description: string;
}
