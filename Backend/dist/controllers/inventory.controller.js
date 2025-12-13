"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restockSweet = exports.purchaseSweet = void 0;
const inventory_service_1 = require("../services/inventory.service");
const purchaseSweet = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid sweet ID" });
        }
        const sweet = await (0, inventory_service_1.decreaseStock)(id);
        res.json(sweet);
    }
    catch (err) {
        res.status(400).json({ error: err.message || "Purchase failed" });
    }
};
exports.purchaseSweet = purchaseSweet;
const restockSweet = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid sweet ID" });
        }
        const quantity = parseInt(req.body.quantity);
        if (isNaN(quantity) || quantity <= 0) {
            return res.status(400).json({ error: "Invalid quantity" });
        }
        const sweet = await (0, inventory_service_1.increaseStock)(id, quantity);
        res.json(sweet);
    }
    catch (err) {
        res.status(400).json({ error: err.message || "Restock failed" });
    }
};
exports.restockSweet = restockSweet;
//# sourceMappingURL=inventory.controller.js.map