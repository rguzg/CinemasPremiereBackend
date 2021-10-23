import { Context } from "../../utils";

export default {
  createCustomer: (parent, args, ctx: Context) => ctx.prisma.createCustomer(args.data),
  updateCustomer: (parent, args, ctx: Context) => ctx.prisma.updateCustomer(args),
  deleteCustomer: (parent, args, ctx: Context) => ctx.prisma.deleteCustomer(args.where),
};
