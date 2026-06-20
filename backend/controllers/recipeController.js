import Recipe from "../models/kitchenmodel.js";
export const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch kitchen ledger",
      error: error.message,
    });
  }
};

// 2. GET SINGLE (Detail View)
export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe)
      return res.status(404).json({ message: "Dish not found in vault" });
    res.status(200).json(recipe);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Invalid Mongoose ID lookup", error: error.message });
  }
};

// 3. CREATE SINGLE (The missing function!)
export const createRecipe = async (req, res) => {
  try {
    const newDish = new Recipe(req.body);
    const savedDish = await newDish.save();
    console.log("🟢 NEW DISH CURATED TO CLOUD:", savedDish.title);
    res.status(201).json(savedDish);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Schema validation failed", error: error.message });
  }
};

// 4. CREATE BULK (Thunder Client Seeder)
export const createRecipesBulk = async (req, res) => {
  try {
    await Recipe.deleteMany({});
    const createdDishes = await Recipe.insertMany(req.body);
    res.status(201).json(createdDishes);
  } catch (error) {
    res.status(400).json({ message: "Bulk drop failed", error: error.message });
  }
};

// 5. DELETE SINGLE (Profile Command Deck)
export const deleteRecipe = async (req, res) => {
  try {
    const dish = await Recipe.findByIdAndDelete(req.params.id);
    if (!dish) return res.status(404).json({ message: "Dish already purged" });
    console.log("💥 DISH PURGED:", dish.title);
    res
      .status(200)
      .json({ message: "Curation successfully deleted", id: dish._id });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Purge execution failed", error: error.message });
  }
};
