import { rule } from "graphql-shield";
import { getUser } from '../utils'
const { ApolloError } = require("apollo-server");

export const isAuthenticated = rule({ cache: "contextual" })(
  async (parent, args, ctx, info) => {
    const user = await getUser(ctx);
    if (user == null) {
      return new ApolloError(
        "User not logged in",
        "ERR_NOT_LOGGED"
      );
    }
    return true;
  }
);

export const isAdmin = rule({ cache: "contextual" })(
  async (parent, args, ctx, info) => {
    const user = await getUser(ctx);
    if (user == null) {
      return new ApolloError(
        "User not logged in",
        "ERR_NOT_LOGGED"
      );
    }

    if(user.userType != "ADMIN"){
      return new ApolloError(
        "User not ADMIN",
        "ERR_NOT_ADMIN"
      );
    }
    return true;
  }
);

export const isEmployee = rule({ cache: "contextual" })(
  async (parent, args, ctx, info) => {
    const user = await getUser(ctx);
    if (user == null) {
      return new ApolloError(
        "User not logged in",
        "ERR_NOT_LOGGED"
      );
    }

    if(user.userType != "EMPLOYEE"){
      return new ApolloError(
        "User not EMPLOYEE",
        "ERR_NOT_EMPLOYEE"
      );
    }
    return true;
  }
);