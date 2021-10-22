import { Context } from "../../utils";
import { EmployeeCreateInput, EmployeeUpdateInput, User, UserCreateInput } from "../../generated/prisma-client/index";
import { hash } from "bcryptjs";
import { ApolloError } from "apollo-server-errors";
import { generateEmail } from "../../utils/email";
import { CreateRecordOperations, UpdateRecordOperations } from "../index";

function GenerateBankAccount():string {
    return String(Math.floor(10000 * Math.random() + 99999))
}

async function ValidateEmployeeUser(ctx: Context, user: User): Promise<Boolean> {
    let isUserEmployed = await ctx.prisma.movieTheaters({where: {employees_some: {user: user}}});
  
    if(user.userType == "CUSTOMER"){
        throw new ApolloError("Employee's user type must be EMPLOYEE or ADMIN");
    }
  
    if(isUserEmployed){
        throw new ApolloError("Employee's already working at another location");
    }

    return true;
}

async function PrepareEmployeeUser(user: UserCreateInput): Promise<UserCreateInput>{
    // userType must be EMPLOYEE
    if(user.userType == 'CUSTOMER'){
        throw new ApolloError("Employee's user type must be EMPLOYEE or ADMIN");
    }

    user.email = await generateEmail(user.firstName, user.lastName);
    
    // Hash the user's password if it's a new user
    user.password = await hash(user.password, 15);

    return user;
}

export default {
    createEmployee: async (parent, args, ctx: Context) => {
        let employee: EmployeeCreateInput = args.data;
        
        let userRecordType = Object.keys(employee.user ?? {}).find((key) => key) as CreateRecordOperations;

        switch(userRecordType){
        case "connect":
            let existingUser = await ctx.prisma.user(employee.user.connect);
            ValidateEmployeeUser(ctx, existingUser);
            break;
        case "create":
            employee.user.create = await PrepareEmployeeUser(employee.user.create);
            break;
        default:
            break;
        }

        employee.bankAccount = GenerateBankAccount();

        return await ctx.prisma.createEmployee(employee);
  },
    updateEmployee: async (parent, args, ctx: Context) => {
        let employee: EmployeeUpdateInput = args.data;

        if(employee.bankAccount && employee.bankAccount.length != 5){
            throw new ApolloError("Employee's bank account number must be 5 digits long");
        }
        
        let userRecordType = Object.keys(employee.user ?? {}).find((key) => key) as UpdateRecordOperations;
        
        switch (userRecordType) {
            case 'create':
                employee.user.create = await PrepareEmployeeUser(employee.user.create);
            case 'connect':
                let user = await ctx.prisma.user(employee.user.connect);
                ValidateEmployeeUser(ctx, user);
                break;
            case 'update':
                if(employee.user.update.password){
                    employee.user.update.password = await hash(employee.user.create.password, 15);
                }
                break;
            case 'upsert':
                // User is required so it's imposible for an upsert to endup as an insert
                if(employee.user.upsert.update.password){
                    employee.user.upsert.update.password = await hash(employee.user.upsert.update.password, 15);
                }
                break;
            default:
                break;
        }

        return ctx.prisma.updateEmployee({where: args.where, data: employee});
    }
};
