import { ApolloError } from "apollo-server-errors";
import * as bcrypt from "bcryptjs";
import { UserCreateInput, UserUpdateInput } from "../../generated/prisma-client";
import { Context } from "../../utils";

export default {
  async setPwd(parent, args, ctx: Context) {
    const { pwd } = args.data;
    const password = await bcrypt.hash(pwd, 10);

    return await ctx.prisma.updateUser({ data: { password }, where: { id: ctx.user }});
  },
  createUser: async (parent, args, ctx: Context) => {
    let user: UserCreateInput = args.data;

    user.password = await bcrypt.hash(user.password, 10);

    return await ctx.prisma.createUser(args.data);
  },
  // Only admins can update all user's data. Other users can only modify their own data
  updateUser: async (parent, args, ctx: Context) => {
    let user: UserUpdateInput = args.data;
    let currentUser = await ctx.prisma.user({id: ctx.user})

    if(currentUser.userType == "ADMIN" || currentUser.email == args.where.email || currentUser.id == args.where.id) {
      if(user.password){
        user.password = await bcrypt.hash(user.password, 10);
      }
      return ctx.prisma.updateUser(args)
    } else {
      throw new ApolloError("You're not allowed to modify this user");
    }
  },
};
