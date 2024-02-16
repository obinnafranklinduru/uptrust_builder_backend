import { Length, IsOptional } from "class-validator";

export class SkillsetInput {
  userId: string;

  @Length(3, 32, { message: "Skill name must be between 3 and 32 characters." })
  name: string;

  @Length(3, 32, {
    message: "Skill level must be between 3 and 32 characters.",
  })
  level: string;

  @IsOptional()
  @Length(3, 500, {
    message: "Skill description must be between 3 and 500 characters.",
  })
  description: string;
}

export class UpdateSkillsetInput {
  userId: string;

  @IsOptional()
  @Length(3, 32, { message: "Skill name must be between 3 and 32 characters." })
  name: string;

  @IsOptional()
  @Length(3, 32, {
    message: "Skill level must be between 3 and 32 characters.",
  })
  level: string;

  @IsOptional()
  @Length(3, 500, {
    message: "Skill description must be between 3 and 500 characters.",
  })
  description: string;
}
