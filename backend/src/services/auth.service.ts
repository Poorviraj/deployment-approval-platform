import prisma from "../config/db";
import { comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const valid = await comparePassword(
    password,
    user.password
  );

  if (!valid) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken({
    id: user.id,
    role: user.role,
  });

  return {
    token,
    user,
  };
}