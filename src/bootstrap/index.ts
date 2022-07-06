import express from "express";
import { expressjwt } from "express-jwt";
import mongoose from "mongoose";

import loaders from "./loaders";
import { Config } from "../config";

export default async (config: Config) => {
  const app = express();
  // app.use(
  //   expressjwt({
  //     secret: config.salt,
  //     algorithms: ["HS256"],
  //     credentialsRequired: false,
  //   })
  // );

  const server = await loaders();

  await server.start();

  server.applyMiddleware({
    app,
    path: config.path,
    onHealthCheck: async () => {
      if (mongoose.connection.readyState === 1) return;
      throw new Error();
    },
  });

  app.listen({ port: config.port }, () =>
    console.log(`Server ready at http://localhost:${config.port}${config.path}`)
  );
};
