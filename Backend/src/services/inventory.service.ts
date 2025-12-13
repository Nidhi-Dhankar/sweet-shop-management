// src/services/inventory.service.ts
import { prisma } from "../utils/prisma";

export const decreaseStock = async (id: number, quantity: number = 1) => {
  const sweet = await prisma.sweet.findUnique({ where: { id } });
  if (!sweet) throw new Error("Sweet not found");
  if (sweet.quantity < quantity) throw new Error("Insufficient stock");

  return prisma.sweet.update({
    where: { id },
    data: { quantity: sweet.quantity - quantity }
  });
};

export const increaseStock = async (id: number, quantity: number) => {
  const sweet = await prisma.sweet.findUnique({ where: { id } });
  if (!sweet) throw new Error("Sweet not found");

  return prisma.sweet.update({
    where: { id },
    data: { quantity: sweet.quantity + quantity }
  });
};
