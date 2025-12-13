"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.increaseStock = exports.decreaseStock = void 0;
// src/services/inventory.service.ts
const prisma_1 = require("../utils/prisma");
const decreaseStock = async (id) => {
    const sweet = await prisma_1.prisma.sweet.findUnique({ where: { id } });
    if (!sweet)
        throw new Error("Sweet not found");
    if (sweet.quantity <= 0)
        throw new Error("Out of stock");
    return prisma_1.prisma.sweet.update({
        where: { id },
        data: { quantity: sweet.quantity - 1 }
    });
};
exports.decreaseStock = decreaseStock;
const increaseStock = async (id, quantity) => {
    const sweet = await prisma_1.prisma.sweet.findUnique({ where: { id } });
    if (!sweet)
        throw new Error("Sweet not found");
    return prisma_1.prisma.sweet.update({
        where: { id },
        data: { quantity: sweet.quantity + quantity }
    });
};
exports.increaseStock = increaseStock;
//# sourceMappingURL=inventory.service.js.map