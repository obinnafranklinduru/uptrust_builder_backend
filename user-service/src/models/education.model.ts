import mongoose, { Schema } from "mongoose";
import { IEducationModel } from "./interfaces/education.interface";

const educationSchema: Schema = new Schema({
  user_id: { type: String, required: true },
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  fieldofstudy: { type: String, required: true },
  start_year: { type: String, required: true },
  end_year: { type: String, required: true },
  institution_website: { type: String, required: true },
  description: { type: String, required: true },
});

const EducationModel = mongoose.model<IEducationModel>(
  "Education",
  educationSchema
);

export default EducationModel;
