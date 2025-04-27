
import express from "express";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();


//get username
router.get("/user", verifyToken, (req,res) =>{
  res.send("test")
});

export default router

