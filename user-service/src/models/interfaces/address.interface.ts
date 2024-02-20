import { Document } from "mongoose";

export interface IAddressModel extends Document {
  _id?: string;
  user_id: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  post_code: string;
  country: string;
}
