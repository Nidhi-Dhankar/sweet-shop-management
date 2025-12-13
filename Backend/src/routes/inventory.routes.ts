// src/routes/inventory.routes.ts
import { Router } from "express";
import { authMiddleware, adminMiddleware } from "../middleware/auth.middleware";
import { purchaseSweet, restockSweet } from "../controllers/inventory.controller";

const router = Router();

router.post("/sweets/:id/purchase", authMiddleware, purchaseSweet);
router.post("/sweets/:id/restock", authMiddleware, adminMiddleware, restockSweet);

export default router;
