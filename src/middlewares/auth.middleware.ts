import { AuthChecker } from "type-graphql";
import { Context } from "../context";

// create auth checker function
export const authChecker: AuthChecker<Context> = (
  { context: { user } },
  roles
) => {
  if (roles.length === 0) {
    // if `@Authorized()`, check only if user exists
    return user !== undefined;
  }
  // there are some roles defined now

  if (!user) {
    // and if no user, restrict access
    return false;
  }

  if (roles.some((role) => role === user.role)) {
    // grant access if the roles overlap, ex: `@Authorized([MANAGER])`
    return true;
  }

  // no roles matched, restrict access
  return false;
};
