"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
// src/services/auth.service.ts
const prisma_1 = require("../utils/prisma");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not set");
}
const registerUser = async ({ name, email, password }) => {
    if (!email || !password) {
        throw new Error("Email and password are required");
    }
    if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
    }
    const existing = await prisma_1.prisma.user.findUnique({ where: { email } });
    if (existing)
        throw new Error("User already exists");
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    const user = await prisma_1.prisma.user.create({
        data: { name: name || email.split("@")[0], email, password: hashedPassword },
    });
    const token = jsonwebtoken_1.default.sign({ id: user.id, isAdmin: user.isAdmin }, JWT_SECRET, {
        expiresIn: "1d",
    });
    return {
        token,
        user: { id: user.id, email: user.email, name: user.name, isAdmin: user.isAdmin },
    };
};
exports.registerUser = registerUser;
const loginUser = async ({ email, password }) => {
    if (!email || !password) {
        throw new Error("Email and password are required");
    }
    const user = await prisma_1.prisma.user.findUnique({ where: { email } });
    if (!user)
        throw new Error("Invalid credentials");
    const match = await bcryptjs_1.default.compare(password, user.password);
    if (!match)
        throw new Error("Invalid credentials");
    const token = jsonwebtoken_1.default.sign({ id: user.id, isAdmin: user.isAdmin }, JWT_SECRET, {
        expiresIn: "1d",
    });
    return {
        token,
        user: { id: user.id, email: user.email, name: user.name, isAdmin: user.isAdmin },
    };
};
exports.loginUser = loginUser;
//# sourceMappingURL=auth.service.js.map