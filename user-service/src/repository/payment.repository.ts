import { IPaymentMethodModel } from "../models/interfaces/payment.interface";
import PaymentModel from "../models/payment.model";
import { PaymentInput, UpdatePaymentInput } from "../models/dto/payment.dto";

export class PaymentRepository {
  async addPayment({
    userId,
    bankAccount,
    swiftCode,
    paymentType,
  }: PaymentInput): Promise<IPaymentMethodModel> {
    return (await PaymentModel.create({
      user_id: userId,
      bank_account: bankAccount,
      swift_code: swiftCode,
      payment_type: paymentType,
    })) as IPaymentMethodModel;
  }

  async findPayment(
    userId: string,
    paymentId: string
  ): Promise<IPaymentMethodModel> {
    const payment = await PaymentModel.findOne({
      _id: paymentId,
      user_id: userId,
    }).select("-__v");
    if (!payment) throw new Error("no user's payment found!");
    return payment as IPaymentMethodModel;
  }

  async getAllPayments(userId: string): Promise<IPaymentMethodModel[]> {
    return await PaymentModel.find({ user_id: userId }, "-__v -user_id");
  }

  async updatePayment(
    paymentId: string,
    { userId, bankAccount, swiftCode, paymentType }: UpdatePaymentInput
  ) {
    await this.findPayment(userId, paymentId);

    return (await PaymentModel.findByIdAndUpdate(
      paymentId,
      {
        bank_account: bankAccount,
        swift_code: swiftCode,
        payment_type: paymentType,
      },
      { new: true }
    )) as IPaymentMethodModel;
  }

  async deletePayment(userId: string, paymentId: string) {
    return PaymentModel.deleteOne({ _id: paymentId, user_id: userId });
  }
}
