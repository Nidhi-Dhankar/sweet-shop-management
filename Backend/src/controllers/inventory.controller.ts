// src/controllers/inventory.controller.ts
import { Request, Response } from "express";
import { decreaseStock, increaseStock } from "../services/inventory.service";

export const purchaseSweet = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const quantity = req.body.quantity ? parseInt(req.body.quantity) : 1;

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid sweet ID" });
    }

    const sweet = await decreaseStock(id, quantity);
    res.json(sweet);
  } catch (err: any) {
    res.status(400).json({ error: err.message || "Purchase failed" });
  }
};

export const restockSweet = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid sweet ID" });
    }
    const quantity = parseInt(req.body.quantity);
    if (isNaN(quantity) || quantity <= 0) {
      return res.status(400).json({ error: "Invalid quantity" });
    }
    const sweet = await increaseStock(id, quantity);
    res.json(sweet);
  } catch (err: any) {
    res.status(400).json({ error: err.message || "Restock failed" });
  }
};
