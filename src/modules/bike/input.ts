import { Length } from "class-validator";
import { Field, InputType, Int, ObjectType } from "type-graphql";
import { Bike } from "../../entities";

@InputType()
export class CreateBikeInput {
  @Field(() => String)
  @Length(1, 50)
  model: string;

  @Field(() => String)
  @Length(1, 50)
  location: string;

  @Field(() => String)
  @Length(1, 50)
  color: string;
}

@InputType()
export class FilterBikeInput {
  @Field(() => String, { nullable: false })
  @Length(1, 50)
  user: string;

  @Field(() => String, { nullable: false })
  @Length(1, 50)
  model: string;

  @Field(() => String, { nullable: false })
  @Length(1, 50)
  location: string;

  @Field(() => String, { nullable: false })
  @Length(1, 50)
  color: string;

  @Field(() => String, { nullable: false })
  @Length(1, 50)
  start_date: string;

  @Field(() => String, { nullable: false })
  @Length(1, 50)
  end_date: string;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  pageSize: number;
}

@ObjectType()
export class BikesPayload {
  @Field(() => [Bike])
  bikes: Bike[];

  @Field(() => Int)
  total: number;
}

@ObjectType()
export class BikeInput {
  @Field(() => Bike)
  bike: Bike;

  @Field(() => Int)
  available: boolean;
}
