import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  title: { type: String, trim: true, required: true },
  category: {
    type: String,
    enum: ["Breakfast", "Lunch", "Dinner", "Dessert", "Snack", "Quick Meals"],
    required: true,
  },
  prepTime: { type: String, required: true },
  servings: { type: Number, required: true, default: 2 },
  ingredients: [{ type: String, required: true }],
  instructions: [{ type: String, required: true }],
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const recipeModel = mongoose.model("recipeModel", recipeSchema);
export default recipeModel;
