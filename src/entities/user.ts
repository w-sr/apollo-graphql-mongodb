import { getModelForClass, prop, modelOptions } from "@typegoose/typegoose";
import { IsEmail, Length, MinLength } from "class-validator";
import { ObjectId } from "mongodb";
import { Field, ObjectType, registerEnumType } from "type-graphql";

export enum Role {
  MANAGER = "manager",
  USER = "user",
}

registerEnumType(Role, {
  name: "Role",
  description: "User permission",
  valuesConfig: {
    MANAGER: {
      description: "User CRUD, bike CRUD",
    },
    USER: {
      description: "Reserve or cancel bike",
    },
  },
});

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
@ObjectType()
export class User {
  @Field()
  readonly _id!: ObjectId;

  @Field(() => String)
  @prop({ required: true })
  @Length(1, 50)
  firstName: string;

  @Field(() => String)
  @Length(1, 50)
  @prop({ required: true })
  lastName: string;

  @Field(() => String)
  @IsEmail()
  @prop({ required: true, unique: true })
  email: string;

  @Field(() => String)
  @MinLength(8)
  @prop({ required: true })
  password: string;

  @Field(() => Role)
  @prop({ enum: Role, required: true })
  role: Role;

  @Field()
  @prop({ default: false })
  isDeleted: boolean;
}

// export const UserMongooseModel = getModelForClass(User);
export const UserMongooseModel = getModelForClass(User);
