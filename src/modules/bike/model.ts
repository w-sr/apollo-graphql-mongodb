import { ObjectId } from "mongodb";
import { Service } from "typedi";

import { Bike, BikeMongooseModel } from "../../entities";
import {
  BikesPayload,
  CreateBikeInput,
  FilterBikeInput,
  UpdateBikeInput,
} from "./input";

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
    const createdBike = new BikeMongooseModel({ ...data, available: true });
    return createdBike.save();
  }

  async update(_id: ObjectId, data: UpdateBikeInput): Promise<Bike | null> {
    const updatedBike = await BikeMongooseModel.findOneAndUpdate(
      {
        _id,
      },
      data,
      {
        new: true,
      }
    );
    return updatedBike;
  }

  async delete(_id: ObjectId): Promise<Bike | null> {
    const deletedBike = await BikeMongooseModel.findByIdAndUpdate(_id, {
      isDeleted: true,
    });
    return deletedBike;
  }
}
