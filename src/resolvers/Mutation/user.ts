import * as bcrypt from "bcryptjs";
import { UserCreateInput } from "../../generated/prisma-client";
import { Context } from "../../utils";

export default {
  async setPwd(parent, args, ctx: Context) {
    const { pwd, token } = args.data;
    const password = await bcrypt.hash(pwd, 10);
    // return await ctx.prisma.updateUser({ data: { password }, where: { token_verify: token}});
    return await ctx.prisma.updateUser({ data: { password }, where: { email: "", id: "" }});
  },
  createUser: async (parent, args, ctx: Context) => {
    let user: UserCreateInput = args.data;

    user.password = await bcrypt.hash(user.password, 10);

    return await ctx.prisma.createUser(args.data);
  },
  updateUser: (parent, args, ctx: Context) => ctx.prisma.updateUser(args),
};
