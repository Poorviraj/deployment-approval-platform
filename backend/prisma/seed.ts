import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("password123", 10);

  await prisma.user.createMany({
    data: [
      {
        name: "Admin",
        email: "admin@company.com",
        password,
        role: Role.ADMIN,
      },
      {
        name: "Developer",
        email: "developer@company.com",
        password,
        role: Role.DEVELOPER,
      },
    ],
    skipDuplicates: true,
  });

  console.log("Seed Completed");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });