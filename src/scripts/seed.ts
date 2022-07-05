import { connection } from "mongoose";
import { encryptPassword } from "../helpers/auth.helpers";
import mongooseLoader from "../bootstrap/loaders/mongoose";
import { User, UserMongooseModel } from "../entities";

const seed = async () => {
  console.log("Cleanning database");

  await mongooseLoader();
  await connection.dropDatabase();

  console.log("Database clean");
  const password = await encryptPassword("123456789");

  const user = new UserMongooseModel({
    firstName: "Manager1",
    lastName: "Manager1",
    email: "admin@email.com",
    password,
    role: "manager",
  } as User);

  const users = [user];

  const savings = [...users.map((user) => user.save())];

  await Promise.all(savings);

  console.log("Database seeded");

  connection.close();
};

seed();
