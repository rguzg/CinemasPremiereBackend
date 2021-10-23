import { Context } from '../../utils';

export default {
    productPurchases: (parent, args, ctx: Context) => ctx.prisma.productPurchases(),
    productPurchase: (parent, args, ctx: Context) => ctx.prisma.productPurchase(args.where)
}