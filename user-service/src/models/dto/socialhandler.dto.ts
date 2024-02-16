import { Length, IsUrl, IsOptional } from "class-validator";

export class SocialHandlerInput {
  userId: string;

  @IsOptional()
  @Length(3, 255, {
    message: "Facebook URL must be between 3 and 255 characters.",
  })
  @IsUrl({}, { message: "Facebook link must be a valid URL." })
  facebook: string;

  @IsOptional()
  @Length(3, 255, {
    message: "LinkedIn URL must be between 3 and 255 characters.",
  })
  @IsUrl({}, { message: "Linkedin link must be a valid URL." })
  linkedin: string;

  @IsOptional()
  @Length(3, 255, {
    message: "Twitter URL must be between 3 and 255 characters.",
  })
  @IsUrl({}, { message: "Twitter link must be a valid URL." })
  twitter: string;

  @IsOptional()
  @Length(3, 255, {
    message: "Portfolio URL must be between 3 and 255 characters.",
  })
  @IsUrl({}, { message: "Portfolio link must be a valid URL." })
  portfolioUrl: string;

  @IsOptional()
  @Length(3, 255, {
    message: "GitHub URL must be between 3 and 255 characters.",
  })
  @IsUrl({}, { message: "Github link must be a valid URL." })
  githubUrl: string;
}
