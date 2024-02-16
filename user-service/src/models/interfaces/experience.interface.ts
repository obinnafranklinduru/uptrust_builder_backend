import { Document } from "mongoose";

export interface IExperienceModel extends Document {
  _id?: string;
  user_id: string;
  job_title: string;
  company: string;
  start_date?: string;
  end_date?: string;
  location: string;
  description: string;
}
