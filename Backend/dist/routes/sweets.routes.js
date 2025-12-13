"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/sweets.routes.ts
const express_1 = require("express");
const sweets_controller_1 = require("../controllers/sweets.controller");
const inventory_controller_1 = require("../controllers/inventory.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Public routes
router.get("/", sweets_controller_1.getSweets);
router.get("/search", sweets_controller_1.searchSweets);
// Protected routes (User/Admin)
router.post("/:id/purchase", auth_middleware_1.authMiddleware, inventory_controller_1.purchaseSweet);
// Admin only routes
router.post("/", auth_middleware_1.authMiddleware, auth_middleware_1.adminMiddleware, sweets_controller_1.addSweet);
router.put("/:id", auth_middleware_1.authMiddleware, auth_middleware_1.adminMiddleware, sweets_controller_1.updateSweet);
router.delete("/:id", auth_middleware_1.authMiddleware, auth_middleware_1.adminMiddleware, sweets_controller_1.deleteSweet);
router.post("/:id/restock", auth_middleware_1.authMiddleware, auth_middleware_1.adminMiddleware, inventory_controller_1.restockSweet);
exports.default = router;
//# sourceMappingURL=sweets.routes.js.map