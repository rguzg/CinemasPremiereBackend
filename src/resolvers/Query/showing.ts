import { Context } from '../../utils';

export default {
    showings: (parent, args, ctx: Context) => ctx.prisma.showings(),
}