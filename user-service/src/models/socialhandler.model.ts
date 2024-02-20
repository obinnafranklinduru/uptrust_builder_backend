import mongoose, { Schema } from "mongoose";
import { ISocialHandlerModel } from "./interfaces/socialhandler.interface";

const socialHandlerSchema: Schema = new Schema({
  user_id: { type: String, required: true },
  facebook: { type: String, default: "http://facebook.com" },
  linkedin: { type: String, default: "http://linkedin.com" },
  twitter: { type: String, default: "http://twitter.com" },
  portfolio_url: { type: String, required: true },
  github_url: { type: String, default: "https://github.com" },
});

const SocialHandlerModel = mongoose.model<ISocialHandlerModel>(
  "SocialHandler",
  socialHandlerSchema
);

export default SocialHandlerModel;
