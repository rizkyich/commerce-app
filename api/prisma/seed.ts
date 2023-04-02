import { PrismaClient, Role } from '@prisma/client';

import seedData from './seedData.json'

const prisma = new PrismaClient();

async function main() {
  const products = seedData;

  await Promise.all(
    products.map((product) => {
      return prisma.product.create({
        data: {
          name: product.name,
          description: product.description,
          imageUrl: product.imageUrl,
          quantity: product.quantity,
          price: product.price,
        }
      })
    })
  )
}

main()
.then(async () => {
  await prisma.$disconnect()
})
.catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})