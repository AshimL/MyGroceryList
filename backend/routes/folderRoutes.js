import express from "express";
import { createFolder, deleteFolder, getUserFolder, renameFolder } from "../controller/folderController.js";
import verifyToken from "../middleware/authMiddleware.js";


const router = express.Router();


// Create a new folder
router.post("/", verifyToken, createFolder)

// Get all folders for the logged-in user
router.get("/", verifyToken, getUserFolder)

// Update a specific folder name by ID
router.put("/:id", verifyToken, renameFolder)

// Delete a specific folder by ID
router.delete("/:id", verifyToken, deleteFolder)



export default router;