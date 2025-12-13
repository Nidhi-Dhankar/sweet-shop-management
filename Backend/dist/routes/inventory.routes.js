"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/inventory.routes.ts
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const inventory_controller_1 = require("../controllers/inventory.controller");
const router = (0, express_1.Router)();
router.post("/sweets/:id/purchase", auth_middleware_1.authMiddleware, inventory_controller_1.purchaseSweet);
router.post("/sweets/:id/restock", auth_middleware_1.authMiddleware, auth_middleware_1.adminMiddleware, inventory_controller_1.restockSweet);
exports.default = router;
//# sourceMappingURL=inventory.routes.js.map