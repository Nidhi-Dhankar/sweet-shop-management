// src/controllers/sweets.controller.ts
import { Request, Response } from "express";
import {
  createSweet,
  fetchSweets,
  modifySweet,
  removeSweet,
  searchSweet,
} from "../services/sweets.service";

export const getSweets = async (req: Request, res: Response) => {
  try {
    const sweets = await fetchSweets();
    res.json(sweets);
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to fetch sweets" });
  }
};

export const searchSweets = async (req: Request, res: Response) => {
  try {
    const results = await searchSweet(req.query);
    res.json(results);
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Search failed" });
  }
};

export const addSweet = async (req: Request, res: Response) => {
  try {
    const sweet = await createSweet(req.body);
    res.status(201).json(sweet);
  } catch (err: any) {
    res.status(400).json({ error: err.message || "Failed to create sweet" });
  }
};

export const updateSweet = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid sweet ID" });
    }
    const sweet = await modifySweet(id, req.body);
    res.json(sweet);
  } catch (err: any) {
    res.status(400).json({ error: err.message || "Failed to update sweet" });
  }
};

export const deleteSweet = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid sweet ID" });
    }
    await removeSweet(id);
    res.json({ message: "Sweet deleted successfully" });
  } catch (err: any) {
    res.status(400).json({ error: err.message || "Failed to delete sweet" });
  }
};

