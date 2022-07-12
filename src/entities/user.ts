import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
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
  @prop({ type: () => String, required: true })
  @Length(1, 50)
  firstName: string;

  @Field(() => String)
  @Length(1, 50)
  @prop({ type: () => String, required: true })
  lastName: string;

  @Field(() => String)
  @IsEmail()
  @prop({ type: () => String, required: true, unique: true })
  email: string;

  @Field(() => String)
  @MinLength(8)
  @prop({ type: () => String, required: true })
  password: string;

  @Field(() => Role)
  @prop({ type: () => String, enum: Role, required: true })
  role: Role;

  @Field()
  @prop({ type: () => Boolean, default: false })
  isDeleted: boolean;
}

export const UserMongooseModel = getModelForClass(User);
