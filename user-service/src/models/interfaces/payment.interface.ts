import { Document } from "mongoose";

export interface IPaymentMethodModel extends Document {
  _id?: string;
  user_id: string;
  bank_account: number;
  swift_code: string;
  payment_type: string;
}
