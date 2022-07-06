import { ObjectId } from "mongodb";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";

import { User } from "../../entities";
import {
  CreateUserInput,
  FilterUserInput,
  LoginInput,
  UserPayload,
  UsersPayload,
} from "./input";
import UserService from "./service";

@Service()
@Resolver()
export default class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  async getUser(@Arg("id") id: ObjectId): Promise<User | null> {
    const user = await this.userService.getById(id);

    return user;
  }

  @Query(() => UsersPayload)
  async getUsers(
    @Arg("filterUserData") filterUserData: FilterUserInput
  ): Promise<UsersPayload> {
    const payload = await this.userService.getAll(filterUserData);

    return payload;
  }

  @Mutation(() => UserPayload)
  async login(
    @Arg("loginUserData") loginUserData: LoginInput
  ): Promise<UserPayload | null> {
    const user = await this.userService.login(loginUserData);

    return user;
  }

  @Mutation(() => User)
  async createUser(
    @Arg("createUserData") createUserData: CreateUserInput
  ): Promise<User> {
    const user = await this.userService.addUser(createUserData);
    return user;
  }
}
