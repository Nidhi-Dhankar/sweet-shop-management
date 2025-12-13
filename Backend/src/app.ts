// src/app.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes";
import sweetsRoutes from "./routes/sweets.routes";
import inventoryRoutes from "./routes/inventory.routes";

dotenv.config();

const app = express();

// Middleware
// Middleware
app.use(cors({
  origin: true, // Allow any origin for dev
  credentials: true,
}));
app.use(express.json());

// Request Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

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
app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetsRoutes);
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
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

export default app;
