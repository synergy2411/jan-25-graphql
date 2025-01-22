import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const deletedRecord = await prisma.user.delete({
    where: {
      email: "ross@test.com",
    },
  });

  console.log(deletedRecord);

  //   const allUsers = await prisma.user.findMany({
  //     skip: 1,
  //     take: 1,
  //     orderBy: {
  //       name: "asc",
  //     },

  //     // where: {
  //     //   age: {
  //     //     gte: 23,
  //     //   },
  //     // },
  //   });
  //   console.log(allUsers);

  //   const createdUser = await prisma.user.create({
  //     data: {
  //       name: "rachel green",
  //       age: 22,
  //       email: "rachel@test.com",
  //       password: "rachel123",
  //       role: "MANAGER",
  //     },
  //   });

  //   console.log(createdUser);
}

main()
  .catch(async (err) => {
    console.log(err);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
