import {
  IsEmail,
  Length,
  Matches,
  IsOptional,
  IsString,
  IsUrl,
} from "class-validator";

export class EmailInput {
  @IsEmail({}, { message: "Please provide a valid email address." })
  email: string;
}

export class PasswordInput {
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      "Password must contain at least one letter, one number, and one special character.",
  })
  password: string;
}

export class LoginInput extends EmailInput {
  @Length(6, 32, { message: "Password must be between 6 and 32 characters." })
  password: string;
}

export class SignupInput extends LoginInput {
  @Length(11, 15, { message: "Phone number must be between 11 and 15 digits." })
  phone: string;

  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      "Password must contain at least one letter, one number, and one special character.",
  })
  password: string;
}

export class VerificationInput {
  @Length(6)
  code: string;
}

export class UserInput {
  @IsOptional()
  @Length(3, 32, { message: "First name must be between 3 and 32 characters." })
  @IsString({ message: "First name must be a string." })
  firstName: string;

  @IsOptional()
  @Length(3, 32, { message: "Last name must be between 3 and 32 characters." })
  @IsString({ message: "Last name must be a string." })
  lastName: string;

  @IsOptional()
  @IsUrl({}, { message: "Profile picture must be a valid URL." })
  profilePic?: string;

  @IsOptional()
  @Length(3, 255, { message: "Headline must be between 3 and 255 characters." })
  @IsString({ message: "Headline must be a string." })
  headline?: string;
}
