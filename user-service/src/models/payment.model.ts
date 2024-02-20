import mongoose, { Schema } from "mongoose";
import { IPaymentMethodModel } from "./interfaces/payment.interface";

const paymentMethodSchema: Schema = new Schema({
  user_id: { type: String, required: true },
  bank_account: { type: Number, required: true },
  swift_code: { type: String, required: true },
  payment_type: { type: String, required: true },
});

const PaymentMethodModel = mongoose.model<IPaymentMethodModel>(
  "PaymentMethod",
  paymentMethodSchema
);

export default PaymentMethodModel;
