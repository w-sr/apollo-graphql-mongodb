import { IsEmail, Length, MinLength } from "class-validator";
import { Field, InputType, Int } from "type-graphql";
import { Role } from "../../entities";

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @Length(1, 50)
  firstName: string;

  @Field(() => String)
  @Length(1, 50)
  lastName: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @MinLength(8)
  password: string;

  @Field(() => Role)
  role: Role;
}

@InputType()
export class FilterUserInput {
  @Field(() => String, { nullable: true })
  firstName: string;

  @Field(() => String, { nullable: true })
  lastName: string;

  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  role: string;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  pageSize: number;
}
