import { Context } from '../utils'

export const types = {
    Employee: {
        user: (parent, args, ctx: Context) => ctx.prisma.employee({id: parent.id}).user(),
        movieTheater: (parent, args, ctx: Context) => ctx.prisma.employee({id: parent.id}).movieTheater()
    },
    Showing: {
        movie: (parent, args, ctx: Context) => ctx.prisma.showing({id: parent.id}).movie(),
        screen: (parent, args, ctx: Context)=> ctx.prisma.showing({id: parent.id}).screen(),
        seats: (parent, args, ctx: Context)=> ctx.prisma.showing({id: parent.id}).seats()
    },
    Movie: {
        genres: (parent, args, ctx: Context) => ctx.prisma.movie({id: parent.id}).genres()
    },
    Screen: {
        currentlyShowing: (parent, args, ctx: Context) => ctx.prisma.screen({id: parent.id}).currentlyShowing(),
        currentSeats: (parent, args, ctx: Context) => ctx.prisma.screen({id: parent.id}).currentSeats()
    },
    ProductPurchase: {
        employee: (parent, args, ctx: Context) => ctx.prisma.productPurchase({id: parent.id}).employee(),
        customer: (parent, args, ctx: Context) => ctx.prisma.productPurchase({id: parent.id}).customer(),
        purchasedItems: (parent, args, ctx: Context) => ctx.prisma.productPurchase({id: parent.id}).purchasedItems(),
    },
    TicketPurchase: {
        employee: (parent, args, ctx: Context) => ctx.prisma.ticketPurchase({id: parent.id}).employee(),
        customer: (parent, args, ctx: Context) => ctx.prisma.ticketPurchase({id: parent.id}).customer(),
        showing: (parent, args, ctx: Context) => ctx.prisma.ticketPurchase({id: parent.id}).showing(),
        seats: (parent, args, ctx: Context) => ctx.prisma.ticketPurchase({id: parent.id}).seats(),
    }
}
