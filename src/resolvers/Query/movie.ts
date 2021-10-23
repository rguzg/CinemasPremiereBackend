import { Context } from "../../utils";

export default {
  movies: (parent, args, ctx: Context) => ctx.prisma.movies(),
  movie: (parent, args, ctx: Context) => ctx.prisma.movie(args.where),
};
