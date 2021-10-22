import { Prisma, prisma } from '../generated/prisma-client'

export async function generateEmail(firstName: string, lastName: string){
  let email = `${firstName}.${lastName}@cinemaspremiere.com`;
  let peopleWithSameName = (await prisma.users({where: {firstName, lastName}})).length;

  if(peopleWithSameName > 0){
    email = `${firstName}.${lastName}${peopleWithSameName - 1}@cinemaspremiere.com`
  }

  return email;
}