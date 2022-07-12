import { ObjectId } from "mongodb";
import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";

import { Role, User } from "../../entities";
import {
  CreateUserInput,
  FilterUserInput,
  LoginInput,
  UpdateUserInput,
  UserPayload,
  UsersPayload,
} from "./input";
import UserService from "./service";

@Service()
@Resolver()
export default class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserPayload)
  async login(
    @Arg("loginUserData") loginUserData: LoginInput
  ): Promise<UserPayload | null> {
    const user = await this.userService.login(loginUserData);

    return user;
  }

  @Query(() => User)
  @Authorized()
  async getUser(@Arg("id") id: ObjectId): Promise<User | null> {
    const user = await this.userService.getById(id);

    return user;
  }

  @Query(() => UsersPayload)
  @Authorized([Role.MANAGER])
  async getUsers(
    @Arg("filterUserData") filterUserData: FilterUserInput
  ): Promise<UsersPayload> {
    const payload = await this.userService.getAll(filterUserData);

    return payload;
  }

  @Mutation(() => User)
  @Authorized([Role.MANAGER])
  async createUser(
    @Arg("createUserData") createUserData: CreateUserInput
  ): Promise<User> {
    const user = await this.userService.addUser(createUserData);
    return user;
  }

  @Mutation(() => User)
  @Authorized([Role.MANAGER])
  async updateUser(
    @Arg("_id") _id: string,
    @Arg("updateUserData") updateUserData: UpdateUserInput
  ): Promise<User | null> {
    const user = await this.userService.updateUser(_id, updateUserData);
    return user;
  }

  @Mutation(() => User)
  @Authorized([Role.MANAGER])
  async deleteUser(@Arg("_id") _id: string): Promise<User | null> {
    const user = await this.userService.deleteUser(_id);
    return user;
  }
}
