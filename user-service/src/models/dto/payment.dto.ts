import { Length, IsOptional } from "class-validator";

export class PaymentInput {
  userId: string;

  @Length(3, 255, {
    message: "Bank account must be between 3 and 255 characters.",
  })
  bankAccount: string;

  @Length(3, 32, { message: "Swift code must be between 3 and 32 characters." })
  swiftCode: string;

  @Length(3, 32, {
    message: "Payment type must be between 3 and 32 characters.",
  })
  paymentType: string;
}

export class UpdatePaymentInput {
  userId: string;

  @IsOptional()
  @Length(3, 255, {
    message: "Bank account must be between 3 and 255 characters.",
  })
  bankAccount: string;

  @IsOptional()
  @Length(3, 32, { message: "Swift code must be between 3 and 32 characters." })
  swiftCode: string;

  @IsOptional()
  @Length(3, 32, {
    message: "Payment type must be between 3 and 32 characters.",
  })
  paymentType: string;
}
