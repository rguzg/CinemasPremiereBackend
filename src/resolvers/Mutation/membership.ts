import { MembershipCreateInput } from "../../generated/prisma-client";
import { Context } from "../../utils";
import addDaysToToday from "../../utils/addDaysToToday";

export default {
    createMembership: async (parent, args, ctx: Context) => {
    let {type, customer}  = args.data;
    let expirationDate: Date;

    switch(type){
        case "Normal":
            expirationDate = addDaysToToday(30);
            break;
        case "Gold":
            expirationDate = addDaysToToday(120);
            break;
        case "Black":
            expirationDate = addDaysToToday(240);
            break;
        case "Platinum":
            expirationDate = addDaysToToday(480);
            break;
        case "SuperBlackPlatinumPro":
            expirationDate = addDaysToToday(99999);
            break;
    }

    let membership = await ctx.prisma.createMembership({expirationDate, type});
    
    ctx.prisma.updateCustomer({data: {membership: {connect: {id: membership.id}}}, where: customer});

    return membership;
  },
  updateMembership: async (parent, args, ctx: Context) => ctx.prisma.updateMembership(args),
  deleteMembership: async(parent, args, ctx: Context) => ctx.prisma.deleteMembership(args.where)
};
