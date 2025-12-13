// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const result = await registerUser(req.body);
    res.status(201).json(result);
  } catch (err: any) {
    res.status(400).json({ message: err.message || "Registration failed" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    console.log("[AuthController] Login request body:", req.body);
    const result = await loginUser(req.body);
    res.json(result);
  } catch (err: any) {
    console.error("[AuthController] Login error:", err.message);
    res.status(400).json({ message: err.message || "Login failed" });
  }
};
