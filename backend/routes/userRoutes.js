
import express from "express";
import verifyToken from "../middleware/authMiddleware.js";
import { createItem,  deleteItem,  getUserItems, updateItem, } from "../controller/userController.js";

const router = express.Router();


// Create a new item
router.post("/", verifyToken, createItem);

// Get all items for the logged-in user
router.get("/", verifyToken, getUserItems);


// Update a specific item by ID
router.put("/:id", verifyToken, updateItem);

// Delete a specific item by ID
router.delete("/:id", verifyToken, deleteItem);
export default router;

