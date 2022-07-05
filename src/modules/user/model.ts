import { ObjectId } from "mongodb";
import { Service } from "typedi";

import { User, UserMongooseModel } from "../../entities";
import { CreateUserInput, FilterUserInput } from "./input";

// This generates the mongoose model for us

@Service()
export default class UserModel {
  async getById(_id: ObjectId): Promise<User | null> {
    // Use mongoose as usual
    return UserMongooseModel.findById(_id).lean().exec();
  }

  async getAll(data: FilterUserInput): Promise<User[] | []> {
    // Use mongoose as usual
    return UserMongooseModel.find().lean().exec();
  }

  async create(data: CreateUserInput): Promise<User> {
    const user = new UserMongooseModel(data);

    return user.save();
  }
}
