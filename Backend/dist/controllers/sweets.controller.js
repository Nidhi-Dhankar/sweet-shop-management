"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSweet = exports.updateSweet = exports.addSweet = exports.searchSweets = exports.getSweets = void 0;
const sweets_service_1 = require("../services/sweets.service");
const getSweets = async (req, res) => {
    try {
        const sweets = await (0, sweets_service_1.fetchSweets)();
        res.json(sweets);
    }
    catch (err) {
        res.status(500).json({ error: err.message || "Failed to fetch sweets" });
    }
};
exports.getSweets = getSweets;
const searchSweets = async (req, res) => {
    try {
        const results = await (0, sweets_service_1.searchSweet)(req.query);
        res.json(results);
    }
    catch (err) {
        res.status(500).json({ error: err.message || "Search failed" });
    }
};
exports.searchSweets = searchSweets;
const addSweet = async (req, res) => {
    try {
        const sweet = await (0, sweets_service_1.createSweet)(req.body);
        res.status(201).json(sweet);
    }
    catch (err) {
        res.status(400).json({ error: err.message || "Failed to create sweet" });
    }
};
exports.addSweet = addSweet;
const updateSweet = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid sweet ID" });
        }
        const sweet = await (0, sweets_service_1.modifySweet)(id, req.body);
        res.json(sweet);
    }
    catch (err) {
        res.status(400).json({ error: err.message || "Failed to update sweet" });
    }
};
exports.updateSweet = updateSweet;
const deleteSweet = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid sweet ID" });
        }
        await (0, sweets_service_1.removeSweet)(id);
        res.json({ message: "Sweet deleted successfully" });
    }
    catch (err) {
        res.status(400).json({ error: err.message || "Failed to delete sweet" });
    }
};
exports.deleteSweet = deleteSweet;
//# sourceMappingURL=sweets.controller.js.map