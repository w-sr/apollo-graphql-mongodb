import { ObjectId } from "mongodb";
import { Service } from "typedi";

import { Bike, BikeMongooseModel } from "../../entities";
import { BikesPayload, CreateBikeInput, FilterBikeInput } from "./input";

@Service()
export default class BikeModel {
  async getById(_id: ObjectId): Promise<Bike | null> {
    return BikeMongooseModel.findById(_id).lean().exec();
  }

  async getAll(data: FilterBikeInput): Promise<BikesPayload> {
    const { page, pageSize, ...rest } = data;

    const query: Record<string, object> = {};
    let key: keyof typeof rest;
    for (key in rest) {
      query[key] = {
        $regex: new RegExp(rest[key], "i"),
      };
    }
    const total = await BikeMongooseModel.find(query).count();

    const bikes = await BikeMongooseModel.find(query)
      .skip((page - 1) * pageSize)
      .limit(+pageSize);

    return { bikes, total };
  }

  async create(data: CreateBikeInput): Promise<Bike> {
    const bike = new BikeMongooseModel({ ...data });

    return bike.save();
  }
}
