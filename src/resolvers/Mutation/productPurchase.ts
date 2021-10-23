import { Context } from "../../utils";
import { ProductPurchaseCreateInput } from "../../generated/prisma-client";
import { ApolloError } from "apollo-server-errors";

export default {
  createProductPurchase: async (parent, args, ctx: Context) => {
    let { customer, purchasedItems} = args.data as ProductPurchaseCreateInput;
    let pointsToUse = args.data.pointsToUse as number;
    let allpurchasedItems = [purchasedItems.connect, purchasedItems.create].flat(1,).filter((value) => Boolean(value)) as any;
    let price = 0;

    for (let i = 0; i < allpurchasedItems.length; i++) {
        if(allpurchasedItems[i].id){
            let inventoryObject = await ctx.prisma.inventoryObject({id: purchasedItems[i].id});
    
            if(inventoryObject.currentQuantity){
                throw new ApolloError(`You chose an object with 0 items ${inventoryObject.name}`);
            }
        }

    }

    for (let i = 0; i < allpurchasedItems.length; i++) {
        let item;
        
        if(allpurchasedItems[i].id){
            item = await ctx.prisma.updateInventoryObject({data: {currentQuantity: allpurchasedItems[i].currentQuantity}, where: {id: allpurchasedItems[i].id}});
        } else {
            item = allpurchasedItems[i]
            item.currentQuantity -= 1;
        }

        price += item.price;
    }

    let id = customer.connect.id || customer.create.id;
    let currentCustomerPoints = await ctx.prisma.customer({id}).points();
    let pointsAfterTransaction = 0; 
    
    if(pointsToUse){
        pointsAfterTransaction = currentCustomerPoints - pointsToUse;
        if(pointsAfterTransaction < 0){
            throw new ApolloError("Not enough points to use");
        }

        price -=  Math.floor(pointsToUse/10);
        
    }

    let obtainedPoints = Math.floor(price/20);
    pointsAfterTransaction += obtainedPoints;

    await ctx.prisma.updateCustomer({data: {points: pointsAfterTransaction}, where: {id}});
    delete args.data.pointsToUse;
    return ctx.prisma.createProductPurchase({...args.data, price, obtainedPoints, spentPoints: pointsToUse});
  },
  updateProductPurchase: (parent, args, ctx: Context) => ctx.prisma.updateProductPurchase(args),
  deleteProductPurchase: (parent, args, ctx: Context) => ctx.prisma.deleteProductPurchase(args),
};
