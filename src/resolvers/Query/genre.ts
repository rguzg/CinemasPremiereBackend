import { Context } from '../../utils';

export default {
    genres: (parent, args, ctx: Context) => ctx.prisma.genres(),
    genre: (parent, args, ctx: Context) => ctx.prisma.genre(args.where)
}