import { ObjectId } from "mongodb";
import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";

import { Bike } from "../../entities";
import { Role } from "../../entities/user";
import { CreateBikeInput, FilterBikeInput, BikesPayload } from "./input";
import BikeService from "./service";

@Service()
@Resolver()
export default class BikeResolver {
  constructor(private readonly bikeService: BikeService) {}

  @Query(() => Bike)
  @Authorized()
  async getBike(@Arg("id") id: ObjectId): Promise<Bike | null> {
    const bike = await this.bikeService.getById(id);

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
    const Bike = await this.bikeService.addBike(createBikeData);
    return Bike;
  }
}
