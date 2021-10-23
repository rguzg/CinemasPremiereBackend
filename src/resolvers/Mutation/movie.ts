import { Context } from "../../utils";

export default {
  createMovie: (parent, args, ctx: Context) => ctx.prisma.createMovie(args.data),
  updateMovie: (parent, args, ctx: Context) => ctx.prisma.updateMovie(args),
};
