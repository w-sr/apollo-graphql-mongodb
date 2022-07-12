import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { Length, Min } from "class-validator";
import { ObjectId } from "mongodb";
import { Field, ObjectType } from "type-graphql";

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
@ObjectType()
export class Bike {
  @Field()
  readonly _id!: ObjectId;

  @Field(() => String)
  @Length(1, 50)
  @prop({ type: () => String, required: true })
  model: string;

  @Field(() => String)
  @prop({ type: () => String, required: true })
  @Length(1, 50)
  location: string;

  @Field(() => String)
  @Length(1, 50)
  @prop({ type: () => String, required: true })
  color: string;

  @Field(() => Number)
  @Min(0)
  @Min(5)
  @prop({ type: () => Number, required: true, default: 0 })
  rate: number;

  @Field(() => Boolean)
  @prop({ type: () => Boolean, required: true, default: true })
  available: boolean;

  @Field()
  @prop({ type: () => Boolean, default: false })
  isDeleted: boolean;
}

export const BikeMongooseModel = getModelForClass(Bike);
