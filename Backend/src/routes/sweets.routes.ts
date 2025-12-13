// src/routes/sweets.routes.ts
import { Router } from "express";
import {
  addSweet,
  getSweets,
  updateSweet,
  deleteSweet,
  searchSweets,
} from "../controllers/sweets.controller";
import { purchaseSweet, restockSweet } from "../controllers/inventory.controller";
import { authMiddleware, adminMiddleware } from "../middleware/auth.middleware";

const router = Router();

// Public routes
router.get("/", getSweets);
router.get("/search", searchSweets);

// Protected routes (User/Admin)
router.post("/:id/purchase", authMiddleware, purchaseSweet);

import multer from "multer";
import path from "path";

// Multer Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Admin only routes
router.post("/", authMiddleware, adminMiddleware, upload.single("image"), addSweet);
router.put("/:id", authMiddleware, adminMiddleware, updateSweet);
router.delete("/:id", authMiddleware, adminMiddleware, deleteSweet);
router.post("/:id/restock", authMiddleware, adminMiddleware, restockSweet);

export default router;
