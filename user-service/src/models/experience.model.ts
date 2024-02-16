import mongoose, { Schema } from "mongoose";
import { IExperienceModel } from "./interfaces/experience.interface";

const experienceSchema: Schema = new Schema({
  user_id: { type: String, required: true },
  job_title: { type: String, required: true },
  company: { type: String, required: true },
  start_date: { type: String, required: true },
  end_date: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
});

const ExperienceModel = mongoose.model<IExperienceModel>(
  "Experience",
  experienceSchema
);

export default ExperienceModel;
