import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const createdUser = await prisma.user.create({
    data: {
      name: "rachel green",
      age: 22,
      email: "rachel@test.com",
      password: "rachel123",
      role: "MANAGER",
    },
  });

  console.log(createdUser);
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
