import express from "express";
import {
  getRecipes,
  getRecipeById,
  createRecipe,
  createRecipesBulk,
  deleteRecipe,
} from "../controllers/recipeController.js";

const router = express.Router();
import verifyToken from "../middleware/authMiddleware.js";
router.get("/", verifyToken, getRecipes);
router.get("/:id", verifyToken, getRecipeById);
router.post("/", verifyToken, createRecipe);
router.post("/bulk", verifyToken, createRecipesBulk);
router.delete("/:id", verifyToken, deleteRecipe);

export default router;
