"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeSweet = exports.modifySweet = exports.createSweet = exports.searchSweet = exports.fetchSweets = void 0;
// src/services/sweets.service.ts
const prisma_1 = require("../utils/prisma");
const fetchSweets = async () => {
    return prisma_1.prisma.sweet.findMany();
};
exports.fetchSweets = fetchSweets;
const searchSweet = async (query) => {
    const { name, category, minPrice, maxPrice } = query;
    const where = {};
    if (name) {
        where.name = {
            contains: name,
            mode: "insensitive"
        };
    }
    if (category) {
        where.category = category;
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
    return prisma_1.prisma.sweet.findMany({ where });
};
exports.searchSweet = searchSweet;
const createSweet = async (data) => {
    return prisma_1.prisma.sweet.create({ data });
};
exports.createSweet = createSweet;
const modifySweet = async (id, data) => {
    return prisma_1.prisma.sweet.update({ where: { id }, data });
};
exports.modifySweet = modifySweet;
const removeSweet = async (id) => {
    return prisma_1.prisma.sweet.delete({ where: { id } });
};
exports.removeSweet = removeSweet;
//# sourceMappingURL=sweets.service.js.map