import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import recipeRoutes from "./Routes/recipeRoutes.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Database connected successfully!"))
  .catch((error) => console.log("Database Connection failed!", error));
app.get("/", (req, res) => {
  res.send("Welcome to the Minimalist Kitchen API Server! 🍽️");
});
app.use("/api/recipes", recipeRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running smoothly on http://localhost:${PORT}`);
});
