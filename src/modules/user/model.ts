import { ApolloError } from "apollo-server-express";
import { ObjectId } from "mongodb";
import { Service } from "typedi";

import { User, UserMongooseModel } from "../../entities";
import { encryptPassword } from "../../helpers/auth.helpers";
import {
  CreateUserInput,
  FilterUserInput,
  UpdateUserInput,
  UsersPayload,
} from "./input";

@Service()
export default class UserModel {
  async getById(_id: ObjectId): Promise<User | null> {
    return UserMongooseModel.findById(_id).lean().exec();
  }

  async getByEmail(email: string): Promise<User | null> {
    return UserMongooseModel.findOne({ email }).lean().exec();
  }

  async getAll(data: FilterUserInput): Promise<UsersPayload> {
    const { page, pageSize, ...rest } = data;

    const query: Record<string, object> = {};
    let key: keyof typeof rest;
    for (key in rest) {
      query[key] = {
        $regex: new RegExp(rest[key], "i"),
      };
    }
    const total = await UserMongooseModel.find(query).count();

    const users = await UserMongooseModel.find(query)
      .skip((page - 1) * pageSize)
      .limit(+pageSize);

    return { users, total };
  }

  async create(data: CreateUserInput): Promise<User> {
    const { password, ...rest } = data;
    const hashedPassword = await encryptPassword(password);
    const user = new UserMongooseModel({ password: hashedPassword, ...rest });

    return user.save();
  }

  async update(_id: ObjectId, data: UpdateUserInput): Promise<User | null> {
    const user = await UserMongooseModel.findById(_id);

    if (!user) {
      throw new ApolloError("User not found");
    }

    if (data.email && user.email !== data.email) {
      const existingUser = await UserMongooseModel.findOne({
        email: data.email,
      });
      if (existingUser) {
        throw new ApolloError("User already existed");
      }
    }

    const updatedUser = await UserMongooseModel.findOneAndUpdate(
      {
        _id,
      },
      data,
      { new: true }
    );

    return updatedUser;
  }

  async delete(_id: ObjectId): Promise<User | null> {
    const deletedUser = await UserMongooseModel.findByIdAndUpdate(_id, {
      isDeleted: true,
    });
    return deletedUser;
  }
}
