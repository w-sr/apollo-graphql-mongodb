import { ApolloServer } from "apollo-server-express";

import { buildSchema } from "../../utils";

export default async () => {
  const schema = await buildSchema();

  return new ApolloServer({
    schema,
  });
};
