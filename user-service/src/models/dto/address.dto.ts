import { Length, IsOptional, IsString } from "class-validator";

export class AddressInput {
  userId: string;

  @Length(3, 32, {
    message: "Address line must be between 3 and 32 characters.",
  })
  @IsString({ message: "Address must be a string." })
  addressLine1: string;

  @IsOptional()
  @Length(3, 32, {
    message: "Address line must be between 3 and 32 characters.",
  })
  @IsString({ message: "Address must be a string." })
  addressLine2: string;

  @Length(3, 12, { message: "City must be between 3 and 12 characters." })
  @IsString({ message: "City must be a string." })
  city: string;

  @Length(4, 6, { message: "Post code must be between 4 and 6 characters." })
  @IsString({ message: "Post Code must be a string." })
  postCode: string;

  @Length(2, 3, { message: "Country must be between 2 and 3 characters." })
  @IsString({ message: "Country must be a string." })
  country: string;
}

export class UpdateAddressInput {
  userId: string;

  @IsOptional()
  @Length(3, 32, {
    message: "Address line must be between 3 and 32 characters.",
  })
  @IsString({ message: "Address must be a string." })
  addressLine1: string;

  @IsOptional()
  @Length(3, 32, {
    message: "Address line must be between 3 and 32 characters.",
  })
  @IsString({ message: "Address must be a string." })
  addressLine2: string;

  @IsOptional()
  @Length(3, 12, { message: "City must be between 3 and 12 characters." })
  @IsString({ message: "City must be a string." })
  city: string;

  @IsOptional()
  @Length(4, 6, { message: "Post code must be between 4 and 6 characters." })
  @IsString({ message: "Post Code must be a string." })
  postCode: string;

  @IsOptional()
  @Length(2, 3, { message: "Country must be between 2 and 3 characters." })
  @IsString({ message: "Country must be a string." })
  country: string;
}
