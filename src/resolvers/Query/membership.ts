import { ApolloError } from "apollo-server-errors";
import * as bcrypt from "bcryptjs";
import { Membership, MembershipWhereUniqueInput, UserCreateInput, UserUpdateInput } from "../../generated/prisma-client";
import { Context } from "../../utils";

export default {
  membership: async (parent, args, ctx: Context) => {
    let membership: MembershipWhereUniqueInput = args.data;
    let currentUser = await ctx.prisma.user({id: ctx.user})

    if(currentUser.userType == "ADMIN" || currentUser.userType == "EMPLOYEE" || currentUser.email == args.where.email || currentUser.id == args.where.id) {
      return ctx.prisma.membership({id: membership.id})
    } else {
      throw new ApolloError("You're not allowed to see this content");
    }
  },
  memberships: async (parent, args, ctx: Context) => ctx.prisma.memberships(args),
  checkPoints: async(parent, args, ctx: Context) => {
    let points: number;
    let currentUser = await ctx.prisma.user({id: ctx.user})

    if(currentUser.userType == "ADMIN" || currentUser.userType == "EMPLOYEE") {
      if(args.user){
          points = (await ctx.prisma.customers({where: {user: {id: args.user.id}}}))[0].points;
        } else {
            points = await ctx.prisma.customer({id: args.customer}).points();
        }
    } else {
        points = (await ctx.prisma.customers({where: {user: {id: currentUser.id}}}))[0].points;
    }


    return points
  }
};
