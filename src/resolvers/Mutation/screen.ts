import { Context } from "../../utils";

export default {
  createScreen: (parent, args, ctx: Context) => ctx.prisma.createScreen(args.data),
  updateScreen: (parent, args, ctx: Context) => ctx.prisma.updateScreen(args),
};
