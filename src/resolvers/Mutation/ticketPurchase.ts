import { ApolloError } from "apollo-server-errors";
import { attachConnectorsToContext } from "graphql-tools";
import { TicketPurchaseCreateInput } from "../../generated/prisma-client";
import { Context } from "../../utils";

export default {
  createTicketPurchase: async (parent, args, ctx: Context) => {
    let {showing, seats, customer} = args.data as TicketPurchaseCreateInput;
    let pointsToUse = args.data.pointsToUse as number;
    let spreadSeats = [seats.connect, seats.create].flat(1,).filter((value) => Boolean(value)) as any;
    let price = 0;

    for (let i = 0; i < spreadSeats.length; i++) {
        if(spreadSeats[i].id){
            let seat = await ctx.prisma.seat({id: spreadSeats[i].id});
    
            if(seat.isOccupied){
                throw new ApolloError(`You chose a seat that's already occupied ${seat.id}`);
            }
        }

    }

    for (let i = 0; i < spreadSeats.length; i++) {
        let seat;
        
        if(spreadSeats[i].id){
            seat = await ctx.prisma.updateSeat({data: {isOccupied: true}, where: {id: spreadSeats[i].id}});
        } else {
            seat = spreadSeats[i]
            seat.isOccupied = true;
        }

        price += seat.price;
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
    return ctx.prisma.createTicketPurchase({...args.data, price, obtainedPoints, spentPoints: pointsToUse});
    },
  updateTicketPurchase: (parent, args, ctx: Context) => ctx.prisma.updateTicketPurchase(args),
  deleteTicketPurchase: (parent, args, ctx: Context) => ctx.prisma.deleteTicketPurchase(args.where),
};
