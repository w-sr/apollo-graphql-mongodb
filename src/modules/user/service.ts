import { Service } from "typedi";
import { ObjectId } from "mongodb";

import UserModel from "./model";
import { User } from "../../entities";
import {
  CreateUserInput,
  FilterUserInput,
  LoginInput,
  UpdateUserInput,
  UserPayload,
  UsersPayload,
} from "./input";
import { comparePassword, getToken } from "../../helpers/auth.helpers";

@Service()
export default class UserService {
  constructor(private readonly userModel: UserModel) {}

  public async login(data: LoginInput): Promise<UserPayload | null> {
    const user = await this.userModel.getByEmail(data.email);
    if (!user) throw new Error("User not found!");

    const isMatch = await comparePassword(data.password, user?.password);
    if (!isMatch) throw new Error("Password was not matched!");

    const input = { _id: user._id };
    const token = getToken(input);

    return { user, token };
  }

  public async getById(_id: ObjectId): Promise<User | null> {
    return this.userModel.getById(_id);
  }

  public async getAll(data: FilterUserInput): Promise<UsersPayload> {
    return this.userModel.getAll(data);
  }

  public async create(data: CreateUserInput): Promise<User> {
    const newUser = await this.userModel.create(data);
    return newUser;
  }

  public async update(
    _id: ObjectId,
    data: UpdateUserInput
  ): Promise<User | null> {
    const updatedUser = await this.userModel.update(_id, data);
    return updatedUser;
  }

  public async delete(_id: ObjectId): Promise<User | null> {
    const deletedUser = await this.userModel.delete(_id);
    return deletedUser;
  }
}
