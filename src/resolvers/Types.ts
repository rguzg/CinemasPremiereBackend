import { Context } from '../utils'

export const types = {
    Employee: {
        user: (parent, args, ctx: Context) => ctx.prisma.employee({id: parent.id}).user(),
        movieTheater: (parent, args, ctx: Context) => ctx.prisma.employee({id: parent.id}).movieTheater()
    },
}
