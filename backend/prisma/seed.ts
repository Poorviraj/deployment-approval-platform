import { PrismaClient, Role } from "@prisma/client";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash("admin123", 10);

  const admin = await prisma.user.create({
    data: {
      name: "Platform Admin",

      email: "admin@deployops.com",

      password: adminPassword,

      role: "ADMIN",
    },
  });

  const developers = [];

  for (let i = 1; i <= 5; i++) {
    const password = await bcrypt.hash("password123", 10);

    const developer = await prisma.user.create({
      data: {
        name: faker.person.fullName(),

        email: `developer${i}@deployops.com`,

        password,

        role: "DEVELOPER",
      },
    });

    developers.push(developer);
  }

  const statuses = ["PENDING", "APPROVED", "REJECTED"];

  const environments = ["DEVELOPMENT", "STAGING", "PRODUCTION"];

  const services = [
    "Inventory Service",

    "Payment Service",

    "Notification Service",

    "Auth Service",

    "User Service",

    "Gateway Service",

    "Order Service",

    "Billing Service",
  ];

  for (let i = 0; i < 25; i++) {
    const developer = faker.helpers.arrayElement(developers);

    const status = faker.helpers.arrayElement(statuses);

    const deployment = await prisma.deployment.create({
      data: {
        serviceName: faker.helpers.arrayElement(services),

        version: `v${faker.number.int({
          min: 1,
          max: 5,
        })}.${faker.number.int({
          min: 0,
          max: 9,
        })}.${faker.number.int({
          min: 0,
          max: 9,
        })}`,

        environment: faker.helpers.arrayElement(environments) as any,

        status: status as any,

        requestedById: developer.id,

        approvedById: status === "PENDING" ? null : admin.id,
      },
    });

    await prisma.deploymentHistory.create({
      data: {
        deploymentId: deployment.id,

        action: "Deployment Request Created",
      },
    });

    if (status === "APPROVED") {
      await prisma.deploymentHistory.create({
        data: {
          deploymentId: deployment.id,

          action: "Deployment Approved",
        },
      });
    }

    if (status === "REJECTED") {
      await prisma.deploymentHistory.create({
        data: {
          deploymentId: deployment.id,

          action: "Deployment Rejected",
        },
      });
    }
  }

  console.log("Seed Completed");
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("✅ Database seeded successfully");
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
