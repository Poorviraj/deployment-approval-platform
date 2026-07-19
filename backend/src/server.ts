import app from "./app";
import prisma from "./config/db";
import { env } from "./config/env";

async function start() {
  try {
    await prisma.$connect();

    console.log("Database Connected");

    app.listen(env.PORT, () => {
      console.log(`Server running on http://localhost:${env.PORT}`);
    });
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
}

start();