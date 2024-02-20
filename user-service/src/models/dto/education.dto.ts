import { Length, IsOptional, IsString, IsUrl } from "class-validator";

export class EducationInput {
  userId: string;

  @Length(3, 32, { message: "Degree must be between 3 and 32 characters." })
  degree: string;

  @Length(3, 32, {
    message: "Institution must be between 3 and 32 characters.",
  })
  institution: string;

  @Length(3, 32, {
    message: "Field of study must be between 3 and 32 characters.",
  })
  fieldofstudy: string;

  @Length(3, 32, {
    message: "Start Year must be between 3 and 32 characters.",
  })
  startYear: string;

  @IsOptional()
  @Length(3, 32, {
    message: "End Year must be between 3 and 32 characters.",
  })
  endYear: string;

  @IsOptional()
  @IsUrl({}, { message: "Profile picture must be a valid URL." })
  institutionWebsite: string;

  @IsOptional()
  @Length(3, 500, {
    message: "Description must be between 3 and 500 characters.",
  })
  @IsString({ message: "Description must be a string." })
  description: string;
}

export class UpdateEducationInput {
  userId: string;

  @IsOptional()
  @Length(3, 32, { message: "Degree must be between 3 and 32 characters." })
  degree: string;

  @IsOptional()
  @Length(3, 32, {
    message: "Institution must be between 3 and 32 characters.",
  })
  institution: string;

  @IsOptional()
  @Length(3, 32, {
    message: "Field of study must be between 3 and 32 characters.",
  })
  fieldofstudy: string;

  @IsOptional()
  @Length(3, 32, {
    message: "Start Year must be between 3 and 32 characters.",
  })
  startYear: string;

  @IsOptional()
  @Length(3, 32, {
    message: "End Year must be between 3 and 32 characters.",
  })
  endYear: string;

  @IsOptional()
  @IsUrl({}, { message: "Profile picture must be a valid URL." })
  institutionWebsite: string;

  @IsOptional()
  @Length(3, 500, {
    message: "Description must be between 3 and 500 characters.",
  })
  @IsString({ message: "Description must be a string." })
  description: string;
}
