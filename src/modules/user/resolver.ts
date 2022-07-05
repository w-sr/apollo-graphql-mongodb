import { ObjectId } from "mongodb";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";

import { User, UsersPayload } from "../../entities";
import { CreateUserInput, FilterUserInput } from "./input";
import UserService from "./service";

@Service()
@Resolver(() => User)
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

  @Mutation(() => User)
  async createUser(
    @Arg("createUserData") createUserData: CreateUserInput
  ): Promise<User> {
    const user = await this.userService.addUser(createUserData);
    return user;
  }
}
