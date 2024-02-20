import mongoose, { Schema } from "mongoose";
import { ISkillSetModel } from "./interfaces/skillset.interface";

const skillSetSchema: Schema = new Schema({
  user_id: { type: String, required: true },
  name: { type: String, required: true },
  level: { type: String, required: true },
  description: { type: String, required: true },
});

const SkillSetModel = mongoose.model<ISkillSetModel>(
  "SkillSet",
  skillSetSchema
);

export default SkillSetModel;
