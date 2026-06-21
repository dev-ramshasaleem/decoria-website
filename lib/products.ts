import { prisma } from "./prisma";

export async function getProducts() {
   
    return prisma.product.findMany()
    
}