import { ObjectId } from "mongodb";
import { Service } from "typedi";

import { Bike } from "../../entities";
import { BikesPayload, CreateBikeInput, FilterBikeInput } from "./input";
import BikeModel from "./model";

@Service()
export default class BikeService {
  constructor(private readonly bikeModel: BikeModel) {}

  public async getById(_id: ObjectId): Promise<Bike | null> {
    return this.bikeModel.getById(_id);
  }

  public async getAll(data: FilterBikeInput): Promise<BikesPayload> {
    return this.bikeModel.getAll(data);
  }

  public async addBike(data: CreateBikeInput): Promise<Bike> {
    const newBike = await this.bikeModel.create(data);
    return newBike;
  }
}
