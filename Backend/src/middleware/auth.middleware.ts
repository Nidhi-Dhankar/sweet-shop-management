// src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not set");
}

export interface AuthRequest extends Request {
  user?: {
    id: number;
    isAdmin: boolean;
  };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.startsWith("Bearer ") 
      ? authHeader.split(" ")[1] 
      : authHeader;

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET!) as { id: number; isAdmin: boolean };
    req.user = decoded;
    next();
  } catch (err: any) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

export const adminMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ error: "Authentication required" });
  }
  if (!req.user.isAdmin) {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
};
