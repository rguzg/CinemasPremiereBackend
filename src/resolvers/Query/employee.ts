import { Context } from "../../utils";

export default {
    calculatePayroll: async(parent, args, ctx: Context) => {
        let {employee, DaysWorked} = args;

        return (await ctx.prisma.employee(employee)).salary * DaysWorked;
    },
    employee: async(parent, args, ctx: Context) => await ctx.prisma.employee(args.where),
    employees: async(parent, args, ctx: Context) => await ctx.prisma.employees()
};
