import { Context } from "../../utils";
import { EmployeeWhereUniqueInput } from "../../generated/prisma-client/index";
import { hash } from "bcryptjs";
import { ApolloError } from "apollo-server-errors";
import { generateEmail } from "../../utils/email";
import { CreateRecordOperations, UpdateRecordOperations } from "../index";

export default {
    calculatePayroll: async(parent, args, ctx: Context) => {
        let {employee, DaysWorked} = args;

        return (await ctx.prisma.employee(employee)).salary * DaysWorked;
    }
};
