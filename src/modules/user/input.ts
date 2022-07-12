import { IsEmail, Length, MinLength } from "class-validator";
import { Field, ObjectType, InputType, Int } from "type-graphql";
import { Role, User } from "../../entities";

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
export class UpdateUserInput {
  @Field(() => String, { nullable: true })
  @Length(1, 50)
  firstName: string;

  @Field(() => String, { nullable: true })
  @Length(1, 50)
  lastName: string;

  @Field(() => String, { nullable: true })
  @IsEmail()
  email: string;

  @Field(() => Role, { nullable: true })
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

@InputType()
export class LoginInput {
  @Field(() => String, { nullable: false })
  email: string;

  @Field(() => String, { nullable: false })
  password: string;
}

@ObjectType()
export class UsersPayload {
  @Field(() => [User])
  users: User[];

  @Field(() => Int)
  total: number;
}

@ObjectType()
export class UserPayload {
  @Field(() => User)
  user: User;

  @Field(() => String)
  token: string;
}
