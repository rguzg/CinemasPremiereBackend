import { Context } from '../../utils';

export default {
    ticketPurchases: (parent, args, ctx: Context) => ctx.prisma.ticketPurchases(),
    ticketPurchase: (parent, args, ctx: Context) => ctx.prisma.ticketPurchase(args.where)
}