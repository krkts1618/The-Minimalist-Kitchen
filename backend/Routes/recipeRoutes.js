import express from "express";
import {
  getRecipes,
  getRecipeById,
  createRecipe,
  createRecipesBulk,
  deleteRecipe /* 👈 1. Import it */,
} from "../Controllers/recipeController.js";

const router = express.Router();

router.get("/", getRecipes);
router.get("/:id", getRecipeById);
router.post("/", createRecipe);
router.post("/bulk", createRecipesBulk);
router.delete("/:id", deleteRecipe); /* 👈 2. Open the kill lane */

export default router;
