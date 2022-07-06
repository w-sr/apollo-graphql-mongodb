import { ApolloServer } from "apollo-server-express";
import { ObjectId } from "mongodb";
import { buildSchema } from "type-graphql";
import Container from "typedi";
import { authChecker } from "../../middlewares/auth.middleware";
import { resolvers } from "../../modules";
import { ObjectIdScalar } from "../../utils/scalars";

export default async () => {
  const schema = await buildSchema({
    resolvers,
    authChecker,
    container: Container,
    dateScalarMode: "timestamp",
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
  });

  return new ApolloServer({
    schema,
    introspection: false,
    context: async ({ req }) => {
      console.log("req", req.body);
    },
  });
};
