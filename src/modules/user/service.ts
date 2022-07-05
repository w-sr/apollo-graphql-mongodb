import { Service } from "typedi";
import { ObjectId } from "mongodb";

import UserModel from "./model";
import { User, UsersPayload } from "../../entities";
import { CreateUserInput, FilterUserInput } from "./input";

@Service()
export default class UserService {
  constructor(private readonly userModel: UserModel) {}

  public async getById(_id: ObjectId): Promise<User | null> {
    return this.userModel.getById(_id);
  }

  public async getAll(data: FilterUserInput): Promise<UsersPayload> {
    return this.userModel.getAll(data);
  }

  public async addUser(data: CreateUserInput): Promise<User> {
    const newUser = await this.userModel.create(data);
    return newUser;
  }
}
