
import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js"




dotenv.config();
const app = express();


//Middleware
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);




// Start the server
const PORT = process.env.PORT

app.listen(PORT, () =>{
  connectDb();
  console.log(`Server is listening at port ${PORT}`)
})