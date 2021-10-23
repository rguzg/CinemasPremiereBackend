import { shield, allow, deny, or, and } from "graphql-shield";
const { ApolloError, } = require("apollo-server");
import { isAuthenticated, isAdmin, isEmployee } from "./polices";


export const permissions = shield(
  {
    Query: {
      "calculatePayroll": and(isAuthenticated, isAdmin),
      "customer": and(isAuthenticated, or(isAdmin, isEmployee)),
      "customers": and(isAuthenticated, or(isAdmin, isEmployee)),
      "employee": and(isAuthenticated, isAdmin),
      "employees": and(isAuthenticated, isAdmin),
      "inventoryObject": and(isAuthenticated, or(isAdmin, isEmployee)),
      "inventoryObjects": and(isAuthenticated, or(isAdmin, isEmployee)),
      "membership": isAuthenticated,
      "memberships": and(isAuthenticated, or(isAdmin, isEmployee)),
      "checkPoints": isAuthenticated,
      "productPurchase": and(isAuthenticated, or(isAdmin, isEmployee)),
      "productPurchases": and(isAuthenticated, or(isAdmin, isEmployee)),
      "ticketPurchase": and(isAuthenticated, or(isAdmin, isEmployee)),
      "ticketPurchases": and(isAuthenticated, or(isAdmin, isEmployee)),
      "user": and(isAuthenticated, isAdmin),
      "users": and(isAuthenticated, isAdmin),
    },
    Mutation: {
      "setPwd": isAuthenticated,
      "signup": allow,
      "login": allow,
      "updateUser": and(isAuthenticated),
      "*": and(isAuthenticated, or(isAdmin, isEmployee)),
    },
    MovieTheater: {
      "createdAt": and(isAuthenticated, or(isAdmin, isEmployee)),
      "updatedAt": and(isAuthenticated, or(isAdmin, isEmployee)),
      "inventory": and(isAuthenticated, or(isAdmin, isEmployee)),
      "ticketPurchases": and(isAuthenticated, or(isAdmin, isEmployee)),
      "productPurchases": and(isAuthenticated, or(isAdmin, isEmployee)),
      "employees": and(isAuthenticated, isEmployee),
    },
  },
  {
    allowExternalErrors: true,
    debug: true,
    fallbackError: (thrownThing, parent, args, context, info) => {
      if (thrownThing instanceof ApolloError) {
        // expected errors
        return thrownThing
      } else if (thrownThing instanceof Error) {
        // unexpected errors
        console.error(thrownThing)
        // await Sentry.report(thrownThing)
        return new ApolloError('Internal server error', 'ERR_INTERNAL_SERVER')
      } else {
        // what the hell got thrown
        console.error('The resolver threw something that is not an error.')
        console.error(thrownThing)
        return new ApolloError('Internal server error', 'ERR_INTERNAL_SERVER')
      }
    },
  }
  // { fallbackRule: deny },
);
