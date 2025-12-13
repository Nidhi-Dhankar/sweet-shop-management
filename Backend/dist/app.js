"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const sweets_routes_1 = __importDefault(require("./routes/sweets.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
}));
app.use(express_1.default.json());
// Root route - helpful message
app.get("/", (req, res) => {
    res.json({
        message: "Sweet Shop Management API",
        status: "running",
        frontend: "http://localhost:3000",
        endpoints: {
            health: "/api/health",
            auth: "/api/auth",
            sweets: "/api/sweets",
            inventory: "/api/inventory"
        }
    });
});
// Health check route
app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Server is running" });
});
// Routes
app.use("/api/auth", auth_routes_1.default);
app.use("/api/sweets", sweets_routes_1.default);
// app.use("/api/inventory", inventoryRoutes); // Moved to sweets routes
// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: "Route not found",
        message: "This is the backend API. Access the frontend at http://localhost:3000",
        availableRoutes: [
            "GET /api/health",
            "POST /api/auth/register",
            "POST /api/auth/login",
            "GET /api/sweets",
            "GET /api/sweets/search"
        ]
    });
});
// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal server error" });
});
exports.default = app;
//# sourceMappingURL=app.js.map