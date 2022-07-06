import { ObjectId } from "mongodb";
import { Service } from "typedi";

import { User, UserMongooseModel } from "../../entities";
import { encryptPassword } from "../../helpers/auth.helpers";
import { CreateUserInput, FilterUserInput, UsersPayload } from "./input";

@Service()
export default class UserModel {
  async getById(_id: ObjectId): Promise<User | null> {
    return UserMongooseModel.findById(_id).lean().exec();
  }

  async getByEmail(email: string): Promise<User | null> {
    return UserMongooseModel.findOne({ email }).lean().exec();
  }

  async getAll(data: FilterUserInput): Promise<UsersPayload> {
    // Use mongoose as usual
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
}
