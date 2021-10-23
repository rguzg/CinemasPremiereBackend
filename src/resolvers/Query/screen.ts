import { Context } from '../../utils';

export default {
    screens: (parent, args, ctx: Context) => ctx.prisma.screens(),
    screen: (parent, args, ctx: Context) => ctx.prisma.screen(args.where)
}