// src/services/sweets.service.ts
import { prisma } from "../utils/prisma";

export const fetchSweets = async () => {
  return prisma.sweet.findMany();
};

export const searchSweet = async (query: any) => {
  const { name, category, minPrice, maxPrice } = query;
  
  const where: any = {};
  
  if (name) {
    where.name = { 
      contains: name as string,
      mode: "insensitive" as const
    };
  }
  
  if (category) {
    where.category = category as string;
  }
  
  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) {
      where.price.gte = Number(minPrice);
    }
    if (maxPrice) {
      where.price.lte = Number(maxPrice);
    }
  }
  
  return prisma.sweet.findMany({ where });
};

export const createSweet = async (data: any) => {
  return prisma.sweet.create({ data });
};

export const modifySweet = async (id: number, data: any) => {
  return prisma.sweet.update({ where: { id }, data });
};

export const removeSweet = async (id: number) => {
  return prisma.sweet.delete({ where: { id } });
};
