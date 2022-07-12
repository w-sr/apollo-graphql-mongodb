import UserResolver from "./user/resolver";
import BikeResolver from "./bike/resolver";

// Important: Add all your module's resolver in this
export const resolvers: [Function, ...Function[]] = [
  UserResolver,
  BikeResolver,
  // AuthResolver
  // ...
];
