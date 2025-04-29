
import express from "express";
import verifyToken from "../middleware/authMiddleware.js";
import { createList, getUserLists} from "../controller/userController.js";

const router = express.Router();


//Make a list
router.post("/", verifyToken, createList);

// Get user lists
router.get("/", verifyToken, getUserLists);
export default router;


