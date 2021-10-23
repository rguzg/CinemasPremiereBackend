import { Context } from "../../utils";

export default {
  createInventoryObject: (parent, args, ctx: Context) => ctx.prisma.createInventoryObject(args.data),
  updateInventoryObject: (parent, args, ctx: Context) => ctx.prisma.updateInventoryObject(args),
};
