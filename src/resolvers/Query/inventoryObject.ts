import { Context } from '../../utils';

export default {
    inventoryObjects: (parent, args, ctx: Context) => ctx.prisma.inventoryObjects(),
    inventoryObject: (parent, args, ctx: Context) => ctx.prisma.inventoryObject(args.where)
}