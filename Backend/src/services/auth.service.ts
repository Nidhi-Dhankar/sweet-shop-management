// src/services/auth.service.ts
import { prisma } from "../utils/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not set");
}

interface AuthInput {
  name?: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

export const registerUser = async ({ name, email, password, isAdmin }: AuthInput) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const normalizedEmail = email.trim().toLowerCase();

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }

  const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
  if (existing) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name: name || normalizedEmail.split("@")[0],
      email: normalizedEmail,
      password: hashedPassword,
      isAdmin: isAdmin || false
    },
  });

  const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, JWT_SECRET, {
    expiresIn: "1d",
  });

  return {
    token,
    user: { id: user.id, email: user.email, name: user.name, isAdmin: user.isAdmin },
  };
};

export const loginUser = async ({ email, password }: AuthInput) => {
  console.log(`[AuthService] Attempting login for: ${email}`);

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const normalizedEmail = email.trim().toLowerCase();
  console.log(`[AuthService] Normalized email: ${normalizedEmail}`);

  const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });

  if (!user) {
    console.log(`[AuthService] User not found for email: ${normalizedEmail}`);
    throw new Error("Invalid credentials");
  }

  const match = await bcrypt.compare(password, user.password);
  console.log(`[AuthService] Password match for ${normalizedEmail}: ${match}`);

  if (!match) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, JWT_SECRET!, {
    expiresIn: "1d",
  });

  return {
    token,
    user: { id: user.id, email: user.email, name: user.name, isAdmin: user.isAdmin },
  };
};
