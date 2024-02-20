import mongoose, { Schema } from "mongoose";
import { IAddressModel } from "./interfaces/address.interface";

const addressSchema: Schema = new Schema({
  user_id: { type: String, required: true },
  address_line1: { type: String, required: true },
  address_line2: { type: String },
  city: { type: String, required: true },
  post_code: { type: String, required: true },
  country: { type: String, required: true },
});

const AddressModel = mongoose.model<IAddressModel>("Address", addressSchema);

export default AddressModel;
