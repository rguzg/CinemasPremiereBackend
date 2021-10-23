import { Context } from "../../utils";

export default {
  createGenre: (parent, args, ctx: Context) => ctx.prisma.createGenre(args.data),
  updateGenre: (parent, args, ctx: Context) => ctx.prisma.updateGenre(args),
};
