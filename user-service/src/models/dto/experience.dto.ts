import { Length, IsOptional } from "class-validator";

export class ExperienceInput {
  userId: string;

  @Length(3, 32, { message: "Job title must be between 3 and 32 characters." })
  jobTitle: string;

  @Length(3, 32, { message: "Company must be between 3 and 32 characters." })
  company: string;

  @Length(3, 32, {
    message: "Start Year must be between 3 and 32 characters.",
  })
  startDate: string;

  @IsOptional()
  @Length(3, 32, {
    message: "End Year must be between 3 and 32 characters.",
  })
  endDate: string;

  @Length(3, 255, { message: "Location must be between 3 and 255 characters." })
  location: string;

  @IsOptional()
  @Length(3, 500, {
    message: "Description must be between 3 and 500 characters.",
  })
  description: string;
}

export class UpdateExperienceInput {
  userId: string;

  @IsOptional()
  @Length(3, 32, { message: "Job title must be between 3 and 32 characters." })
  jobTitle: string;

  @IsOptional()
  @Length(3, 32, { message: "Company must be between 3 and 32 characters." })
  company: string;

  @IsOptional()
  @Length(3, 32, {
    message: "Start Year must be between 3 and 32 characters.",
  })
  startDate: string;

  @IsOptional()
  @Length(3, 32, {
    message: "End Year must be between 3 and 32 characters.",
  })
  endDate: string;

  @IsOptional()
  @Length(3, 255, { message: "Location must be between 3 and 255 characters." })
  location: string;

  @IsOptional()
  @Length(3, 500, {
    message: "Description must be between 3 and 500 characters.",
  })
  description: string;
}
