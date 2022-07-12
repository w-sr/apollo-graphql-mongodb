import { ObjectId } from "mongodb";
import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";

import { Bike } from "../../entities";
import { Role } from "../../entities/user";
import {
  CreateBikeInput,
  FilterBikeInput,
  BikesPayload,
  UpdateBikeInput,
} from "./input";
import BikeService from "./service";

@Service()
@Resolver()
export default class BikeResolver {
  constructor(private readonly bikeService: BikeService) {}

  @Query(() => Bike)
  @Authorized()
  async getBike(@Arg("_id") _id: ObjectId): Promise<Bike | null> {
    const bike = await this.bikeService.getById(_id);
    return bike;
  }

  @Query(() => BikesPayload)
  @Authorized()
  async getBikes(
    @Arg("filterBikeData") filterBikeData: FilterBikeInput
  ): Promise<BikesPayload> {
    const payload = await this.bikeService.getAll(filterBikeData);
    return payload;
  }

  @Mutation(() => Bike)
  @Authorized([Role.MANAGER])
  async createBike(
    @Arg("createBikeData") createBikeData: CreateBikeInput
  ): Promise<Bike> {
    const bike = await this.bikeService.create(createBikeData);
    return bike;
  }

  @Mutation(() => Bike)
  @Authorized([Role.MANAGER])
  async updateBike(
    @Arg("_id") _id: ObjectId,
    @Arg("updateBikeData") updateBikeData: UpdateBikeInput
  ): Promise<Bike | null> {
    const bike = await this.bikeService.update(_id, updateBikeData);
    return bike;
  }
}
