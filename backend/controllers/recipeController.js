// @desc    Permanently delete a recipe by its ID
export const deleteRecipe = async (req, res) => {
  try {
    const deletedDish = await Recipe.findByIdAndDelete(req.params.id);
    if (!deletedDish) {
      return res
        .status(404)
        .json({ message: "Dish already missing from the vault" });
    }
    console.log(" DISH PURGED FROM MONGODB:", deletedDish.title);
    res
      .status(200)
      .json({ message: "Curation successfully deleted", id: deletedDish._id });
  } catch (error) {
    console.error(" PURGE FAILED:", error.message);
    res.status(500).json({
      message: "Server failed to execute deletion",
      error: error.message,
    });
  }
};
