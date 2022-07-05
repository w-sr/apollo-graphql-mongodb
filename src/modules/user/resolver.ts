import { ObjectId } from "mongodb";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";

import { User } from "../../entities";
import { CreateUserInput, FilterUserInput } from "./input";
import UserService from "./service";

@Service()
@Resolver(() => User)
export default class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  async getUser(@Arg("id") id: ObjectId) {
    const user = await this.userService.getById(id);

    return user;
  }

  @Query(() => [User] || [])
  async getUsers(
    @Arg("filterUserData") filterUserData: FilterUserInput
  ): Promise<User[] | []> {
    const users = await this.userService.getAll(filterUserData);

    return users;
  }

  @Mutation(() => User)
  async createUser(
    @Arg("createUserData") createUserData: CreateUserInput
  ): Promise<User> {
    const user = await this.userService.addUser(createUserData);
    return user;
  }
}
